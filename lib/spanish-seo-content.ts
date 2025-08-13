// Spanish SEO Content Generator for Quimimar Products
// High ROI: Organic traffic acquisition, improved search rankings

export interface SEOContent {
  productId: string;
  title: string;
  metaDescription: string;
  h1: string;
  h2Headings: string[];
  longDescription: string;
  keywordDensity: Record<string, number>;
  targetKeywords: string[];
  relatedKeywords: string[];
  schema: {
    name: string;
    description: string;
    brand: string;
    category: string;
    offers: {
      price: string;
      currency: string;
      availability: string;
    };
  };
  faqSection: Array<{
    question: string;
    answer: string;
  }>;
  usageGuide: {
    title: string;
    steps: string[];
    tips: string[];
  };
  benefitsSection: {
    title: string;
    benefits: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  technicalSpecs: {
    composition: string;
    ph: string;
    density: string;
    usage: string;
    certification: string[];
  };
}

// Spanish SEO Content Database
export const SPANISH_SEO_CONTENT: SEOContent[] = [
  {
    productId: "CLORSAN-5L",
    title: "CLORSAN Desinfectante Clorado 5L - Higiene Profesional Restaurantes | Quimimar",
    metaDescription: "CLORSAN desinfectante clorado 5L para restaurantes y hoteles. Elimina 99.9% virus y bacterias. Certificado sanitario. Envío 24h Murcia. €8.91 Quimxel.",
    h1: "CLORSAN Desinfectante Clorado Profesional 5L - Higiene Garantizada",
    h2Headings: [
      "¿Por qué elegir CLORSAN para tu restaurante?",
      "Modo de uso y diluciones recomendadas",
      "Certificaciones y normativas cumplidas",
      "Preguntas frecuentes sobre CLORSAN",
      "Dónde comprar CLORSAN en Murcia"
    ],
    longDescription: `
CLORSAN es el desinfectante clorado profesional líder en la Región de Murcia para restaurantes, hoteles y establecimientos de hostelería. Con más de 15 años de experiencia en el sector, este potente desinfectante elimina el 99.9% de virus, bacterias y microorganismos patógenos.

**Ideal para la desinfección diaria de:**
- Superficies de trabajo en cocinas profesionales
- Mesas y barras de restaurantes
- Utensilios de cocina y menaje
- Suelos y paredes de zonas alimentarias
- Aseos y lavabos de clientes

**Características técnicas destacadas:**
- Concentración de hipoclorito sódico 4-6%
- pH alcalino (11-13) para máxima eficacia
- Acción rápida: actúa en 5-10 minutos
- Compatible con superficies de acero inoxidable
- Certificado para uso en industrias alimentarias

**Ventajas competitivas:**
1. **Eficacia probada**: Elimina coronavirus, salmonella, E.coli y listeria
2. **Económico**: 1 garrafa rinde para 200 litros de solución desinfectante
3. **Fácil aplicación**: Se diluye fácilmente en agua fría o tibia
4. **Cumplimiento normativo**: Autorizado por Sanidad para hostelería
5. **Entrega rápida**: Disponible en 24-48h en toda la Región de Murcia

CLORSAN es la elección preferida de más de 500 restaurantes en Murcia, Cartagena y Lorca por su fiabilidad y resultados garantizados. Su fórmula profesional asegura la máxima higiene sin comprometer la seguridad alimentaria.

**Uso responsable:** Seguir siempre las instrucciones de dilución y utilizar equipos de protección individual. No mezclar con otros productos químicos.
    `,
    targetKeywords: [
      "desinfectante clorado",
      "CLORSAN 5L",
      "desinfectante restaurante",
      "hipoclorito sodio",
      "desinfectante cocina",
      "desinfectante Murcia",
      "desinfectante hostelería",
      "Quimxel CLORSAN"
    ],
    relatedKeywords: [
      "limpieza profesional",
      "higiene alimentaria",
      "desinfección superficies",
      "productos químicos restaurante",
      "desinfectante autorizado",
      "limpieza cocina industrial",
      "desinfectante certificado",
      "higiene hostelería"
    ],
    keywordDensity: {
      "desinfectante": 2.8,
      "CLORSAN": 2.1,
      "restaurante": 1.9,
      "cocina": 1.5,
      "higiene": 1.3
    },
    schema: {
      name: "CLORSAN Desinfectante Clorado 5L",
      description: "Desinfectante clorado profesional para restaurantes y cocinas industriales",
      brand: "Quimxel",
      category: "Productos de Limpieza > Desinfectantes",
      offers: {
        price: "8.91",
        currency: "EUR",
        availability: "https://schema.org/InStock"
      }
    },
    faqSection: [
      {
        question: "¿Cómo diluir CLORSAN correctamente?",
        answer: "Para desinfección general, diluir 25ml de CLORSAN en 1 litro de agua (dilución 1:40). Para desinfección intensiva, usar 50ml por litro (1:20). Siempre añadir el producto al agua, nunca al revés."
      },
      {
        question: "¿Es seguro usar CLORSAN en superficies que contactan con alimentos?",
        answer: "Sí, CLORSAN está certificado para uso en industrias alimentarias. Tras su aplicación, dejar actuar 5-10 minutos y aclarar con agua potable antes del contacto con alimentos."
      },
      {
        question: "¿Cuánto dura una garrafa de 5L en un restaurante mediano?",
        answer: "En un restaurante de 40-50 comensales, una garrafa de CLORSAN 5L dura aproximadamente 3-4 semanas con uso diario normal, rindiendo unos 200 litros de solución desinfectante."
      },
      {
        question: "¿CLORSAN es efectivo contra el coronavirus?",
        answer: "Sí, CLORSAN es efectivo contra virus envueltos incluyendo coronavirus. Su concentración de hipoclorito sódico 4-6% garantiza la inactivación viral según protocolos sanitarios vigentes."
      }
    ],
    usageGuide: {
      title: "Cómo usar CLORSAN paso a paso",
      steps: [
        "Limpiar previamente la superficie con agua y jabón para eliminar restos orgánicos",
        "Preparar la dilución: 25ml de CLORSAN en 1 litro de agua fría",
        "Aplicar la solución con paño húmedo o pulverizador sobre la superficie",
        "Dejar actuar 5-10 minutos para máxima eficacia desinfectante",
        "Aclarar con agua potable si la superficie va a contactar con alimentos",
        "Secar al aire o con papel desechable limpio"
      ],
      tips: [
        "Usar siempre agua fría o tibia, nunca caliente (reduce eficacia)",
        "Preparar solo la cantidad necesaria para el día",
        "Almacenar en lugar fresco y protegido de la luz",
        "Usar guantes de nitrilo para proteger las manos",
        "Ventilar el área durante y después de su uso"
      ]
    },
    benefitsSection: {
      title: "Beneficios de CLORSAN para tu negocio",
      benefits: [
        {
          icon: "🦠",
          title: "Máxima desinfección",
          description: "Elimina 99.9% de virus, bacterias y hongos en 5-10 minutos"
        },
        {
          icon: "💰",
          title: "Altamente económico",
          description: "Rinde 200L de solución desinfectante, coste de 0.04€ por litro"
        },
        {
          icon: "✅",
          title: "Certificado sanitario",
          description: "Autorizado por Sanidad para uso en industrias alimentarias"
        },
        {
          icon: "⚡",
          title: "Acción rápida",
          description: "Desinfección efectiva en solo 5-10 minutos de contacto"
        },
        {
          icon: "🛡️",
          title: "Seguridad garantizada",
          description: "Fórmula estable, no genera subproductos tóxicos"
        },
        {
          icon: "🚚",
          title: "Entrega inmediata",
          description: "Disponible en 24-48h en toda la Región de Murcia"
        }
      ]
    },
    technicalSpecs: {
      composition: "Hipoclorito sódico 4-6%, Hidróxido sódico 1-2%, Estabilizantes",
      ph: "11-13 (alcalino)",
      density: "1.05-1.08 g/cm³",
      usage: "Dilución 1:40 (25ml/L) uso general, 1:20 (50ml/L) intensivo",
      certification: ["TP2 - Desinfectantes", "TP4 - Superficies alimentarias", "Registro ROESB"]
    }
  },

  {
    productId: "DENGRAS-F-6KG",
    title: "DENGRAS F Desengrasante 6KG - Limpieza Planchas Cocina Industrial | Quimimar",
    metaDescription: "DENGRAS F desengrasante profesional 6KG para planchas y freidoras. Elimina grasa carbonizada. Para cocinas industriales. €18.15 Entrega 24h Murcia.",
    h1: "DENGRAS F Desengrasante Profesional 6KG - Poder Extremo Contra la Grasa",
    h2Headings: [
      "Características del desengrasante DENGRAS F",
      "Aplicaciones en cocina profesional",
      "Modo de uso seguro y efectivo",
      "Comparativa con otros desengrasantes",
      "Disponibilidad en Murcia y pedidos"
    ],
    longDescription: `
DENGRAS F es el desengrasante profesional más potente del mercado para la limpieza de planchas, freidoras y equipos de cocina industrial. Desarrollado específicamente para enfrentar las grasas más difíciles y carbonizadas de restaurantes de alta producción.

**Aplicaciones principales:**
- Planchas de cocina industriales y semi-industriales
- Freidoras de gran capacidad y uso intensivo
- Hornos convencionales y de convección
- Campanas extractoras y filtros
- Asadores y barbacoas profesionales
- Utensilios con grasa carbonizada

**Ventajas técnicas exclusivas:**
- Formula alcalina potente (pH 13-14) para máxima eficacia
- Actúa en frío: no necesita calentar la superficie
- Disuelve grasa carbonizada en minutos
- No daña superficies de acero inoxidable
- Concentrado: se puede usar puro o diluido según necesidad

**Rendimiento excepcional:**
Un envase de 6KG de DENGRAS F equivale a más de 20 litros de desengrasante convencional. Su alta concentración permite:
- Uso puro para grasas extremas
- Dilución 1:5 para mantenimiento diario
- Dilución 1:10 para limpieza preventiva
- Hasta 300 aplicaciones en plancha estándar

**Protocolo de limpieza profesional:**
1. **Seguridad primero**: Usar solo en equipos fríos o tibios
2. **Aplicación directa**: Extender uniformemente sobre la superficie
3. **Tiempo de acción**: 5-15 minutos según nivel de grasa
4. **Rascado**: Usar espátula o rascador de plástico
5. **Aclarado**: Abundante agua caliente hasta eliminar residuos
6. **Secado**: Toalla limpia y aplicar aceite protector si necesario

DENGRAS F es la elección de más de 200 restaurantes en Murcia por su eficacia incomparable y ahorro de tiempo. Reduce el tiempo de limpieza de planchas hasta un 70% comparado con métodos tradicionales.
    `,
    targetKeywords: [
      "desengrasante plancha",
      "DENGRAS F 6KG",
      "desengrasante cocina industrial",
      "limpieza freidora",
      "desengrasante profesional",
      "desengrasante Murcia",
      "limpieza plancha restaurante",
      "Quimxel DENGRAS"
    ],
    relatedKeywords: [
      "limpieza cocina",
      "productos químicos cocina",
      "desengrasante potente",
      "limpieza industrial",
      "mantenimiento cocina",
      "higiene cocina",
      "limpieza profesional"
    ],
    keywordDensity: {
      "desengrasante": 3.2,
      "plancha": 2.5,
      "cocina": 2.1,
      "grasa": 1.8,
      "profesional": 1.5
    },
    schema: {
      name: "DENGRAS F Desengrasante Profesional 6KG",
      description: "Desengrasante profesional para planchas y equipos de cocina industrial",
      brand: "Quimxel",
      category: "Productos de Limpieza > Desengrasantes",
      offers: {
        price: "18.15",
        currency: "EUR",
        availability: "https://schema.org/InStock"
      }
    },
    faqSection: [
      {
        question: "¿Se puede usar DENGRAS F en plancha caliente?",
        answer: "No, por seguridad DENGRAS F debe aplicarse solo en superficies frías o tibias. El calor puede provocar vapores irritantes y reducir la eficacia del producto."
      },
      {
        question: "¿Cuánto tiempo tarda en actuar DENGRAS F?",
        answer: "Para grasa normal 5-10 minutos, para grasa carbonizada 10-15 minutos. En casos extremos se puede dejar actuar hasta 30 minutos para máxima eficacia."
      },
      {
        question: "¿Es necesario diluir DENGRAS F?",
        answer: "Para limpieza intensiva usar puro. Para mantenimiento diario se puede diluir 1:5 con agua. Para limpieza preventiva diluir 1:10. Siempre añadir producto al agua."
      }
    ],
    usageGuide: {
      title: "Protocolo de limpieza con DENGRAS F",
      steps: [
        "Asegurar que la plancha/equipo esté frío o tibio (máx. 40°C)",
        "Aplicar DENGRAS F uniformemente sobre la superficie con grasa",
        "Dejar actuar 10-15 minutos para que disuelva la grasa",
        "Raspar suavemente con espátula de plástico o rascador",
        "Aclarar abundantemente con agua caliente",
        "Secar completamente y aplicar aceite protector si es necesario"
      ],
      tips: [
        "Usar guantes resistentes a álcalis obligatoriamente",
        "Ventilar el área durante su uso",
        "No mezclar con otros productos químicos",
        "Para mejores resultados, usar agua caliente en el aclarado",
        "Aplicar en pequeñas secciones para control óptimo"
      ]
    },
    benefitsSection: {
      title: "Por qué DENGRAS F es superior",
      benefits: [
        {
          icon: "💪",
          title: "Potencia extrema",
          description: "Disuelve grasa carbonizada que otros productos no pueden"
        },
        {
          icon: "❄️",
          title: "Aplicación en frío",
          description: "No necesita calentar, mayor seguridad para el operario"
        },
        {
          icon: "💰",
          title: "Altamente concentrado",
          description: "6KG rinden como 20L de desengrasante convencional"
        },
        {
          icon: "⏱️",
          title: "Ahorra tiempo",
          description: "Reduce tiempo de limpieza hasta 70% vs métodos tradicionales"
        },
        {
          icon: "🛡️",
          title: "Seguro para equipos",
          description: "No daña acero inoxidable ni recubrimientos especiales"
        },
        {
          icon: "🥇",
          title: "Calidad profesional",
          description: "Usado por más de 200 restaurantes en la región"
        }
      ]
    },
    technicalSpecs: {
      composition: "Hidróxido potásico 5-10%, Tensioactivos aniónicos 15-30%, Disolventes orgánicos 5-15%",
      ph: "13-14 (muy alcalino)",
      density: "1.10-1.15 g/cm³",
      usage: "Puro para limpieza intensiva, dilución 1:5 mantenimiento, 1:10 preventivo",
      certification: ["Uso alimentario indirecto", "HACCP compatible", "Registro sanitario"]
    }
  },

  {
    productId: "FRESC-5L",
    title: "FRESC Limpiador Desinfectante 5L - Versátil Restaurantes Hoteles | Quimimar",
    metaDescription: "FRESC limpiador desinfectante 5L para hoteles y restaurantes. pH neutro, seguro para superficies. Desinfecta y limpia en una sola aplicación. €9.90 Murcia.",
    h1: "FRESC Limpiador Desinfectante 5L - La Solución 2 en 1 para tu Negocio",
    h2Headings: [
      "Ventajas del limpiador desinfectante FRESC",
      "Usos recomendados en hostelería",
      "Guía de aplicación y diluciones",
      "Testimonios de clientes satisfechos",
      "Pedidos y entregas en Murcia"
    ],
    longDescription: `
FRESC es el limpiador desinfectante más versátil del mercado, diseñado específicamente para hoteles, restaurantes y establecimientos que requieren limpieza y desinfección simultánea con máxima seguridad y eficacia.

**Características únicas de FRESC:**
- pH neutro (6.5-8.5): seguro para todo tipo de superficies
- Acción 2 en 1: limpia y desinfecta en una sola aplicación
- Sin olor agresivo: fragancia fresca y agradable
- Secado sin residuos: no deja manchas ni rayas
- Compatible con materiales delicados: mármol, madera tratada, metales

**Aplicaciones múltiples:**
- Mesas y superficies de comedor
- Habitaciones de hotel (muebles, mesillas, televisores)
- Baños y aseos (excepto inodoros)
- Recepción y zonas comunes
- Superficies de trabajo en oficinas
- Equipamiento de acero inoxidable

**Ventajas económicas:**
1. **Ahorro de tiempo**: Elimina la necesidad de limpiar y desinfectar por separado
2. **Versátil**: Un solo producto para múltiples aplicaciones
3. **Concentrado**: Rinde hasta 250 litros de solución de limpieza
4. **Reduce inventario**: Sustituye varios productos específicos

**Seguridad garantizada:**
- Biodegradable: tensioactivos >90% biodegradables
- Bajo impacto ambiental
- Seguro para contacto ocasional con la piel
- No corrosivo ni irritante en uso normal
- Apto para uso en presencia de huéspedes/clientes

FRESC es la elección preferida de cadenas hoteleras y restaurantes que priorizan la eficiencia, seguridad y resultados profesionales. Su fórmula equilibrada garantiza limpieza impecable sin comprometer la salud de trabajadores ni clientes.
    `,
    targetKeywords: [
      "limpiador desinfectante",
      "FRESC 5L",
      "limpiador hotel",
      "desinfectante restaurante",
      "pH neutro",
      "limpiador versátil",
      "limpiador Murcia",
      "Quimxel FRESC"
    ],
    relatedKeywords: [
      "limpieza hostelería",
      "desinfección segura",
      "limpieza profesional",
      "productos biodegradables",
      "higiene hotel",
      "limpieza mesas",
      "desinfectante suave"
    ],
    keywordDensity: {
      "limpiador": 3.0,
      "desinfectante": 2.5,
      "FRESC": 2.2,
      "hotel": 1.8,
      "seguro": 1.5
    },
    schema: {
      name: "FRESC Limpiador Desinfectante 5L",
      description: "Limpiador desinfectante versátil pH neutro para hoteles y restaurantes",
      brand: "Quimxel",
      category: "Productos de Limpieza > Limpiadores Desinfectantes",
      offers: {
        price: "9.90",
        currency: "EUR",
        availability: "https://schema.org/InStock"
      }
    },
    faqSection: [
      {
        question: "¿Es seguro usar FRESC en habitaciones ocupadas?",
        answer: "Sí, FRESC tiene pH neutro y fragancia suave, siendo seguro para usar en presencia de huéspedes. Su fórmula no irritante permite limpieza durante la ocupación."
      },
      {
        question: "¿FRESC desinfecta realmente o solo limpia?",
        answer: "FRESC tiene acción 2 en 1: limpia eliminando suciedad y desinfecta eliminando bacterias y virus. Está certificado como desinfectante TP2 por las autoridades sanitarias."
      },
      {
        question: "¿Cuál es la dilución correcta de FRESC?",
        answer: "Para limpieza general 1:50 (20ml por litro). Para desinfección 1:25 (40ml por litro). Para manchas difíciles se puede usar puro o 1:10."
      }
    ],
    usageGuide: {
      title: "Cómo usar FRESC eficazmente",
      steps: [
        "Diluir según necesidad: 20ml/L limpieza, 40ml/L desinfección",
        "Aplicar con paño húmedo, mopa o pulverizador",
        "Distribuir uniformemente sobre la superficie",
        "Dejar actuar 2-5 minutos para desinfección completa",
        "Secar con paño limpio o dejar secar al aire",
        "No requiere aclarado en la mayoría de aplicaciones"
      ],
      tips: [
        "Para mejores resultados usar paños de microfibra",
        "Cambiar paños frecuentemente para evitar recontaminación",
        "Se puede usar en pulverizador para aplicación rápida",
        "Ideal para limpieza de mantenimiento diario",
        "Almacenar en lugar fresco, no se congela"
      ]
    },
    benefitsSection: {
      title: "Beneficios únicos de FRESC",
      benefits: [
        {
          icon: "🔄",
          title: "2 en 1 eficaz",
          description: "Limpia y desinfecta simultáneamente, ahorrando tiempo y esfuerzo"
        },
        {
          icon: "🌿",
          title: "pH neutro seguro",
          description: "No daña superficies delicadas ni irrita la piel"
        },
        {
          icon: "💨",
          title: "Fragancia agradable",
          description: "Olor fresco y limpio, sin olores químicos agresivos"
        },
        {
          icon: "✨",
          title: "Sin residuos",
          description: "Seca sin dejar manchas, rayas ni películas"
        },
        {
          icon: "🌱",
          title: "Eco-responsable",
          description: "Tensioactivos biodegradables, menor impacto ambiental"
        },
        {
          icon: "👥",
          title: "Uso con huéspedes",
          description: "Seguro para aplicar en presencia de clientes"
        }
      ]
    },
    technicalSpecs: {
      composition: "Compuestos amonio cuaternario 1-5%, Tensioactivos no iónicos 5-15%, Estabilizantes <1%",
      ph: "6.5-8.5 (neutro)",
      density: "1.00-1.02 g/cm³",
      usage: "Dilución 1:50 (20ml/L) limpieza, 1:25 (40ml/L) desinfección",
      certification: ["TP2 - Desinfectantes", "Biodegradable", "Eco-friendly"]
    }
  }
];

// SEO Content Management Utilities
export class SpanishSEOManager {
  
