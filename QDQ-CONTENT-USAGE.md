# 📋 QDQ Content Usage Guide for Quimimar App

## ✅ Content We're Using

### 1. **Company Information**
- **Name**: QUIMIMAR
- **Industry**: Productos Químicos (Chemical Products)
- **Full Address**: Calle Uruguay s/n, Parc. 8/26, 30820 Alcantarilla, Murcia
- **GPS Coordinates**: 37.960091, -1.199337 (exact location)

### 2. **Design Elements**
```css
/* Extracted Brand Colors */
--quimimar-blue: rgb(0, 86, 167);     /* Professional chemical industry blue */
--quimimar-gray: rgb(244, 244, 244);  /* Light gray backgrounds */
--quimimar-green: rgb(107, 220, 95);  /* Green accent for CTAs */
--quimimar-text: rgb(33, 33, 33);     /* Dark gray text */

/* Typography */
font-family: "DM Sans", sans-serif;    /* Modern, clean font */
```

### 3. **Location Map**
- Using exact coordinates for interactive map
- Shows real business location in industrial area
- Map image saved: `other-img.jpg`

### 4. **SEO & Metadata**
```typescript
// Optimized for local search
title: "QUIMIMAR - Productos Químicos en Alcantarilla, Murcia"
description: "Empresa líder en productos químicos industriales..."
keywords: ["productos químicos", "Alcantarilla", "Murcia", "QUIMIMAR"]
```

## 🚫 Content We're NOT Using

1. **QDQ Logos** - These belong to QDQ, not Quimimar
2. **Cookie Icons** - Generic cookie consent elements
3. **Other Businesses** - Competitor listings (kept for reference only)

## 📁 Implementation Status

### ✅ Already Implemented
1. Created `data/company-info.ts` with all extracted data
2. Updated ContactSection to use real coordinates
3. Configured brand colors for Tailwind

### 🔄 Next Steps
1. Update Tailwind config with brand colors
2. Add company info to footer
3. Update all SEO metadata
4. Create location-based schema markup

## 🎨 Color Usage Guide

```typescript
// In Tailwind Config
colors: {
  'quimimar-blue': 'rgb(0, 86, 167)',
  'quimimar-gray': 'rgb(244, 244, 244)',
  'quimimar-green': 'rgb(107, 220, 95)',
  'quimimar-text': 'rgb(33, 33, 33)'
}

// Usage in Components
<div className="bg-quimimar-blue text-white">
  Primary brand color
</div>

<button className="bg-quimimar-green hover:bg-green-600">
  Call to Action
</button>
```

## 🗺️ Map Integration

The exact business location is now integrated:
- **Latitude**: 37.960091
- **Longitude**: -1.199337
- **Full Address**: Calle Uruguay s/n, Parc. 8/26, 30820 Alcantarilla, Murcia

This provides accurate directions for customers visiting the facility.

## 📱 Contact Information

Still needed from client:
- Phone number
- WhatsApp number
- Email address
- Business hours confirmation

---

*All content extracted using the MAIN BRAIN Playwright analyzer from https://www.qdq.com/quimimar-282179*