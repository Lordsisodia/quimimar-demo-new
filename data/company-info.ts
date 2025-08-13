/**
 * Company Information extracted from QDQ Profile
 * Source: https://www.qdq.com/quimimar-282179
 */

export const companyInfo = {
  // Basic Information
  name: 'QUIMIMAR',
  industry: 'Productos Químicos',
  industryEn: 'Chemical Products',
  
  // Contact Information
  contact: {
    address: {
      street: 'Calle Uruguay s/n, Parc. 8/26',
      city: 'Alcantarilla',
      state: 'Murcia',
      postalCode: '30820',
      country: 'España',
      countryEn: 'Spain'
    },
    location: {
      lat: 37.960091,
      lng: -1.199337
    },
    // Add phone and email when available
    phone: '',
    email: '',
    website: 'www.quimimar.com' // Your new website
  },

  // Brand Colors from QDQ
  brandColors: {
    primary: 'rgb(0, 86, 167)', // Professional blue
    secondary: 'rgb(244, 244, 244)', // Light gray
    accent: 'rgb(107, 220, 95)', // Green accent
    text: 'rgb(33, 33, 33)', // Dark gray text
    background: 'rgb(255, 255, 255)' // White
  },

  // Typography
  typography: {
    primary: '"DM Sans", sans-serif',
    fallback: 'Arial, sans-serif'
  },

  // SEO Metadata
  seo: {
    title: 'QUIMIMAR - Productos Químicos en Alcantarilla, Murcia',
    titleEn: 'QUIMIMAR - Chemical Products in Alcantarilla, Murcia',
    description: 'Empresa líder en productos químicos industriales en Alcantarilla, Murcia. Calidad y servicio garantizado.',
    descriptionEn: 'Leading industrial chemical products company in Alcantarilla, Murcia. Quality and service guaranteed.',
    keywords: [
      'productos químicos',
      'químicos industriales', 
      'Alcantarilla',
      'Murcia',
      'QUIMIMAR',
      'chemical products',
      'industrial chemicals'
    ]
  },

  // Business Hours (to be confirmed)
  businessHours: {
    monday: '9:00 - 18:00',
    tuesday: '9:00 - 18:00',
    wednesday: '9:00 - 18:00',
    thursday: '9:00 - 18:00',
    friday: '9:00 - 18:00',
    saturday: 'Cerrado',
    sunday: 'Cerrado'
  },

  // Competitor Analysis (from QDQ)
  competitors: [
    {
      name: 'REFRIMUR, S.L.',
      address: 'Avenida Descubrimiento s/n, 30820, Alcantarilla, Murcia'
    },
    {
      name: 'PRODUCTOS QUIMICOS DE MURCIA, S.A.',
      address: 'Polígono Industrial Oeste s/n, Parc. 21/1, 30169, San Ginés, Murcia'
    },
    {
      name: 'TRÉBOL QUÍMICA, S.L.',
      address: 'Calle Venezuela s/n, Pol. Ind. Oeste - Parc. 10/8 - Nave F6, 30169, San Ginés, Murcia'
    }
  ]
};

// Export Tailwind-compatible color config
export const tailwindColors = {
  'quimimar-blue': companyInfo.brandColors.primary,
  'quimimar-gray': companyInfo.brandColors.secondary,
  'quimimar-green': companyInfo.brandColors.accent,
  'quimimar-text': companyInfo.brandColors.text
};