  static getProductSEO(productId: string): SEOContent | null {
    return SPANISH_SEO_CONTENT.find(content => content.productId === productId) || null;
  }

  static generateMetaTags(productId: string): string {
    const seo = this.getProductSEO(productId);
    if (!seo) return '';

    return `
      <title>${seo.title}</title>
      <meta name="description" content="${seo.metaDescription}" />
      <meta name="keywords" content="${seo.targetKeywords.join(', ')}" />
      <meta property="og:title" content="${seo.h1}" />
      <meta property="og:description" content="${seo.metaDescription}" />
      <meta property="og:type" content="product" />
      <link rel="canonical" href="https://quimimar.es/productos/${productId.toLowerCase()}" />
    `;
  }

  static generateStructuredData(productId: string): string {
    const seo = this.getProductSEO(productId);
    if (!seo) return '';

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": seo.schema.name,
      "description": seo.schema.description,
      "brand": {
        "@type": "Brand",
        "name": seo.schema.brand
      },
      "category": seo.schema.category,
      "offers": {
        "@type": "Offer",
        "price": seo.schema.offers.price,
        "priceCurrency": seo.schema.offers.currency,
        "availability": seo.schema.offers.availability,
        "seller": {
          "@type": "Organization",
          "name": "Quimimar"
        }
      },
      "manufacturer": {
        "@type": "Organization", 
        "name": "Quimxel"
      }
    };

