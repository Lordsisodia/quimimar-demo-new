// Product Bundle Configuration for Quimimar
// High ROI: Increase AOV by 35-50% with industry-specific bundles

export interface BundleProduct {
  productId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  usage: string;
}

export interface ProductBundle {
  id: string;
  name: string;
  description: string;
  industry: string[];
  businessSize: 'small' | 'medium' | 'large' | 'enterprise';
  products: BundleProduct[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  savingsPercentage: number;
  estimatedDuration: string;
  suitableFor: string[];
  keyBenefits: string[];
  monthlyEstimate?: number;
  featured?: boolean;
  season?: 'all' | 'winter' | 'summer' | 'spring' | 'autumn';
}

// Industry-Specific Bundle Definitions
export const PRODUCT_BUNDLES: ProductBundle[] = [
  {
    id: "REST-STARTER",
    name: "Pack Restaurante Starter",
    description: "Kit básico para restaurantes pequeños y medianos. Todo lo esencial para mantener tu cocina impecable y cumplir con sanidad.",
    industry: ["restaurante", "bar", "cafetería", "tapas"],
    businessSize: "small",
    products: [
      {
        productId: "CLORSAN-5L",
        name: "CLORSAN", 
        size: "5L",
        price: 8.91,
        quantity: 1,
        usage: "Desinfección diaria de superficies de cocina"
      },
      {
        productId: "DENGRAS-F-125KG",
        name: "DENGRAS F",
        size: "1.25KG", 
        price: 3.77,
        quantity: 2,
        usage: "Limpieza de planchas y freidoras"
      },
      {
        productId: "WAN-FLORAL-5L",
        name: "WAN FLORAL",
        size: "5L",
        price: 4.50,
        quantity: 1,
        usage: "Fregado de suelos comedor y zona pública"
      },
      {
        productId: "SANICAL-1L", 
        name: "SANICAL",
        size: "1L",
        price: 3.50,
        quantity: 1,
        usage: "Limpieza intensiva de baños"
      }
    ],
    originalPrice: 20.68,
    bundlePrice: 17.58,
    savings: 3.10,
    savingsPercentage: 15,
    estimatedDuration: "3-4 semanas",
    suitableFor: ["Restaurantes 20-40 comensales", "Bares con cocina", "Cafeterías"],
    keyBenefits: [
      "Cumplimiento normativa sanitaria",
      "Desinfección profesional",
      "Ahorro inmediato 15%",
      "Productos específicos hostelería"
    ],
    monthlyEstimate: 52.74, // 3 packs/month
    featured: true
  },

  {
    id: "REST-PREMIUM",
    name: "Pack Restaurante Premium", 
    description: "Solución completa para restaurantes exigentes. Incluye productos premium y especialidades para un acabado profesional.",
    industry: ["restaurante", "hotel-restaurant", "gastronomía"],
    businessSize: "medium",
    products: [
      {
        productId: "CLORSAN-5L",
        name: "CLORSAN",
        size: "5L", 
        price: 8.91,
        quantity: 2,
        usage: "Desinfección intensiva diaria"
      },
      {
        productId: "DENGRAS-F-6KG",
        name: "DENGRAS F",
        size: "6KG",
        price: 18.15,
        quantity: 1,
        usage: "Desengrase profesional intensivo"
      },
      {
        productId: "FRESC-5L",
        name: "FRESC", 
        size: "5L",
        price: 9.90,
        quantity: 1,
        usage: "Limpieza y desinfección de mesas"
      },
      {
        productId: "WAN-FLORAL-5L",
        name: "WAN FLORAL",
        size: "5L",
        price: 4.50,
        quantity: 2,
        usage: "Suelos zona pública y privada"
      },
      {
        productId: "SILK-5L",
        name: "SILK",
        size: "5L",
        price: 15.25,
        quantity: 1,
        usage: "Ambientación profesional"
      },
      {
        productId: "SANICAL-1L",
        name: "SANICAL", 
        size: "1L",
        price: 3.50,
        quantity: 2,
        usage: "Baños clientes y personal"
      }
    ],
    originalPrice: 78.71,
    bundlePrice: 66.90,
    savings: 11.81,
    savingsPercentage: 15,
    estimatedDuration: "4-6 semanas",
    suitableFor: ["Restaurantes 40-80 comensales", "Hoteles con restaurante", "Cocinas show cooking"],
    keyBenefits: [
      "Imagen premium establecimiento",
      "Máxima higiene y desinfección", 
      "Ambientación profesional",
      "Ahorro 15% + envío gratuito"
    ],
    monthlyEstimate: 133.80,
    featured: true
  },

  {
    id: "HOTEL-ESSENTIAL",
    name: "Pack Hotel Esencial",
    description: "Solución integral para hoteles pequeños y hostales. Cubre habitaciones, baños, zonas comunes y recepción.",
    industry: ["hotel", "hostal", "pensión", "apartamentos"],
    businessSize: "small",
    products: [
      {
        productId: "FRESC-5L",
        name: "FRESC",
        size: "5L",
        price: 9.90,
        quantity: 2,
        usage: "Limpieza diaria habitaciones y baños"
      },
      {
        productId: "SILK-5L", 
        name: "SILK",
        size: "5L",
        price: 15.25,
        quantity: 1,
        usage: "Ambientador pasillos y zonas comunes"
      },
      {
        productId: "WAN-FLORAL-5L",
        name: "WAN FLORAL",
        size: "5L",
        price: 4.50,
        quantity: 2,
        usage: "Suelos recepción, pasillos y habitaciones"
      },
      {
        productId: "SANICAL-1L",
        name: "SANICAL",
        size: "1L", 
        price: 3.50,
        quantity: 3,
        usage: "Limpieza intensiva baños habitaciones"
      },
      {
        productId: "CLORSAN-5L",
        name: "CLORSAN",
        size: "5L",
        price: 8.91,
        quantity: 1,
        usage: "Desinfección zonas comunes"
      }
    ],
    originalPrice: 57.46,
    bundlePrice: 48.84,
    savings: 8.62,
    savingsPercentage: 15,
    estimatedDuration: "3-4 semanas",
    suitableFor: ["Hoteles 10-25 habitaciones", "Hostales urbanos", "Apartamentos turísticos"],
    keyBenefits: [
      "Higiene hotelera profesional",
      "Ambientación agradable huéspedes",
      "Cumplimiento estándares turísticos",
      "Todo incluido para limpieza"
    ],
    monthlyEstimate: 146.52
  },

  {
    id: "HOTEL-LUXURY",
    name: "Pack Hotel de Lujo", 
    description: "Productos premium para hoteles 4-5 estrellas. Máxima calidad y presentación para huéspedes exigentes.",
    industry: ["hotel", "resort", "spa", "boutique-hotel"],
    businessSize: "large",
    products: [
      {
        productId: "FRESC-5L",
        name: "FRESC",
        size: "5L",
        price: 9.90,
        quantity: 4,
        usage: "Limpieza premium habitaciones"
      },
      {
        productId: "SILK-5L",
        name: "SILK", 
        size: "5L",
        price: 15.25,
        quantity: 2,
        usage: "Ambientación de lujo"
      },
      {
        productId: "PLASTIC-PLUS-5L",
        name: "PLASTIC PLUS",
        size: "5L",
        price: 41.50,
        quantity: 1,
        usage: "Protección suelos premium"
      },
      {
        productId: "SANICAL-1L",
        name: "SANICAL",
        size: "1L",
        price: 3.50,
        quantity: 4,
        usage: "Baños impecables"
      },
      {
        productId: "CLORSAN-5L", 
        name: "CLORSAN",
        size: "5L",
        price: 8.91,
        quantity: 2,
        usage: "Desinfección completa instalaciones"
      }
    ],
    originalPrice: 128.32,
    bundlePrice: 109.07,
    savings: 19.25,
    savingsPercentage: 15,
    estimatedDuration: "4-5 semanas",
    suitableFor: ["Hoteles 4-5 estrellas", "Resorts", "Spas", "Hoteles boutique"],
    keyBenefits: [
      "Estándares de lujo",
      "Protección pavimentos caros",
      "Ambientación sofisticada", 
      "Imagen de marca premium"
    ],
    monthlyEstimate: 272.68
  },

  {
    id: "OFFICE-COMPLETE",
    name: "Pack Oficina Completa",
    description: "Todo lo necesario para mantener tu oficina limpia y profesional. Espacios de trabajo, salas de reuniones y aseos.",
    industry: ["oficina", "coworking", "despacho", "consultoría"],
    businessSize: "medium",
    products: [
      {
        productId: "FRESC-1L",
        name: "FRESC",
        size: "1L",
        price: 2.14,
        quantity: 4,
        usage: "Escritorios, mesas y superficies"
      },
      {
        productId: "SILK-750ML",
        name: "SILK",
        size: "750ml", 
        price: 3.08,
        quantity: 2,
        usage: "Ambientador espacios trabajo"
      },
      {
        productId: "WAN-FLORAL-5L",
        name: "WAN FLORAL",
        size: "5L",
        price: 4.50,
        quantity: 1,
        usage: "Suelos oficinas y pasillos"
      },
      {
        productId: "SANICAL-1L",
        name: "SANICAL",
        size: "1L",
        price: 3.50,
        quantity: 2,
        usage: "Aseos y zonas húmedas"
      }
    ],
    originalPrice: 19.72,
    bundlePrice: 16.76,
    savings: 2.96,
    savingsPercentage: 15,
    estimatedDuration: "4-6 semanas",
    suitableFor: ["Oficinas 10-30 personas", "Espacios coworking", "Despachos profesionales"],
    keyBenefits: [
      "Ambiente profesional",
      "Espacios de trabajo limpios",
      "Imagen corporativa cuidada",
      "Duración extendida oficinas"
    ],
    monthlyEstimate: 41.90
  },

  {
    id: "RETAIL-SHOP",
    name: "Pack Comercio y Tienda", 
    description: "Productos específicos para tiendas y comercios. Mantén tu establecimiento impecable para tus clientes.",
    industry: ["tienda", "comercio", "retail", "boutique"],
    businessSize: "small",
    products: [
      {
        productId: "FRESC-1L",
        name: "FRESC",
        size: "1L",
        price: 2.14,
        quantity: 2,
        usage: "Mostradores y superficies"
      },
      {
        productId: "WAN-FLORAL-5L",
        name: "WAN FLORAL", 
        size: "5L",
        price: 4.50,
        quantity: 1,
        usage: "Suelos zona venta"
      },
      {
        productId: "SILK-750ML",
        name: "SILK",
        size: "750ml",
        price: 3.08,
        quantity: 1,
        usage: "Ambiente agradable clientes"
      },
      {
        productId: "SANICAL-1L",
        name: "SANICAL",
        size: "1L",
        price: 3.50,
        quantity: 1,
        usage: "Aseos clientes"
      }
    ],
    originalPrice: 13.22,
    bundlePrice: 11.24,
    savings: 1.98,
    savingsPercentage: 15,
    estimatedDuration: "3-4 semanas",
    suitableFor: ["Tiendas hasta 100m²", "Comercios familiares", "Boutiques"],
    keyBenefits: [
      "Primera impresión impecable",
      "Ambiente acogedor clientes",
      "Mantenimiento eficiente",
      "Relación calidad-precio"
    ],
    monthlyEstimate: 33.72
  },

  {
    id: "HEALTH-PREMIUM",
    name: "Pack Sanitario Premium",
    description: "Máximo nivel de higiene para centros de salud, clínicas y consultas médicas. Cumplimiento estricto normativas.",
    industry: ["clínica", "centro-salud", "dental", "veterinario"],
    businessSize: "medium",
    products: [
      {
        productId: "CLORSAN-5L",
        name: "CLORSAN",
        size: "5L",
        price: 8.91,
        quantity: 3,
        usage: "Desinfección rigurosa consultas"
      },
      {
        productId: "FRESC-5L",
        name: "FRESC",
        size: "5L", 
        price: 9.90,
        quantity: 2,
        usage: "Limpieza y desinfección equipos"
      },
      {
        productId: "SANICAL-1L",
        name: "SANICAL",
        size: "1L",
        price: 3.50,
        quantity: 4,
        usage: "Baños y zonas húmedas"
      },
      {
        productId: "WAN-FLORAL-5L",
        name: "WAN FLORAL",
        size: "5L",
        price: 4.50,
        quantity: 1,
        usage: "Suelos salas espera"
      }
    ],
    originalPrice: 60.53,
    bundlePrice: 51.45,
    savings: 9.08,
    savingsPercentage: 15,
    estimatedDuration: "2-3 semanas",
    suitableFor: ["Clínicas dentales", "Consultas médicas", "Centros veterinarios"],
    keyBenefits: [
      "Cumplimiento sanitario estricto",
      "Desinfección nivel hospitalario",
      "Seguridad pacientes garantizada",
      "Productos certificados"
    ],
    monthlyEstimate: 154.35
  }
];

// Seasonal Bundle Variations
export const SEASONAL_BUNDLES: ProductBundle[] = [
  {
    id: "SUMMER-RESTO",
    name: "Pack Verano Restaurante",
    description: "Productos específicos para la temporada alta de verano. Mayor demanda y necesidades especiales.",
    industry: ["restaurante", "chiringuito", "terraza"],
    businessSize: "medium",
    season: "summer",
    products: [
      {
        productId: "CLORSAN-5L",
        name: "CLORSAN",
        size: "5L",
        price: 8.91,
        quantity: 3,
        usage: "Desinfección intensiva verano"
      },
      {
        productId: "DENGRAS-F-6KG", 
        name: "DENGRAS F",
        size: "6KG",
        price: 18.15,
        quantity: 2,
        usage: "Uso intensivo planchas"
      },
      {
        productId: "SILK-5L",
        name: "SILK",
        size: "5L",
        price: 15.25,
        quantity: 2,
        usage: "Ambientación anti-olores"
      }
    ],
    originalPrice: 91.37,
    bundlePrice: 77.66,
    savings: 13.71,
    savingsPercentage: 15,
    estimatedDuration: "3-4 semanas",
    suitableFor: ["Restaurantes temporada alta", "Chiringuitos", "Terrazas"],
    keyBenefits: [
      "Preparado para alta demanda",
      "Control olores intensos",
      "Stock suficiente verano",
      "Máxima higiene temperaturas altas"
    ],
    monthlyEstimate: 232.98
  }
];

// Bundle Management Utilities
export class BundleManager {
  
