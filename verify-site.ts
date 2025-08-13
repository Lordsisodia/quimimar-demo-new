import { chromium } from '@playwright/test';

interface PageCheck {
  path: string;
  name: string;
  expectedContent?: string[];
  expectedElements?: string[];
}

async function verifySite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  const baseUrl = 'https://quimimar-demo.vercel.app';
  
  console.log('🔍 Verifying Quimimar Demo Site\n');
  console.log(`🌐 Base URL: ${baseUrl}\n`);

  // Pages to check
  const pagesToCheck: PageCheck[] = [
    {
      path: '/',
      name: 'Home Page',
      expectedContent: ['Tu Distribuidor de Confianza', 'Productos Destacados'],
      expectedElements: ['header', 'nav', '.hero', '.products']
    },
    {
      path: '/productos',
      name: 'Products Page (Spanish)',
      expectedContent: ['Nuestros Productos', 'Buscar productos'],
      expectedElements: ['input[type="text"]', '.product-grid, .grid']
    },
    {
      path: '/empresas',
      name: 'Business Page (Spanish)',
      expectedContent: ['Únete a Quimimar Empresas', 'Ventajas Exclusivas'],
      expectedElements: ['button', '.benefits, .features']
    },
    {
      path: '/nosotros',
      name: 'About Page (Spanish)',
      expectedContent: ['Sobre Quimimar', '35 años'],
      expectedElements: ['.stats, .metrics', '.timeline, .history']
    },
    {
      path: '/contacto',
      name: 'Contact Page (Spanish)',
      expectedContent: ['Contacta con Nosotros', '968 88 22 04'],
      expectedElements: ['form', 'input[type="email"]']
    },
    {
      path: '/admin',
      name: 'Admin Dashboard',
      expectedContent: ['Admin Dashboard', 'Today\'s Sales'],
      expectedElements: ['.dashboard', '.metrics']
    },
    {
      path: '/carrito',
      name: 'Cart Page',
      expectedContent: ['Tu Carrito', 'carrito está vacío'],
      expectedElements: ['.cart, .carrito']
    },
    {
      path: '/account',
      name: 'Account Page',
      expectedContent: ['Mi Cuenta', 'Iniciar Sesión'],
      expectedElements: ['form', 'input[type="email"]']
    }
  ];

  let successCount = 0;
  let failureCount = 0;
  const issues: string[] = [];

  // Check each page
  for (const pageCheck of pagesToCheck) {
    console.log(`📄 Checking ${pageCheck.name} (${pageCheck.path})...`);
    
    try {
      const response = await page.goto(baseUrl + pageCheck.path, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      if (!response || response.status() === 404) {
        console.log(`  ❌ Page not found (404)`);
        failureCount++;
        issues.push(`${pageCheck.name}: Page returns 404`);
        continue;
      }
      
      if (response.status() !== 200) {
        console.log(`  ⚠️  Unexpected status: ${response.status()}`);
      }
      
      // Check for expected content
      let contentFound = true;
      if (pageCheck.expectedContent) {
        for (const content of pageCheck.expectedContent) {
          const hasContent = await page.locator(`text="${content}"`).count() > 0;
          if (!hasContent) {
            console.log(`  ⚠️  Missing expected content: "${content}"`);
            contentFound = false;
            issues.push(`${pageCheck.name}: Missing content "${content}"`);
          }
        }
      }
      
      // Check for expected elements
      let elementsFound = true;
      if (pageCheck.expectedElements) {
        for (const selector of pageCheck.expectedElements) {
          const elementCount = await page.locator(selector).count();
          if (elementCount === 0) {
            console.log(`  ⚠️  Missing expected element: ${selector}`);
            elementsFound = false;
            issues.push(`${pageCheck.name}: Missing element ${selector}`);
          }
        }
      }
      
      if (contentFound && elementsFound) {
        console.log(`  ✅ Page loaded successfully`);
        successCount++;
      } else {
        failureCount++;
      }
      
      // Take screenshot for reference
      await page.screenshot({ 
        path: `screenshots/${pageCheck.path.replace('/', '') || 'home'}.png`,
        fullPage: false 
      });
      
    } catch (error) {
      console.log(`  ❌ Error: ${error}`);
      failureCount++;
      issues.push(`${pageCheck.name}: ${error}`);
    }
    
    console.log('');
  }

  // Test language switcher
  console.log('🌐 Testing Language Switcher...');
  await page.goto(baseUrl);
  
  try {
    // Find language button (ES/EN)
    const langButton = await page.locator('button:has-text("ES"), button:has-text("EN")').first();
    if (await langButton.isVisible()) {
      const initialLang = await langButton.textContent();
      await langButton.click();
      await page.waitForTimeout(500);
      
      const newLang = await langButton.textContent();
      if (initialLang !== newLang) {
        console.log(`  ✅ Language switcher works (${initialLang} → ${newLang})`);
        successCount++;
      } else {
        console.log(`  ❌ Language switcher not working`);
        failureCount++;
      }
    } else {
      console.log(`  ❌ Language switcher not found`);
      failureCount++;
    }
  } catch (error) {
    console.log(`  ❌ Language test error: ${error}`);
    failureCount++;
  }

  // Test mobile responsiveness
  console.log('\n📱 Testing Mobile Responsiveness...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const mobilePage = await mobileContext.newPage();
  
  await mobilePage.goto(baseUrl);
  const hasHorizontalScroll = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  
  if (hasHorizontalScroll) {
    console.log('  ⚠️  Horizontal scroll detected on mobile');
    issues.push('Mobile: Horizontal scroll issue');
  } else {
    console.log('  ✅ No horizontal scroll on mobile');
  }
  
  await mobileContext.close();

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 VERIFICATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successful checks: ${successCount}`);
  console.log(`❌ Failed checks: ${failureCount}`);
  console.log(`📄 Total pages checked: ${pagesToCheck.length}`);
  
  if (issues.length > 0) {
    console.log('\n⚠️  Issues Found:');
    issues.forEach(issue => console.log(`  • ${issue}`));
  } else {
    console.log('\n🎉 All checks passed!');
  }

  await browser.close();
}

// Create screenshots directory
import * as fs from 'fs';
if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

// Run verification
verifySite().catch(console.error);