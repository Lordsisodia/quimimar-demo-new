import { chromium } from 'playwright';
import type { Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as http from 'http';

interface ExtractedData {
  url: string;
  title: string;
  description: string;
  images: ImageData[];
  components: ComponentData[];
  colors: string[];
  fonts: string[];
  structure: StructureData;
  content: ContentData;
  metadata: MetaData;
}

interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  type: 'logo' | 'hero' | 'product' | 'icon' | 'background' | 'other';
  localPath?: string;
}

interface ComponentData {
  type: string;
  content: string;
  styles: Record<string, string>;
  attributes: Record<string, string>;
  selector: string;
}

interface StructureData {
  navigation: string[];
  sections: string[];
  layout: string;
}

interface ContentData {
  headings: { level: number; text: string }[];
  paragraphs: string[];
  buttons: string[];
  forms: string[];
  links: string[];
}

interface MetaData {
  viewport: string;
  charset: string;
  ogTags: Record<string, string>;
  twitterTags: Record<string, string>;
}

class WebsiteAnalyzer {
  private browser: Browser | null = null;
  private outputDir: string;

  constructor(outputDir: string = './extracted-assets') {
    this.outputDir = outputDir;
    this.ensureDirectoryExists(this.outputDir);
    this.ensureDirectoryExists(path.join(this.outputDir, 'images'));
    this.ensureDirectoryExists(path.join(this.outputDir, 'components'));
  }

  private ensureDirectoryExists(dir: string): void {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Dismiss cookie consent popups and modals
   */
  private async dismissPopups(page: Page): Promise<void> {
    console.log('🍪 Checking for popups and cookie consent...');
    
    try {
      // Common cookie consent button selectors
      const consentSelectors = [
        // Generic accept buttons
        'button:has-text("Accept")',
        'button:has-text("Aceptar")',
        'button:has-text("Accept all")',
        'button:has-text("Accept cookies")',
        'button:has-text("I agree")',
        'button:has-text("Got it")',
        'button:has-text("OK")',
        'button:has-text("Allow")',
        'button:has-text("Agree")',
        
        // Common class/id patterns
        '[class*="cookie"] button[class*="accept"]',
        '[class*="consent"] button[class*="accept"]',
        '[id*="cookie"] button[id*="accept"]',
        '#onetrust-accept-btn-handler',
        '.cookie-consent-accept',
        '.cky-btn-accept',
        '[data-cookiebanner="accept_button"]',
        
        // Specific to QDQ/Spanish sites
        'button:has-text("Consentir")',
        '.cookie-consent button.primary',
        '[class*="modal"] button[class*="primary"]'
      ];

      // Try each selector
      for (const selector of consentSelectors) {
        try {
          const button = await page.locator(selector).first();
          if (await button.isVisible({ timeout: 1000 })) {
            await button.click();
            console.log(`✅ Dismissed popup with selector: ${selector}`);
            await page.waitForTimeout(1000); // Wait for animation
            break;
          }
        } catch (e) {
          // Continue to next selector
        }
      }

      // Also try to close modals/overlays
      const closeSelectors = [
        '[aria-label="Close"]',
        '[aria-label="Cerrar"]',
        'button.close',
        '.modal-close',
        '[class*="close-button"]',
        '[class*="dismiss"]'
      ];

      for (const selector of closeSelectors) {
        try {
          const closeBtn = await page.locator(selector).first();
          if (await closeBtn.isVisible({ timeout: 500 })) {
            await closeBtn.click();
            console.log(`✅ Closed modal with selector: ${selector}`);
            await page.waitForTimeout(500);
          }
        } catch (e) {
          // Continue
        }
      }

    } catch (error) {
      console.log('⚠️ No popups found or already dismissed');
    }
  }

  /**
   * Intelligent scrolling to load all lazy-loaded content
   */
  private async intelligentScroll(page: Page): Promise<void> {
    console.log('📜 Starting intelligent scroll to load all content...');
    
    // Get initial image count
    let previousImageCount = await page.$$eval('img', imgs => imgs.length);
    let scrollAttempts = 0;
    const maxScrollAttempts = 10;
    
    while (scrollAttempts < maxScrollAttempts) {
      // Scroll down by viewport height
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      
      // Wait for potential lazy loading
      await page.waitForTimeout(1500);
      
      // Check if new images loaded
      const currentImageCount = await page.$$eval('img', imgs => imgs.length);
      
      if (currentImageCount > previousImageCount) {
        console.log(`🖼️ Loaded ${currentImageCount - previousImageCount} new images (Total: ${currentImageCount})`);
        previousImageCount = currentImageCount;
        scrollAttempts = 0; // Reset counter if new content found
      } else {
        scrollAttempts++;
      }
      
      // Check if reached bottom
      const isAtBottom = await page.evaluate(() => {
        return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      });
      
      if (isAtBottom && scrollAttempts > 2) {
        console.log('📄 Reached bottom of page');
        break;
      }
    }
    
    // Scroll back to top for screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    
    console.log('✅ Intelligent scroll complete');
  }

  /**
   * Capture multiple screenshots
   */
  private async captureScreenshots(page: Page): Promise<void> {
    console.log('📸 Capturing screenshots...');
    
    // Full page screenshot
    await page.screenshot({
      path: path.join(this.outputDir, 'full-page.png'),
      fullPage: true
    });
    console.log('✅ Full page screenshot captured');
    
    // Above the fold screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(this.outputDir, 'above-fold.png'),
      fullPage: false
    });
    console.log('✅ Above-fold screenshot captured');
    
