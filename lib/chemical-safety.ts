// Spanish Chemical Safety Documentation System
// High ROI: Compliance & Safety = Essential for B2B sales

export interface ChemicalComponent {
  name: string;
  concentration: string;
  casNumber?: string;
  hazardClass?: string;
  riskPhrases?: string[];
}

export interface SafetyPrecaution {
  type: 'prevention' | 'storage' | 'handling' | 'disposal' | 'emergency';
  description: string;
  icon?: string;
}

export interface EmergencyResponse {
  situation: string;
  immediateAction: string;
  treatment: string;
  phoneNumbers: string[];
}

export interface ChemicalSafetySheet {
  productId: string;
  productName: string;
  manufacturer: string;
  productType: string;
  hazardLevel: 'low' | 'medium' | 'high';
  components: ChemicalComponent[];
  physicalProperties: {
    appearance: string;
    odor: string;
    ph: string;
    density?: string;
    solubility: string;
  };
  hazards: {
    health: string[];
    environmental: string[];
    physical: string[];
    pictograms: string[];
  };
  precautions: SafetyPrecaution[];
  emergencyResponses: EmergencyResponse[];
  firstAid: {
    skinContact: string;
    eyeContact: string;
    inhalation: string;
    ingestion: string;
  };
  storage: {
    temperature: string;
    conditions: string[];
    incompatibilities: string[];
    shelfLife: string;
  };
  disposal: {
    product: string;
    container: string;
    wasteCode?: string;
  };
  transportInfo: {
    unNumber?: string;
    shippingName?: string;
    hazardClass?: string;
  };
  regulatoryInfo: {
    reach: boolean;
    clp: boolean;
    biocides?: boolean;
    certifications: string[];
  };
  usageInstructions: {
    dilution: string;
    applicationMethod: string;
    contactTime: string;
    frequency: string;
    ppe: string[];
  };
  dateIssued: string;
  dateRevised: string;
  version: string;
}