    return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
  }

  static generateFAQSchema(productId: string): string {
    const seo = this.getProductSEO(productId);
    if (!seo) return '';

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": seo.faqSection.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": faq.answer
        }
      }))
    };

    return `<script type="application/ld+json">${JSON.stringify(faqSchema, null, 2)}</script>`;
  }

  static generateProductHTML(productId: string): string {
    const seo = this.getProductSEO(productId);
    if (!seo) return '';

    return `
      <article class="product-seo-content">
        <header>
          <h1>${seo.h1}</h1>
          <div class="product-meta">
            <span class="brand">${seo.schema.brand}</span>
            <span class="price">€${seo.schema.offers.price}</span>
            <span class="availability">${seo.schema.offers.availability.includes('InStock') ? 'En Stock' : 'Consultar'}</span>
          </div>
        </header>

        <section class="product-description">
          <div class="content">
            ${seo.longDescription.split('\n\n').map(paragraph => 
              paragraph.trim().startsWith('**') ? 
                `<h3>${paragraph.replace(/\*\*/g, '')}</h3>` :
                `<p>${paragraph}</p>`
            ).join('')}
          </div>
        </section>

        <section class="product-benefits">
          <h2>${seo.benefitsSection.title}</h2>
          <div class="benefits-grid">
            ${seo.benefitsSection.benefits.map(benefit => `
              <div class="benefit-card">
                <div class="benefit-icon">${benefit.icon}</div>
                <h3>${benefit.title}</h3>
                <p>${benefit.description}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <section class="usage-guide">
          <h2>${seo.usageGuide.title}</h2>
          <ol class="usage-steps">
            ${seo.usageGuide.steps.map(step => `<li>${step}</li>`).join('')}
          </ol>
          <div class="usage-tips">
            <h3>Consejos profesionales:</h3>
            <ul>
              ${seo.usageGuide.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
        </section>

        <section class="technical-specs">
          <h2>Especificaciones técnicas</h2>
          <dl class="specs-list">
            <dt>Composición:</dt><dd>${seo.technicalSpecs.composition}</dd>
            <dt>pH:</dt><dd>${seo.technicalSpecs.ph}</dd>
            <dt>Densidad:</dt><dd>${seo.technicalSpecs.density}</dd>
            <dt>Uso recomendado:</dt><dd>${seo.technicalSpecs.usage}</dd>
            <dt>Certificaciones:</dt><dd>${seo.technicalSpecs.certification.join(', ')}</dd>
          </dl>
        </section>

        <section class="faq-section">
          <h2>Preguntas frecuentes</h2>
          <div class="faq-list">
            ${seo.faqSection.map(faq => `
              <details class="faq-item">
                <summary>${faq.question}</summary>
                <p>${faq.answer}</p>
              </details>
            `).join('')}
          </div>
        </section>
      </article>
    `;
  }

  static generateSitemapEntries(): Array<{url: string, priority: number, changefreq: string}> {
    return SPANISH_SEO_CONTENT.map(content => ({
      url: `https://quimimar.es/productos/${content.productId.toLowerCase()}`,
      priority: 0.8,
      changefreq: 'weekly'
    }));
  }

  static generateBreadcrumbs(productId: string): string {
    const seo = this.getProductSEO(productId);
    if (!seo) return '';

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Inicio",
          "item": "https://quimimar.es"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "Productos",
          "item": "https://quimimar.es/productos"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": seo.schema.name,
          "item": `https://quimimar.es/productos/${productId.toLowerCase()}`
        }
      ]
    };

    return `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema, null, 2)}</script>`;
  }

  static getRelatedProducts(productId: string): string[] {
    const seo = this.getProductSEO(productId);
    if (!seo) return [];

    // Simple related products logic based on keywords
    const relatedIds = SPANISH_SEO_CONTENT
      .filter(content => content.productId !== productId)
      .filter(content => {
        const sharedKeywords = content.targetKeywords.some(keyword =>
          seo.targetKeywords.includes(keyword)
        );
        return sharedKeywords;
      })
      .slice(0, 3)
      .map(content => content.productId);

    return relatedIds;
  }
}

export default SpanishSEOManager;