    // Try to capture main content area
    try {
      const mainContent = await page.$('main, [role="main"], #main, .main-content');
      if (mainContent) {
        await mainContent.screenshot({
          path: path.join(this.outputDir, 'main-content.png')
        });
        console.log('✅ Main content screenshot captured');
      }
    } catch (e) {
      console.log('⚠️ Could not capture main content area');
    }
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async analyzeWebsite(url: string): Promise<ExtractedData> {
    if (!this.browser) {
      throw new Error('Browser not initialized. Call init() first.');
    }

    const page = await this.browser.newPage();
    
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Navigate to the website
    await page.goto(url, { waitUntil: 'networkidle' });
    
    console.log(`📊 Analyzing: ${url}`);
    
    // Handle cookie consent and popups
    await this.dismissPopups(page);
    
    // Scroll to load all lazy-loaded content
    await this.intelligentScroll(page);

    // Extract all data
    const extractedData: ExtractedData = {
      url,
      title: await this.extractTitle(page),
      description: await this.extractDescription(page),
      images: await this.extractImages(page, url),
      components: await this.extractComponents(page),
      colors: await this.extractColors(page),
      fonts: await this.extractFonts(page),
      structure: await this.extractStructure(page),
      content: await this.extractContent(page),
      metadata: await this.extractMetadata(page)
    };

    // Take screenshots
    await this.captureScreenshots(page);

    await page.close();
    return extractedData;
  }

  private async extractTitle(page: Page): Promise<string> {
    return await page.title();
  }

  private async extractDescription(page: Page): Promise<string> {
    const description = await page.getAttribute('meta[name="description"]', 'content');
    return description || '';
  }