// Spanish Chemical Safety Database
export const CHEMICAL_SAFETY_SHEETS: ChemicalSafetySheet[] = [
  {
    productId: "CLORSAN-5L",
    productName: "CLORSAN - Desinfectante Clorado Sanitario",
    manufacturer: "Quimxel",
    productType: "Desinfectante",
    hazardLevel: "medium",
    components: [
      {
        name: "Hipoclorito sódico",
        concentration: "4-6%",
        casNumber: "7681-52-9",
        hazardClass: "Oxidante",
        riskPhrases: ["H314 - Provoca quemaduras graves en la piel", "H411 - Tóxico para la vida acuática"]
      },
      {
        name: "Hidróxido sódico",
        concentration: "1-2%",
        casNumber: "1310-73-2",
        hazardClass: "Corrosivo"
      }
    ],
    physicalProperties: {
      appearance: "Líquido transparente ligeramente amarillento",
      odor: "Característico a cloro",
      ph: "11-13 (alcalino)",
      density: "1.05-1.08 g/cm³",
      solubility: "Completamente soluble en agua"
    },
    hazards: {
      health: [
        "Corrosivo para la piel y ojos",
        "Puede causar quemaduras químicas",
        "Irritación del sistema respiratorio por inhalación"
      ],
      environmental: [
        "Tóxico para organismos acuáticos",
        "No verter en desagües o cursos de agua"
      ],
      physical: [
        "Agente oxidante - riesgo de incendio en contacto con materiales combustibles",
        "Libera gases tóxicos en contacto con ácidos"
      ],
      pictograms: ["GHS05 - Corrosión", "GHS09 - Peligro ambiental"]
    },
    precautions: [
      {
        type: "prevention",
        description: "Usar guantes de nitrilo resistentes a químicos",
        icon: "🧤"
      },
      {
        type: "prevention", 
        description: "Protección ocular obligatoria (gafas de seguridad)",
        icon: "🥽"
      },
      {
        type: "handling",
        description: "Usar en áreas bien ventiladas",
        icon: "💨"
      },
      {
        type: "storage",
        description: "Almacenar separado de ácidos y materiales orgánicos",
        icon: "🚫"
      },
      {
        type: "disposal",
        description: "Neutralizar antes de desechar según normativa local",
        icon: "♻️"
      }
    ],
    emergencyResponses: [
      {
        situation: "Derrame accidental",
        immediateAction: "Ventilar área, evitar mezcla con otros químicos",
        treatment: "Recoger con material absorbente inerte, neutralizar con bicarbonato",
        phoneNumbers: ["112 - Emergencias", "91 562 04 20 - Instituto Nacional Toxicología"]
      },
      {
        situation: "Contacto con piel",
        immediateAction: "Lavar inmediatamente con agua abundante 15-20 minutos",
        treatment: "Quitar ropa contaminada, buscar atención médica si persiste irritación",
        phoneNumbers: ["112 - Emergencias"]
      }
    ],
    firstAid: {
      skinContact: "Lavar inmediatamente con agua abundante durante 15-20 minutos. Quitar ropa contaminada. Si hay quemadura, cubrir con vendaje estéril húmedo. Buscar atención médica.",
      eyeContact: "Lavar inmediatamente con agua limpia durante 15 minutos manteniendo párpados abiertos. Retirar lentillas si es posible. Buscar atención médica inmediata.",
      inhalation: "Llevar a la persona al aire fresco. Si hay dificultad respiratoria, administrar oxígeno. Si para de respirar, dar respiración artificial. Buscar atención médica.",
      ingestion: "No inducir vómito. Enjuagar boca con agua. Dar agua o leche para beber. Buscar atención médica inmediatamente."
    },
    storage: {
      temperature: "5°C - 25°C",
      conditions: [
        "Lugar fresco y seco",
        "Protegido de la luz solar directa",
        "Ventilación adecuada",
        "Envase herméticamente cerrado"
      ],
      incompatibilities: [
        "Ácidos fuertes (genera cloro gaseoso)",
        "Amoníaco y compuestos amoniacales",
        "Materiales orgánicos combustibles",
        "Metales (acelera corrosión)"
      ],
      shelfLife: "12 meses en envase original cerrado"
    },
    disposal: {
      product: "Neutralizar con bicarbonato sódico, diluir y verter al desagüe según normativa local",
      container: "Enjuagar tres veces antes de reciclar. Envases de plástico al contenedor amarillo",
      wasteCode: "20 01 29* - Detergentes que contienen sustancias peligrosas"
    },
    transportInfo: {
      unNumber: "UN1791",
      shippingName: "Hipoclorito sódico en solución",
      hazardClass: "8 - Sustancias corrosivas"
    },
    regulatoryInfo: {
      reach: true,
      clp: true,
      biocides: true,
      certifications: ["TP2 - Desinfectantes", "TP4 - Superficies alimentarias"]
    },
    usageInstructions: {
      dilution: "1:40 (25ml por litro de agua) para desinfección general",
      applicationMethod: "Aplicar con paño húmedo o pulverizador, no mezclar con otros productos",
      contactTime: "5-10 minutos para desinfección efectiva",
      frequency: "Uso diario en cocinas, 2-3 veces/semana otras superficies",
      ppe: ["Guantes de nitrilo", "Gafas de protección", "Delantal impermeable"]
    },
    dateIssued: "2024-01-15",
    dateRevised: "2024-01-15",
    version: "1.0"
  },

  {
    productId: "DENGRAS-F-6KG",
    productName: "DENGRAS F - Desengrasante Profesional",
    manufacturer: "Quimxel",
    productType: "Desengrasante",
    hazardLevel: "medium",
    components: [
      {
        name: "Hidróxido potásico",
        concentration: "5-10%",
        casNumber: "1310-58-3",
        hazardClass: "Corrosivo"
      },
      {
        name: "Tensioactivos aniónicos",
        concentration: "15-30%",
        hazardClass: "Irritante"
      },
      {
        name: "Disolventes orgánicos",
        concentration: "5-15%",
        hazardClass: "Inflamable"
      }
    ],
    physicalProperties: {
      appearance: "Líquido viscoso color verde",
      odor: "Característico a disolvente",
      ph: "13-14 (muy alcalino)",
      density: "1.10-1.15 g/cm³",
      solubility: "Soluble en agua caliente"
    },
    hazards: {
      health: [
        "Corrosivo para piel y mucosas",
        "Puede causar quemaduras graves",
        "Vapores irritantes para vías respiratorias"
      ],
      environmental: [
        "Puede ser tóxico para vida acuática",
        "Alto pH puede afectar ecosistemas acuáticos"
      ],
      physical: [
        "Contiene disolventes inflamables",
        "Genera calor al mezclarse con agua"
      ],
      pictograms: ["GHS05 - Corrosión", "GHS07 - Irritante"]
    },
    precautions: [
      {
        type: "prevention",
        description: "Usar guantes de nitrilo o neopreno resistentes a álcalis",
        icon: "🧤"
      },
      {
        type: "prevention",
        description: "Protección respiratoria en espacios cerrados",
        icon: "😷"
      },
      {
        type: "handling",
        description: "Aplicar en frío o tibio, nunca en superficies calientes",
        icon: "🌡️"
      },
      {
        type: "storage", 
        description: "Mantener alejado de fuentes de ignición",
        icon: "🔥"
      }
    ],
    emergencyResponses: [
      {
        situation: "Salpicadura en plancha caliente",
        immediateAction: "Apagar equipo, ventilar área inmediatamente",
        treatment: "Enfriar superficie, limpiar residuos con agua abundante",
        phoneNumbers: ["112 - Emergencias"]
      }
    ],
    firstAid: {
      skinContact: "Lavar inmediatamente con agua fría abundante 15-20 min. Quitar ropa contaminada. Aplicar compresas húmedas frías. Buscar atención médica para quemaduras.",
      eyeContact: "Lavar inmediatamente con agua tibia 15 min manteniendo párpados abiertos. Buscar atención médica urgente.",
      inhalation: "Aire fresco inmediatamente. Si hay irritación respiratoria, buscar atención médica.",
      ingestion: "Enjuagar boca, no inducir vómito. Beber agua o leche. Atención médica inmediata."
    },
    storage: {
      temperature: "5°C - 35°C",
      conditions: [
        "Lugar fresco y ventilado",
        "Alejado de fuentes de calor",
        "Protegido de heladas",
        "Envase bien cerrado"
      ],
      incompatibilities: [
        "Ácidos (reacción violenta)",
        "Materiales de aluminio y zinc",
        "Oxidantes fuertes"
      ],
      shelfLife: "24 meses en condiciones adecuadas"
    },
    disposal: {
      product: "Neutralizar con ácido débil, diluir y desechar según normativa",
      container: "Triple enjuague antes de reciclar",
      wasteCode: "20 01 29* - Detergentes peligrosos"
    },
    transportInfo: {
      unNumber: "UN1760",
      shippingName: "Líquido corrosivo, N.E.P.",
      hazardClass: "8 - Corrosivos"
    },
    regulatoryInfo: {
      reach: true,
      clp: true,
      biocides: false,
      certifications: ["Uso alimentario indirecto", "HACCP compatible"]
    },
    usageInstructions: {
      dilution: "Puro para desengrases intensivos, 1:5 para mantenimiento",
      applicationMethod: "Aplicar en frío, dejar actuar, frotar y aclarar abundantemente",
      contactTime: "5-15 minutos según nivel de grasa",
      frequency: "Después de cada servicio o según acumulación grasa",
      ppe: ["Guantes resistentes álcalis", "Gafas protección", "Delantal PVC", "Calzado antideslizante"]
    },
    dateIssued: "2024-01-15",
    dateRevised: "2024-01-15", 
    version: "1.0"
  },

  {
    productId: "FRESC-5L",
    productName: "FRESC - Limpiador Desinfectante Versátil",
    manufacturer: "Quimxel",
    productType: "Limpiador desinfectante",
    hazardLevel: "low",
    components: [
      {
        name: "Compuestos de amonio cuaternario",
        concentration: "1-5%",
        hazardClass: "Irritante"
      },
      {
        name: "Tensioactivos no iónicos",
        concentration: "5-15%",
        hazardClass: "Biodegradable"
      },
      {
        name: "Estabilizantes y conservantes",
        concentration: "<1%"
      }
    ],
    physicalProperties: {
      appearance: "Líquido transparente azulado",
      odor: "Fresco, ligeramente perfumado",
      ph: "6.5-8.5 (neutro)",
      density: "1.00-1.02 g/cm³",
      solubility: "Completamente soluble en agua"
    },
    hazards: {
      health: [
        "Puede causar irritación ocular leve",
        "Irritación cutánea por contacto prolongado"
      ],
      environmental: [
        "Tensioactivos biodegradables >90%",
        "Bajo impacto ambiental"
      ],
      physical: [
        "No inflamable",
        "Estable en condiciones normales"
      ],
      pictograms: ["GHS07 - Irritante (solo concentrado)"]
    },
    precautions: [
      {
        type: "prevention",
        description: "Guantes recomendados para uso prolongado",
        icon: "🧤"
      },
      {
        type: "handling",
        description: "Evitar contacto directo con ojos",
        icon: "👀"
      },
      {
        type: "storage",
        description: "Mantener envase cerrado en lugar fresco",
        icon: "🏠"
      }
    ],
    emergencyResponses: [
      {
        situation: "Contacto accidental ojos",
        immediateAction: "Lavar con agua limpia inmediatamente",
        treatment: "Enjuagar 10-15 minutos, buscar atención si persiste irritación",
        phoneNumbers: ["112 - Solo si hay complicaciones"]
      }
    ],
    firstAid: {
      skinContact: "Lavar con agua y jabón. Generalmente no causa irritación significativa.",
      eyeContact: "Lavar con agua limpia 10-15 minutos. Si persiste irritación, buscar atención médica.",
      inhalation: "Aire fresco. No suele causar problemas respiratorios.",
      ingestion: "Enjuagar boca, beber agua. Solo buscar atención médica si se ingiere gran cantidad."
    },
    storage: {
      temperature: "5°C - 40°C",
      conditions: [
        "Lugar fresco y seco",
        "Protegido de temperaturas extremas",
        "Evitar congelación"
      ],
      incompatibilities: [
        "Lejías o desinfectantes clorados",
        "Productos muy ácidos o muy alcalinos"
      ],
      shelfLife: "36 meses en envase original"
    },
    disposal: {
      product: "Se puede verter diluido al desagüe",
      container: "Enjuagar y reciclar en contenedor plástico",
      wasteCode: "20 01 30 - Detergentes no peligrosos"
    },
    transportInfo: {
      unNumber: "No clasificado como mercancía peligrosa",
      shippingName: "Producto de limpieza",
      hazardClass: "No aplicable"
    },
    regulatoryInfo: {
      reach: true,
      clp: false,
      biocides: true,
      certifications: ["TP2 - Desinfectantes superficies", "Eco-friendly", "Biodegradable"]
    },
    usageInstructions: {
      dilution: "1:50 (20ml/litro) limpieza general, puro para manchas difíciles",
      applicationMethod: "Aplicar con paño, mopa o pulverizador según superficie",
      contactTime: "2-5 minutos para desinfección",
      frequency: "Uso diario seguro, no requiere aclarado en la mayoría de casos",
      ppe: ["Guantes (uso prolongado)", "Ropa de trabajo"]
    },
    dateIssued: "2024-01-15",
    dateRevised: "2024-01-15",
    version: "1.0"
  }
];

