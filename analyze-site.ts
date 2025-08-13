import { chromium } from '@playwright/test';

interface AnalysisResult {
  pageAnalysis: any[];
  brokenLinks: string[];
  unconnectedButtons: any[];
  missingPages: string[];
  performanceMetrics: any;
  mobileResponsiveness: any;
  recommendations: string[];
}

async function analyzeSite(): Promise<AnalysisResult> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  const baseUrl = 'https://quimimar-demo.vercel.app';
  
  const results: AnalysisResult = {
    pageAnalysis: [],
    brokenLinks: [],
    unconnectedButtons: [],
    missingPages: [],
    performanceMetrics: {},
    mobileResponsiveness: {},
    recommendations: []
  };

  console.log('🔍 Starting Quimimar Demo Analysis...\n');

  // Analyze home page
  console.log('📄 Analyzing Home Page...');
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  
  // Check page load performance
  const performanceTiming = await page.evaluate(() => {
    const timing = performance.timing;
    return {
      pageLoadTime: timing.loadEventEnd - timing.navigationStart,
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
    };
  });
  
  results.performanceMetrics = performanceTiming;
  console.log(`  ⏱️  Page Load Time: ${performanceTiming.pageLoadTime}ms`);
  console.log(`  ⏱️  DOM Content Loaded: ${performanceTiming.domContentLoaded}ms`);
  console.log(`  ⏱️  First Paint: ${performanceTiming.firstPaint}ms\n`);

  // Find all buttons and links
  const buttonsAndLinks = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const links = Array.from(document.querySelectorAll('a'));
    
    return {
      buttons: buttons.map(btn => ({
        text: btn.textContent?.trim() || '',
        hasClickHandler: btn.onclick !== null || btn.hasAttribute('onclick'),
        isDisabled: btn.disabled,
        className: btn.className,
        parentElement: btn.parentElement?.tagName
      })),
      links: links.map(link => ({
        text: link.textContent?.trim() || '',
        href: link.href,
        isExternal: link.href.startsWith('http') && !link.href.includes('quimimar-demo'),
        hasTarget: link.target === '_blank'
      }))
    };
  });

  console.log('🔘 Button Analysis:');
  console.log(`  Total buttons found: ${buttonsAndLinks.buttons.length}`);
  
  // Check for unconnected buttons
  const potentiallyUnconnected = buttonsAndLinks.buttons.filter(btn => 
    !btn.hasClickHandler && !btn.isDisabled && btn.text && 
    !btn.text.includes('Loading') && !btn.parentElement?.includes('FORM')
  );
  
  if (potentiallyUnconnected.length > 0) {
    console.log(`  ⚠️  Potentially unconnected buttons: ${potentiallyUnconnected.length}`);
    potentiallyUnconnected.forEach(btn => {
      console.log(`     - "${btn.text}"`);
      results.unconnectedButtons.push(btn);
    });
  }

  console.log('\n🔗 Link Analysis:');
  console.log(`  Total links found: ${buttonsAndLinks.links.length}`);
  
  // Check for broken internal links
  const internalLinks = buttonsAndLinks.links.filter(link => 
    !link.isExternal && link.href && !link.href.includes('#')
  );
  
  console.log(`  Internal links: ${internalLinks.length}`);
  console.log(`  External links: ${buttonsAndLinks.links.filter(l => l.isExternal).length}\n`);

  // Test language switcher
  console.log('🌐 Testing Language Switcher...');
  const langButton = await page.$('button:has-text("ES")');
  if (langButton) {
    await langButton.click();
    await page.waitForTimeout(500);
    const hasEnglish = await page.$('button:has-text("EN")');
    console.log(`  ✅ Language switcher works: ${hasEnglish ? 'Yes' : 'No'}\n`);
  }

  // Check product interactions
  console.log('🛒 Testing Product Features...');
  const quickViewButtons = await page.$$('button:has-text("Vista rápida")');
  console.log(`  Quick view buttons found: ${quickViewButtons.length}`);
  
  if (quickViewButtons.length > 0) {
    await quickViewButtons[0].click();
    await page.waitForTimeout(1000);
    const modalVisible = await page.$('.fixed.inset-0');
    console.log(`  ✅ Quick view modal opens: ${modalVisible ? 'Yes' : 'No'}`);
    
    if (modalVisible) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
  }

  // Check business form
  console.log('\n📋 Testing Business Form...');
  const businessButton = await page.$('button:has-text("Solicitar Cuenta Empresa")');
  if (businessButton) {
    await businessButton.click();
    await page.waitForTimeout(1000);
    const formVisible = await page.$('form');
    console.log(`  ✅ Business form modal opens: ${formVisible ? 'Yes' : 'No'}`);
    
    if (formVisible) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
  }

  // Test mobile responsiveness
  console.log('\n📱 Testing Mobile Responsiveness...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(baseUrl, { waitUntil: 'networkidle' });
  
  const mobileMenuButton = await mobilePage.$('button[aria-label*="menu"], button:has-text("☰")');
  console.log(`  ✅ Mobile menu button visible: ${mobileMenuButton ? 'Yes' : 'No'}`);
  
  const mobileLayout = await mobilePage.evaluate(() => {
    const header = document.querySelector('header');
    const products = document.querySelectorAll('[class*="grid"] > div');
    return {
      headerHeight: header?.offsetHeight || 0,
      productsPerRow: products.length > 0 ? Math.floor(window.innerWidth / (products[0] as HTMLElement).offsetWidth) : 0,
      hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  
  console.log(`  Products per row on mobile: ${mobileLayout.productsPerRow}`);
  console.log(`  ⚠️  Horizontal scroll detected: ${mobileLayout.hasHorizontalScroll ? 'Yes' : 'No'}\n`);
  
  results.mobileResponsiveness = mobileLayout;

  // Check for missing pages
  console.log('🔍 Checking for Missing Pages...');
  const pagesToCheck = [
    { path: '/products', name: 'Products Page' },
    { path: '/business', name: 'Business Page' },
    { path: '/about', name: 'About Page' },
    { path: '/contact', name: 'Contact Page' },
    { path: '/admin', name: 'Admin Dashboard' }
  ];

  for (const pageInfo of pagesToCheck) {
    const response = await page.goto(baseUrl + pageInfo.path, { 
      waitUntil: 'domcontentloaded',
      timeout: 10000 
    }).catch(() => null);
    
    if (!response || response.status() === 404) {
      console.log(`  ❌ ${pageInfo.name}: Not Found`);
      results.missingPages.push(pageInfo.path);
    } else {
      console.log(`  ✅ ${pageInfo.name}: Found`);
    }
  }

  // Generate recommendations
  console.log('\n💡 Recommendations:');
  
  if (results.missingPages.length > 0) {
    results.recommendations.push('Create missing pages: ' + results.missingPages.join(', '));
  }
  
  if (results.unconnectedButtons.length > 0) {
    results.recommendations.push('Connect unresponsive buttons to their respective actions');
  }
  
  if (performanceTiming.pageLoadTime > 3000) {
    results.recommendations.push('Optimize page load time (currently ' + performanceTiming.pageLoadTime + 'ms)');
  }
  
  if (mobileLayout.hasHorizontalScroll) {
    results.recommendations.push('Fix horizontal scroll on mobile devices');
  }

  results.recommendations.push('Add search functionality to the search bar');
  results.recommendations.push('Implement user authentication for business accounts');
  results.recommendations.push('Add cart functionality to "Add to Cart" buttons');
  results.recommendations.push('Create product detail pages');
  results.recommendations.push('Add contact form functionality');
  results.recommendations.push('Implement newsletter subscription');

  results.recommendations.forEach(rec => console.log(`  • ${rec}`));

  await browser.close();
  
  return results;
}

// Run the analysis
analyzeSite().then(results => {
  console.log('\n\n📊 ANALYSIS COMPLETE!');
  console.log('====================');
  console.log('\n📈 Summary:');
  console.log(`  • Missing Pages: ${results.missingPages.length}`);
  console.log(`  • Unconnected Buttons: ${results.unconnectedButtons.length}`);
  console.log(`  • Page Load Time: ${results.performanceMetrics.pageLoadTime}ms`);
  console.log(`  • Mobile Responsive: ${!results.mobileResponsiveness.hasHorizontalScroll ? '✅' : '⚠️'}`);
  console.log(`  • Total Recommendations: ${results.recommendations.length}`);
}).catch(console.error);