  private async extractImages(page: Page, baseUrl: string): Promise<ImageData[]> {
    // Wait for images to be visible
    await page.waitForLoadState('domcontentloaded');
    
    // Get all images including those with data-src (lazy loading)
    const images = await page.$$eval('img, [data-src], [data-lazy]', (elements, baseUrl) => {
      return elements.map(el => {
        const img = el as HTMLImageElement;
        
        // Get src from various attributes (handle lazy loading)
        const src = img.src || 
                   img.getAttribute('data-src') || 
                   img.getAttribute('data-lazy') ||
                   img.getAttribute('data-original') ||
                   '';
                   
        const alt = img.alt || img.getAttribute('alt') || '';
        const width = img.naturalWidth || img.width || parseInt(img.getAttribute('width') || '0');
        const height = img.naturalHeight || img.height || parseInt(img.getAttribute('height') || '0');
        
        // Skip placeholder or tracking pixels
        if (width === 1 && height === 1) return null;
        if (src.includes('pixel') || src.includes('tracking')) return null;
        if (!src || src === 'data:,' || src.length < 10) return null;
        
        // Determine image type based on attributes and context
        let type: 'logo' | 'hero' | 'product' | 'icon' | 'background' | 'other' = 'other';
        
        const srcLower = src.toLowerCase();
        const altLower = alt.toLowerCase();
        
        if (altLower.includes('logo') || srcLower.includes('logo')) {
          type = 'logo';
        } else if (img.closest('header, nav')) {
          type = 'logo';
        } else if (img.closest('[class*="hero"], [class*="banner"], [class*="slider"]')) {
          type = 'hero';
        } else if (width && height && width < 64 && height < 64) {
          type = 'icon';
        } else if (altLower.includes('product') || srcLower.includes('product') || 
                   altLower.includes('producto') || srcLower.includes('producto')) {
          type = 'product';
        } else if (img.closest('[class*="product"], [class*="item"], [class*="gallery"]')) {
          type = 'product';
        }

        return {
          src,
          alt,
          width,
          height,
          type
        };
      }).filter(Boolean) as ImageData[];
    }, baseUrl);

    // Download images
    for (const image of images) {
      if (image && image.src) {
        try {
          const filename = this.getImageFilename(image.src, image.type);
          const localPath = path.join(this.outputDir, 'images', filename);
          await this.downloadImage(image.src, localPath);
          image.localPath = localPath;
          console.log(`📷 Downloaded: ${filename}`);
        } catch (error) {
          console.error(`❌ Failed to download image: ${image.src}`, error);
        }
      }
    }

    return images;
  }

  private async extractComponents(page: Page): Promise<ComponentData[]> {
    const components = await page.$$eval('*', () => {
      const elements = document.querySelectorAll('header, nav, main, section, article, aside, footer, [class*="component"], [class*="section"], [class*="block"]');
      
      return Array.from(elements).map(el => {
        const computedStyle = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        
        // Only capture elements with significant size
        if (rect.width < 50 || rect.height < 50) return null;
        
        return {
          type: el.tagName.toLowerCase(),
          content: el.textContent?.slice(0, 200) || '',
          styles: {
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            fontSize: computedStyle.fontSize,
            fontFamily: computedStyle.fontFamily,
            padding: computedStyle.padding,
            margin: computedStyle.margin,
            borderRadius: computedStyle.borderRadius,
            border: computedStyle.border,
            display: computedStyle.display,
            flexDirection: computedStyle.flexDirection,
            justifyContent: computedStyle.justifyContent,
            alignItems: computedStyle.alignItems
          },
          attributes: {
            class: el.className,
            id: el.id
          },
          selector: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ').join('.') : '')
        };
      }).filter(Boolean) as ComponentData[];
    });

    return components;
  }

  private async extractColors(page: Page): Promise<string[]> {
    const colors = await page.$$eval('*', () => {
      const colorSet = new Set<string>();
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colorSet.add(style.backgroundColor);
        }
        if (style.color) {
          colorSet.add(style.color);
        }
        if (style.borderColor && style.borderColor !== 'rgb(0, 0, 0)') {
          colorSet.add(style.borderColor);
        }
      });
      