// Chemical Safety Utility Functions
export class ChemicalSafetyManager {
  
  static getSafetySheet(productId: string): ChemicalSafetySheet | null {
    return CHEMICAL_SAFETY_SHEETS.find(sheet => sheet.productId === productId) || null;
  }

  static checkCompatibility(productIds: string[]): {
    compatible: boolean;
    warnings: string[];
    recommendations: string[];
  } {
    const sheets = productIds.map(id => this.getSafetySheet(id)).filter(Boolean) as ChemicalSafetySheet[];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Check for dangerous combinations
    const hasChlorine = sheets.some(sheet => 
      sheet.components.some(comp => comp.name.includes('Hipoclorito'))
    );
    const hasAcid = sheets.some(sheet => 
      sheet.physicalProperties.ph.includes('ácido') || parseInt(sheet.physicalProperties.ph) < 7
    );
    const hasAlkaline = sheets.some(sheet => 
      parseInt(sheet.physicalProperties.ph) > 10
    );

    if (hasChlorine && hasAcid) {
      warnings.push("⚠️ PELIGRO: NO mezclar productos clorados con ácidos - genera gas tóxico");
    }

    if (hasChlorine && hasAlkaline) {
      warnings.push("⚠️ PRECAUCIÓN: Usar productos clorados y alcalinos por separado");
    }

    // General recommendations
    if (sheets.length > 2) {
      recommendations.push("📋 Usar productos por separado, aclarar entre aplicaciones");
      recommendations.push("🕐 Dejar tiempo de ventilación entre productos diferentes");
    }

    return {
      compatible: warnings.length === 0,
      warnings,
      recommendations: warnings.length === 0 ? 
        ["✅ Productos compatibles para uso secuencial"] : recommendations
    };
  }

