#!/usr/bin/env npx ts-node

import { WebsiteAnalyzer } from './website-analyzer.js';

async function analyzeSite() {
  // Get URL from command line arguments or use default
  const args = process.argv.slice(2);
  let targetUrl = args[0];

  // If no URL provided, prompt for it
  if (!targetUrl) {
    console.log('🔍 Website Analyzer - Extract elements, images, and design from any website');
    console.log('');
    console.log('Usage examples:');
    console.log('  npm run analyze https://example.com');
    console.log('  npm run analyze https://competitor-site.com');
    console.log('  npm run analyze https://client-current-website.com');
    console.log('');
    console.error('❌ Please provide a URL to analyze');
    process.exit(1);
  }

  // Validate URL
  try {
    new URL(targetUrl);
  } catch {
    console.error('❌ Invalid URL provided');
    process.exit(1);
  }

  console.log('🚀 Starting comprehensive website analysis...');
  console.log(`🎯 Target: ${targetUrl}`);
  console.log('');

  const analyzer = new WebsiteAnalyzer('./extracted-assets');
  
  try {
    await analyzer.init();
    console.log('🌐 Browser launched in headless mode');
    
    const startTime = Date.now();
    const data = await analyzer.analyzeWebsite(targetUrl);
    const duration = (Date.now() - startTime) / 1000;
    
    console.log('');
    console.log('📊 Analysis Results:');
    console.log(`   ⏱️  Duration: ${duration.toFixed(2)}s`);
    console.log(`   🖼️  Images found: ${data.images.length}`);
    console.log(`   🧩 Components: ${data.components.length}`);
    console.log(`   🎨 Colors: ${data.colors.length}`);
    console.log(`   📝 Content sections: ${data.content.headings.length}`);
    console.log('');
    
    await analyzer.generateReport(data);
    
    console.log('✅ Analysis complete!');
    console.log('');
    console.log('📁 Generated files:');
    console.log('   📄 extracted-assets/ANALYSIS-REPORT.md - Human-readable report');
    console.log('   📊 extracted-assets/analysis-report.json - Complete data');
    console.log('   📈 extracted-assets/analysis-summary.json - Summary stats');
    console.log('   📷 extracted-assets/full-page.png - Full page screenshot');
    console.log('   🖼️  extracted-assets/images/ - All downloaded images');
    console.log('');
    console.log('💡 Next steps:');
    console.log('   1. Review the ANALYSIS-REPORT.md file');
    console.log('   2. Check downloaded images in the images/ folder');
    console.log('   3. Use the extracted colors and fonts in your design');
    console.log('   4. Adapt components structure for your project');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   • Make sure the URL is accessible');
    console.log('   • Check your internet connection');
    console.log('   • Try a different website');
    console.log('   • Ensure Playwright dependencies are installed');
    process.exit(1);
  } finally {
    await analyzer.close();
  }
}

// Run if called directly
if (require.main === module) {
  analyzeSite().catch(console.error);
}

export { analyzeSite };