  static getAllBundles(): ProductBundle[] {
    return [...PRODUCT_BUNDLES, ...SEASONAL_BUNDLES];
  }

  static getBundlesByIndustry(industry: string): ProductBundle[] {
    return this.getAllBundles().filter(bundle => 
      bundle.industry.includes(industry.toLowerCase())
    );
  }

  static getBundlesByBusinessSize(size: 'small' | 'medium' | 'large' | 'enterprise'): ProductBundle[] {
    return this.getAllBundles().filter(bundle => bundle.businessSize === size);
  }

  static getFeaturedBundles(): ProductBundle[] {
    return this.getAllBundles().filter(bundle => bundle.featured);
  }

  static getSeasonalBundles(season?: string): ProductBundle[] {
    if (!season) {
      const currentMonth = new Date().getMonth();
      season = currentMonth >= 5 && currentMonth <= 8 ? 'summer' : 
               currentMonth >= 11 || currentMonth <= 1 ? 'winter' : 'all';
    }
    
    return this.getAllBundles().filter(bundle => 
      bundle.season === season || bundle.season === 'all'
    );
  }

  static calculateBundleSavings(bundleId: string): {
    savings: number;
    percentage: number;
    monthlyEstimate: number;
  } {
    const bundle = this.getAllBundles().find(b => b.id === bundleId);
    if (!bundle) throw new Error(`Bundle ${bundleId} not found`);

    return {
      savings: bundle.savings,
      percentage: bundle.savingsPercentage,
      monthlyEstimate: bundle.monthlyEstimate || 0
    };
  }