  static generateSafetyTraining(industryType: string): {
    title: string;
    modules: Array<{
      topic: string;
      content: string[];
      practicalTips: string[];
    }>;
  } {
    const trainingModules = {
      restaurante: {
        title: "Formación en Seguridad Química - Restaurantes",
        modules: [
          {
            topic: "Desinfección Segura en Cocinas",
            content: [
              "Identificación de productos desinfectantes",
              "Procedimientos de dilución correcta",
              "Tiempos de contacto necesarios",
              "Áreas críticas de aplicación"
            ],
            practicalTips: [
              "Siempre diluir CLORSAN: 25ml por litro de agua",
              "Aplicar en superficies limpias para máxima eficacia",
              "Ventilar cocina durante y después del uso",
              "No mezclar nunca con otros productos"
            ]
          },
          {
            topic: "Desengrase Profesional",
            content: [
              "Uso seguro de DENGRAS F",
              "Protección personal obligatoria",
              "Técnicas de aplicación en frío",
              "Neutralización y aclarado"
            ],
            practicalTips: [
              "Aplicar solo en equipos fríos o tibios",
              "Usar guantes resistentes a álcalis",
              "Aclarado abundante obligatorio",
              "Ventilación adecuada durante uso"
            ]
          }
        ]
      },
      hotel: {
        title: "Seguridad Química para Personal de Limpieza - Hoteles",
        modules: [
          {
            topic: "Limpieza Segura de Habitaciones",
            content: [
              "Productos apropiados para cada superficie",
              "Ventilación en espacios cerrados",
              "Equipos de protección personal",
              "Procedimientos de emergencia"
            ],
            practicalTips: [
              "FRESC es seguro para uso diario en habitaciones",
              "Ventilar habitaciones durante limpieza",
              "Cambiar paños entre habitaciones",
              "Almacenar productos en carro cerrado"
            ]
          }
        ]
      }
    };

    return trainingModules[industryType as keyof typeof trainingModules] || trainingModules.restaurante;
  }

