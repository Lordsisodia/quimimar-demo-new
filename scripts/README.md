# Website Analyzer - Extract Elements & Assets

Powerful Playwright-based tool to analyze any website and extract:
- 🖼️ All images (logos, products, icons, hero images)
- 🎨 Color palette and design tokens  
- 📝 Content structure (headings, text, buttons)
- 🧩 Components and layout patterns
- 📱 Full page screenshots
- 🔍 Metadata and SEO data

## Quick Start

```bash
# Install Playwright browsers (one-time setup)
npm run install-playwright

# Analyze any website
npm run analyze https://example.com
npm run analyze https://competitor-site.com
npm run analyze https://client-current-website.com
```

## What You Get

After running the analyzer, check the `extracted-assets/` folder:

```
extracted-assets/
├── ANALYSIS-REPORT.md          # Human-readable summary
├── analysis-report.json        # Complete structured data
├── analysis-summary.json       # Statistics and insights
├── full-page.png              # Full page screenshot
└── images/                    # Downloaded images by type
    ├── logo-company-name.png
    ├── hero-main-banner.jpg
    ├── product-item-1.jpg
    ├── icon-feature-1.svg
    └── ...
```

## Features

### 🖼️ Smart Image Extraction
- Automatically categorizes images (logos, heroes, products, icons)
- Downloads all images with organized naming
- Preserves original quality and formats
- Extracts dimensions and metadata

### 🎨 Design System Analysis
- Extracts complete color palette
- Identifies font families and typography
- Analyzes spacing and layout patterns
- Captures component structures

### 📝 Content Structure
- Maps all headings hierarchy
- Extracts navigation structure
- Identifies call-to-action buttons
- Analyzes form patterns

### 🧩 Component Analysis
- Identifies reusable components
- Extracts CSS styles and properties
- Maps layout patterns (flex, grid)
- Captures interactive elements

## Usage Examples

```bash
# Analyze competitor website
npm run analyze https://competitor.com

# Extract assets from client's current site
npm run analyze https://quimimar.com

# Analyze inspiration sites
npm run analyze https://dribbble.com/shots/popular
```

## Advanced Usage

You can also use the analyzer programmatically:

```typescript
import { WebsiteAnalyzer } from './scripts/website-analyzer';

const analyzer = new WebsiteAnalyzer('./my-output-folder');
await analyzer.init();

const data = await analyzer.analyzeWebsite('https://example.com');
await analyzer.generateReport(data);

console.log('Images found:', data.images.length);
console.log('Colors extracted:', data.colors.length);

await analyzer.close();
```

## Output Structure

### Analysis Report (`ANALYSIS-REPORT.md`)
- Executive summary
- Asset inventory  
- Design system breakdown
- Content structure map
- Recommendations for implementation

### Complete Data (`analysis-report.json`)
- Full structured data export
- All metadata and properties
- Raw extraction results
- Perfect for programmatic processing

### Summary Stats (`analysis-summary.json`)
- Quick statistics overview
- Asset counts and breakdowns
- Design token summaries
- Implementation recommendations

## Tips for Best Results

1. **Use on live websites** - Better than staging/dev sites
2. **Analyze multiple pages** - Run on homepage, product pages, etc.
3. **Check mobile sites** - Many have different assets
4. **Review competitor sites** - Great for inspiration
5. **Extract before redesigns** - Preserve current assets

## Troubleshooting

If analysis fails:
- Ensure URL is accessible and live
- Check internet connection
- Try with simpler websites first
- Run `npm run install-playwright` if browser missing

## Integration with Your Project

Use extracted assets in your Quimimar project:

1. **Images**: Copy relevant images to `/public/images/`
2. **Colors**: Add to Tailwind config or CSS variables
3. **Fonts**: Import Google Fonts or web fonts
4. **Components**: Adapt structures to React components
5. **Content**: Use as baseline for copywriting

Perfect for competitive analysis and rapid prototyping! 🚀