      return Array.from(colorSet);
    });

    return colors;
  }

  private async extractFonts(page: Page): Promise<string[]> {
    const fonts = await page.$$eval('*', () => {
      const fontSet = new Set<string>();
      const elements = document.querySelectorAll('*');
      
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.fontFamily) {
          fontSet.add(style.fontFamily);
        }
      });
      
      return Array.from(fontSet);
    });

    return fonts;
  }

  private async extractStructure(page: Page): Promise<StructureData> {
    return await page.evaluate(() => {
      const navigation = Array.from(document.querySelectorAll('nav a, header a')).map(el => el.textContent?.trim()).filter(Boolean);
      const sections = Array.from(document.querySelectorAll('section, [class*="section"]')).map((el, i) => el.className || `section-${i}`);
      const layout = document.body.className || 'default-layout';
      
      return { navigation, sections, layout };
    });
  }

  private async extractContent(page: Page): Promise<ContentData> {
    return await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(el => ({
        level: parseInt(el.tagName.charAt(1)),
        text: el.textContent?.trim() || ''
      }));
      
      const paragraphs = Array.from(document.querySelectorAll('p')).map(el => el.textContent?.trim()).filter(Boolean);
      const buttons = Array.from(document.querySelectorAll('button, [role="button"], input[type="submit"]')).map(el => el.textContent?.trim()).filter(Boolean);
      const forms = Array.from(document.querySelectorAll('form')).map((form, i) => `form-${i}: ${form.className || 'unnamed'}`);
      const links = Array.from(document.querySelectorAll('a')).map(el => el.textContent?.trim()).filter(Boolean);
      
      return { headings, paragraphs, buttons, forms, links };
    });
  }

  private async extractMetadata(page: Page): Promise<MetaData> {
    return await page.evaluate(() => {
      const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content') || '';
      const charset = document.querySelector('meta[charset]')?.getAttribute('charset') || '';
      
      const ogTags: Record<string, string> = {};
      document.querySelectorAll('meta[property^="og:"]').forEach(meta => {
        const property = meta.getAttribute('property');
        const content = meta.getAttribute('content');
        if (property && content) {
          ogTags[property] = content;
        }
      });
      
      const twitterTags: Record<string, string> = {};
      document.querySelectorAll('meta[name^="twitter:"]').forEach(meta => {
        const name = meta.getAttribute('name');
        const content = meta.getAttribute('content');
        if (name && content) {
          twitterTags[name] = content;
        }
      });
      
      return { viewport, charset, ogTags, twitterTags };
    });
  }

  private getImageFilename(src: string, type: string): string {
    const url = new URL(src);
    const pathname = url.pathname;
    const extension = path.extname(pathname) || '.jpg';
    const basename = path.basename(pathname, extension) || 'image';
    return `${type}-${basename}${extension}`;
  }

  private async downloadImage(url: string, filepath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https:') ? https : http;
      
      protocol.get(url, (response) => {
        if (response.statusCode === 200) {
          const file = fs.createWriteStream(filepath);
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
          file.on('error', reject);
        } else {
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      }).on('error', reject);
    });
  }

  async generateReport(data: ExtractedData): Promise<void> {
    const report = {
      analysis: {
        timestamp: new Date().toISOString(),
        url: data.url,
        title: data.title,
        description: data.description
      },
      assets: {
        images: {
          total: data.images.length,
          byType: this.groupBy(data.images, 'type'),
          downloaded: data.images.filter(img => img.localPath).length
        },
        components: {
          total: data.components.length,
          byType: this.groupBy(data.components, 'type')
        }
      },
      design: {
        colors: data.colors,
        fonts: data.fonts,
        colorPalette: this.extractColorPalette(data.colors)
      },
      structure: data.structure,
      content: {
        headings: data.content.headings.length,
        paragraphs: data.content.paragraphs.length,
        buttons: data.content.buttons.length,
        forms: data.content.forms.length,
        links: data.content.links.length
      },
      metadata: data.metadata,
      recommendations: this.generateRecommendations(data)
    };

    // Save detailed JSON report
    fs.writeFileSync(
      path.join(this.outputDir, 'analysis-report.json'),
      JSON.stringify(data, null, 2)
    );

    // Save summary report
    fs.writeFileSync(
      path.join(this.outputDir, 'analysis-summary.json'),
      JSON.stringify(report, null, 2)
    );

    // Generate markdown report
    const markdownReport = this.generateMarkdownReport(report, data);
    fs.writeFileSync(
      path.join(this.outputDir, 'ANALYSIS-REPORT.md'),
      markdownReport
    );

    console.log(`📋 Reports generated in: ${this.outputDir}`);
  }

  private groupBy<T>(array: T[], key: keyof T): Record<string, number> {
    return array.reduce((acc, item) => {
      const group = String(item[key]);
      acc[group] = (acc[group] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private extractColorPalette(colors: string[]): { primary: string[], secondary: string[], neutral: string[] } {
    // Simple color categorization logic
    const primary: string[] = [];
    const secondary: string[] = [];
    const neutral: string[] = [];

    colors.forEach(color => {
      if (color.includes('rgb(0, 0, 0)') || color.includes('rgb(255, 255, 255)') || color.includes('gray')) {
        neutral.push(color);
      } else if (primary.length < 3) {
        primary.push(color);
      } else {
        secondary.push(color);
      }
    });

    return { primary, secondary, neutral };
  }

  private generateRecommendations(data: ExtractedData): string[] {
    const recommendations: string[] = [];

    if (data.images.length < 5) {
      recommendations.push("Consider adding more visual content to improve engagement");
    }

    if (data.content.headings.length < 3) {
      recommendations.push("Add more heading structure to improve content hierarchy");
    }

    if (!data.metadata.ogTags['og:image']) {
      recommendations.push("Add Open Graph image for better social media sharing");
    }

    if (data.colors.length > 20) {
      recommendations.push("Consider simplifying the color palette for better consistency");
    }

    return recommendations;
  }

  private generateMarkdownReport(report: any, data: ExtractedData): string {
    return `# Website Analysis Report

## Overview
- **URL**: ${data.url}
- **Title**: ${data.title}
- **Analysis Date**: ${report.analysis.timestamp}

## Assets Summary
- **Total Images**: ${report.assets.images.total}
- **Downloaded Images**: ${report.assets.images.downloaded}
- **Components Analyzed**: ${report.assets.components.total}

## Design Elements
### Color Palette
${report.design.colorPalette.primary.map((color: string) => `- ${color}`).join('\n')}

### Typography
${data.fonts.slice(0, 5).map(font => `- ${font}`).join('\n')}

## Content Structure
- **Headings**: ${report.content.headings}
- **Paragraphs**: ${report.content.paragraphs}
- **Buttons**: ${report.content.buttons}
- **Forms**: ${report.content.forms}

## Navigation
${data.structure.navigation.map(item => `- ${item}`).join('\n')}

## Recommendations
${report.recommendations.map((rec: string) => `- ${rec}`).join('\n')}

## Files Generated
- \`analysis-report.json\` - Complete data export
- \`analysis-summary.json\` - Summary statistics
- \`full-page.png\` - Full page screenshot
- \`images/\` - Downloaded images organized by type
`;
  }
}

// CLI Usage
async function main() {
  const args = process.argv.slice(2);
  const url = args[0];

  if (!url) {
    console.error('❌ Please provide a URL to analyze');
    console.log('Usage: npx ts-node scripts/website-analyzer.ts <URL>');
    process.exit(1);
  }

  const analyzer = new WebsiteAnalyzer();
  
  try {
    console.log('🚀 Starting website analysis...');
    await analyzer.init();
    
    const data = await analyzer.analyzeWebsite(url);
    await analyzer.generateReport(data);
    
    console.log('✅ Analysis complete!');
    console.log('📁 Check the ./extracted-assets directory for all files');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  } finally {
    await analyzer.close();
  }
}

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { WebsiteAnalyzer };
export type { ExtractedData };