  static generateBundleHTML(bundle: ProductBundle): string {
    return `
      <div class="bundle-card" data-bundle-id="${bundle.id}">
        <div class="bundle-header">
          <h3>${bundle.name}</h3>
          ${bundle.featured ? '<span class="featured-badge">DESTACADO</span>' : ''}
          <div class="savings-badge">${bundle.savingsPercentage}% AHORRO</div>
        </div>
        
        <div class="bundle-description">
          <p>${bundle.description}</p>
          <div class="suitable-for">
            <strong>Ideal para:</strong> ${bundle.suitableFor.join(', ')}
          </div>
        </div>

        <div class="bundle-products">
          <h4>Incluye:</h4>
          ${bundle.products.map(product => `
            <div class="product-item">
              <span class="quantity">${product.quantity}x</span>
              <span class="name">${product.name} ${product.size}</span>
              <span class="usage">${product.usage}</span>
            </div>
          `).join('')}
        </div>

        <div class="bundle-benefits">
          <h4>Ventajas:</h4>
          <ul>
            ${bundle.keyBenefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        </div>

        <div class="bundle-pricing">
          <div class="original-price">Precio individual: €${bundle.originalPrice.toFixed(2)}</div>
          <div class="bundle-price">Pack: €${bundle.bundlePrice.toFixed(2)}</div>
          <div class="savings">Ahorras: €${bundle.savings.toFixed(2)}</div>
          <div class="duration">Duración: ${bundle.estimatedDuration}</div>
          ${bundle.monthlyEstimate ? `<div class="monthly">Coste mensual: €${bundle.monthlyEstimate.toFixed(2)}</div>` : ''}
        </div>

        <button class="add-bundle-btn" data-bundle-id="${bundle.id}">
          Añadir Pack al Carrito
        </button>
      </div>
    `;
  }

  static getBundleRecommendations(customerProfile: {
    industry: string;
    businessSize: string;
    monthlyBudget?: number;
    location?: string;
  }): ProductBundle[] {
    let recommendations = this.getBundlesByIndustry(customerProfile.industry);
    
    if (recommendations.length === 0) {
      // Fallback to general business bundles
      recommendations = this.getAllBundles().filter(bundle =>
        bundle.industry.includes('general') || 
        bundle.industry.includes('comercio')
      );
    }

    // Filter by business size
    recommendations = recommendations.filter(bundle => 
      bundle.businessSize === customerProfile.businessSize ||
      (customerProfile.businessSize === 'small' && bundle.businessSize === 'medium')
    );

    // Filter by budget if provided
    if (customerProfile.monthlyBudget) {
      recommendations = recommendations.filter(bundle => 
        (bundle.monthlyEstimate || 0) <= (customerProfile.monthlyBudget || 0)
      );
    }

    // Sort by featured, then by savings
    return recommendations.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.savingsPercentage - a.savingsPercentage;
    });
  }
}

export default BundleManager;