  static generateHACCPCompliance(productIds: string[]): {
    compliant: boolean;
    certifications: string[];
    procedures: string[];
    documentation: string[];
  } {
    const sheets = productIds.map(id => this.getSafetySheet(id)).filter(Boolean) as ChemicalSafetySheet[];
    
    const hackpCompliant = sheets.every(sheet => 
      sheet.regulatoryInfo.certifications.some(cert => 
        cert.includes('HACCP') || cert.includes('alimentario')
      )
    );

    const certifications = Array.from(new Set(
      sheets.flatMap(sheet => sheet.regulatoryInfo.certifications)
    ));

    const procedures = [
      "Registro de aplicación de productos químicos",
      "Control de diluciones y concentraciones",
      "Verificación de tiempos de contacto",
      "Documentación de formación del personal",
      "Inspección regular de almacenamiento"
    ];

    const documentation = [
      "Fichas de datos de seguridad actualizadas",
      "Certificados de productos para uso alimentario",
      "Registros de limpieza y desinfección",
      "Protocolos de emergencia química",
      "Evidencias de formación del personal"
    ];

    return {
      compliant: hackpCompliant,
      certifications,
      procedures,
      documentation
    };
  }

  static generateSpanishSafetyLabel(productId: string): string {
    const sheet = this.getSafetySheet(productId);
    if (!sheet) return '';

    return `
      <div class="safety-label" data-product="${productId}">
        <div class="product-header">
          <h3>${sheet.productName}</h3>
          <div class="hazard-level ${sheet.hazardLevel}">
            Nivel: ${sheet.hazardLevel.toUpperCase()}
          </div>
        </div>

        <div class="hazard-pictograms">
          ${sheet.hazards.pictograms.map(pic => `<span class="pictogram">${pic}</span>`).join('')}
        </div>

        <div class="main-hazards">
          <h4>⚠️ Principales Peligros:</h4>
          <ul>
            ${sheet.hazards.health.map(hazard => `<li>${hazard}</li>`).join('')}
          </ul>
        </div>

        <div class="safety-precautions">
          <h4>🛡️ Precauciones:</h4>
          <ul>
            ${sheet.precautions.slice(0, 3).map(prec => 
              `<li>${prec.icon} ${prec.description}</li>`
            ).join('')}
          </ul>
        </div>

        <div class="first-aid-summary">
          <h4>🚨 Primeros Auxilios:</h4>
          <div class="first-aid-grid">
            <div><strong>Piel:</strong> ${sheet.firstAid.skinContact.substring(0, 50)}...</div>
            <div><strong>Ojos:</strong> ${sheet.firstAid.eyeContact.substring(0, 50)}...</div>
          </div>
        </div>

        <div class="usage-instructions">
          <h4>📋 Uso Correcto:</h4>
          <p><strong>Dilución:</strong> ${sheet.usageInstructions.dilution}</p>
          <p><strong>Tiempo contacto:</strong> ${sheet.usageInstructions.contactTime}</p>
          <p><strong>EPP:</strong> ${sheet.usageInstructions.ppe.join(', ')}</p>
        </div>

        <div class="emergency-contact">
          <h4>📞 Emergencias:</h4>
          <p><strong>112</strong> - Emergencias generales</p>
          <p><strong>91 562 04 20</strong> - Instituto Nacional Toxicología</p>
        </div>

        <div class="document-info">
          <small>Versión ${sheet.version} - ${sheet.dateRevised}</small>
        </div>
      </div>
    `;
  }
}

// Export Spanish emergency contacts
export const SPANISH_EMERGENCY_CONTACTS = {
  general: "112",
  toxicology: "91 562 04 20",
  fireEmergency: "080", 
  workAccidents: "900 713 123",
  chemicalSpill: "112",
  environmentalEmergency: "062"
};

export default ChemicalSafetyManager;