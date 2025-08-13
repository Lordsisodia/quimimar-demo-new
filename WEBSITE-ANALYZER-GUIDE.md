# 🔍 Website Analyzer - Complete Setup Guide

Your Playwright-powered website analysis tool is ready! Extract elements, images, colors, and design patterns from any website in headless mode.

## ✅ Ready to Use

Everything is set up and configured. Playwright browsers are installed and ready for headless operation.

## 🚀 Quick Start Commands

```bash
# Navigate to the project directory
cd quimimar-demo

# Analyze any website (replace with target URL)
npm run analyze https://example.com

# Examples for different types of sites:
npm run analyze https://stripe.com          # Clean, modern design
npm run analyze https://airbnb.com          # Rich imagery, UX patterns  
npm run analyze https://shopify.com         # E-commerce layouts
npm run analyze https://dribbble.com        # Design inspiration
npm run analyze https://quimimar.com        # Your client's current site
```

## 📁 What Gets Extracted

After running analysis, check `extracted-assets/` folder:

```
extracted-assets/
├── 📄 ANALYSIS-REPORT.md      # Human-readable summary
├── 📊 analysis-report.json    # Complete structured data  
├── 📈 analysis-summary.json   # Quick stats & insights
├── 📷 full-page.png          # Full page screenshot
└── 🖼️  images/               # All images organized by type
    ├── logo-*.png            # Logo files
    ├── hero-*.jpg            # Hero/banner images  
    ├── product-*.jpg         # Product images
    ├── icon-*.svg            # Icon files
    └── other-*.png           # Miscellaneous images
```

## 🎯 Perfect For

### Competitive Analysis
- Extract competitor design patterns
- Download their image assets
- Analyze their color schemes
- Study their content structure

### Client Asset Migration  
- Backup current website assets
- Extract existing brand colors
- Download current images/logos
- Map content structure

### Design Inspiration
- Analyze trendy websites
- Extract modern color palettes
- Study layout patterns
- Download reference images

## 📊 Example Analysis Output

When you run the analyzer, you'll see:

```
🚀 Starting comprehensive website analysis...
🎯 Target: https://example.com

🌐 Browser launched in headless mode
📷 Downloaded: logo-company-logo.png
📷 Downloaded: hero-main-banner.jpg
📷 Downloaded: product-featured-item.jpg
📷 Downloaded: icon-feature-check.svg

📊 Analysis Results:
   ⏱️  Duration: 12.3s
   🖼️  Images found: 47
   🧩 Components: 23  
   🎨 Colors: 15
   📝 Content sections: 12

✅ Analysis complete!

📁 Generated files:
   📄 extracted-assets/ANALYSIS-REPORT.md
   📊 extracted-assets/analysis-report.json
   📈 extracted-assets/analysis-summary.json  
   📷 extracted-assets/full-page.png
   🖼️  extracted-assets/images/
```

## 🛠️ Advanced Usage

### Programmatic Usage
```typescript
import { WebsiteAnalyzer } from './scripts/website-analyzer';

const analyzer = new WebsiteAnalyzer('./custom-output');
await analyzer.init();
const data = await analyzer.analyzeWebsite('https://site.com');
await analyzer.generateReport(data);
await analyzer.close();
```

### Batch Analysis
```bash
# Analyze multiple competitor sites
npm run analyze https://competitor1.com
npm run analyze https://competitor2.com  
npm run analyze https://competitor3.com
```

## 🎨 Using Extracted Data

### 1. Colors for Tailwind Config
```javascript
// From extracted colors, add to tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1e40af',    // Extracted primary color
        'brand-gray': '#6b7280',    // Extracted secondary color
        'accent': '#f59e0b',        // Extracted accent color
      }
    }
  }
}
```

### 2. Images for Your Project
```bash
# Copy relevant images to your public folder
cp extracted-assets/images/logo-*.* public/images/
cp extracted-assets/images/hero-*.* public/images/
```

### 3. Component Patterns
Use the extracted component structures as blueprints for your React components.

## 🔧 Troubleshooting

### Common Issues

**"Analysis failed" error:**
- Check URL is live and accessible
- Ensure internet connection is stable
- Try with a simpler website first

**"Browser not found" error:**
```bash
npm run install-playwright
```

**"Permission denied" error:**
- Check write permissions in project directory
- Try running with `sudo` (macOS/Linux)

**No images downloaded:**
- Site might block automated downloads
- Images might be lazy-loaded
- Try analyzing after page loads completely

## 💡 Pro Tips

1. **Analyze competitor homepages** - Get their best design patterns
2. **Extract before redesigning** - Preserve current client assets  
3. **Use for mood boards** - Download inspiration imagery
4. **Batch process** - Analyze multiple sites for comprehensive research
5. **Check mobile versions** - Many sites have different mobile assets

## 🚀 Ready to Extract!

Your website analyzer is fully configured and ready. Start with:

```bash
npm run analyze https://your-target-website.com
```

The tool runs completely in headless mode - no browser windows will open, just pure automated extraction! Perfect for gathering all the elements and images you need for your Quimimar project. 🎯