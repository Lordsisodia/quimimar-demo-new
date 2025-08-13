// WhatsApp Business Order Flow Configuration for Quimimar
// High ROI Implementation: Automate Spanish B2B orders via WhatsApp

export interface WhatsAppFlow {
  trigger: string[];
  response: string;
  quickReplies?: string[];
  nextStep?: string;
  productSuggestions?: string[];
}

export interface ProductInfo {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
  description: string;
  usage: string[];
}

// Quimxel Product Database (from existing catalog)
export const QUIMXEL_PRODUCTS: ProductInfo[] = [
  {
    id: "CLORSAN-5L",
    name: "CLORSAN",
    price: 8.91,
    size: "5L",
    category: "desinfectante",
    description: "Desinfectante clorado sanitario",
    usage: ["restaurantes", "hoteles", "cocinas", "baños"]
  },
  {
    id: "FRESC-1L", 
    name: "FRESC",
    price: 2.14,
    size: "1L",
    category: "desinfectante",
    description: "Limpiador desinfectante versátil",
    usage: ["oficinas", "tiendas", "servicios"]
  },
  {
    id: "FRESC-5L",
    name: "FRESC", 
    price: 9.90,
    size: "5L",
    category: "desinfectante",
    description: "Limpiador desinfectante versátil",
    usage: ["restaurantes", "hoteles", "grandes superficies"]
  },
  {
    id: "DENGRAS-F-125KG",
    name: "DENGRAS F",
    price: 3.77,
    size: "1.25KG", 
    category: "desengrasante",
    description: "Desengrasante profesional para planchas",
    usage: ["restaurantes", "cocinas industriales", "planchas"]
  },
  {
    id: "DENGRAS-F-6KG",
    name: "DENGRAS F",
    price: 18.15,
    size: "6KG",
    category: "desengrasante", 
    description: "Desengrasante profesional para planchas",
    usage: ["restaurantes", "cocinas industriales", "planchas"]
  },
  {
    id: "WAN-FLORAL-5L",
    name: "WAN FLORAL",
    price: 4.50,
    size: "5L",
    category: "fregasuelos",
    description: "Fregasuelos con fragancia floral",
    usage: ["oficinas", "comercios", "hoteles", "suelos"]
  },
  {
    id: "SILK-750ML",
    name: "SILK",
    price: 3.08,
    size: "750ml",
    category: "ambientador",
    description: "Ambientador multiusos",
    usage: ["oficinas", "comercios", "ambientes"]
  },
  {
    id: "SILK-5L",
    name: "SILK",
    price: 15.25,
    size: "5L", 
    category: "ambientador",
    description: "Ambientador multiusos",
    usage: ["hoteles", "grandes espacios", "ambientes"]
  },
  {
    id: "SANICAL-1L",
    name: "SANICAL",
    price: 3.50,
    size: "1L",
    category: "antical", 
    description: "Limpiador antical potente",
    usage: ["baños", "duchas", "grifos", "azulejos"]
  },
  {
    id: "PLASTIC-PLUS-5L",
    name: "PLASTIC PLUS",
    price: 41.50,
    size: "5L",
    category: "suelos",
    description: "Emulsión metalizada alta resistencia",
    usage: ["suelos industriales", "pavimentos", "protección"]
  }
];

// Spanish WhatsApp Order Flows
export const WHATSAPP_FLOWS: WhatsAppFlow[] = [
  // Greeting and Welcome
  {
    trigger: ["hola", "buenas", "buenos días", "buenas tardes", "hi", "hey"],
    response: `¡Hola! 👋 Bienvenido a Quimimar

Soy tu asistente virtual para pedidos de productos de limpieza profesional Quimxel.

¿En qué puedo ayudarte?`,
    quickReplies: [
      "🛒 Hacer pedido",
      "📋 Ver catálogo", 
      "💰 Consultar precios",
      "📞 Hablar con comercial"
    ]
  },

  // Product Categories  
  {
    trigger: ["catálogo", "productos", "que tienen", "lista"],
    response: `📋 **CATÁLOGO QUIMXEL**

🦠 **DESINFECTANTES**
• CLORSAN (€8.91/5L) - Desinfectante clorado
• FRESC (€2.14/1L, €9.90/5L) - Versátil

🧽 **DESENGRASANTES** 
• DENGRAS F (€3.77/1.25KG, €18.15/6KG) - Para planchas

🏠 **FREGASUELOS**
• WAN FLORAL (€4.50/5L) - Fragancia floral

🌸 **AMBIENTADORES**
• SILK (€3.08/750ml, €15.25/5L) - Multiusos

🚿 **ANTICAL**
• SANICAL (€3.50/1L) - Potente antical

¿Qué categoría te interesa?`,
    quickReplies: ["Desinfectantes", "Desengrasantes", "Fregasuelos", "Ver todo"]
  },

  // Specific Product Inquiries
  {
    trigger: ["desinfectante", "desinfectar", "virus", "bacteria", "covid", "higiene"],
    response: `🦠 **DESINFECTANTES DISPONIBLES**

**CLORSAN** - €8.91 (5L)
✅ Desinfectante clorado sanitario
✅ Ideal para: Restaurantes, hoteles, cocinas
✅ Elimina virus y bacterias

**FRESC** - €2.14 (1L) / €9.90 (5L) 
✅ Limpiador desinfectante versátil
✅ Ideal para: Oficinas, tiendas, servicios
✅ Fácil de usar

¿Cuál prefieres? ¿Para qué tipo de negocio?`,
    quickReplies: ["CLORSAN 5L", "FRESC 1L", "FRESC 5L", "Necesito asesoría"]
  },

  {
    trigger: ["desengrasante", "grasa", "cocina", "plancha", "freidora"],
    response: `🧽 **DESENGRASANTES PROFESIONALES**

**DENGRAS F** - Para planchas y cocinas
• 1.25KG → €3.77 (uso doméstico/pequeño)
• 6KG → €18.15 (uso industrial/intensivo)

✅ Perfecto para:
• Planchas de cocina
• Freidoras 
• Campanas extractoras
• Superficies grasas

¿Qué tamaño necesitas?`,
    quickReplies: ["1.25KG (€3.77)", "6KG (€18.15)", "Los dos tamaños"]
  },

  {
    trigger: ["fregasuelos", "suelo", "mopear", "fregar", "limpiar suelo"],
    response: `🏠 **PRODUCTOS PARA SUELOS**

**WAN FLORAL** - €4.50 (5L)
✅ Fregasuelos con fragancia floral
✅ Ideal para: Oficinas, comercios, hoteles
✅ Deja un aroma agradable

**PLASTIC PLUS** - €41.50 (5L)
✅ Emulsión metalizada alta resistencia  
✅ Para suelos industriales y pavimentos
✅ Máxima protección

¿Para qué tipo de suelo?`,
    quickReplies: ["WAN FLORAL", "PLASTIC PLUS", "No estoy seguro"]
  },

  // Price Inquiries
  {
    trigger: ["precio", "cuanto cuesta", "cuánto", "coste", "tarifa"],
    response: `💰 **LISTA DE PRECIOS QUIMXEL**

🦠 **DESINFECTANTES:**
• CLORSAN 5L → €8.91
• FRESC 1L → €2.14  
• FRESC 5L → €9.90

🧽 **DESENGRASANTES:**
• DENGRAS F 1.25KG → €3.77
• DENGRAS F 6KG → €18.15

🏠 **FREGASUELOS:**
• WAN FLORAL 5L → €4.50
• PLASTIC PLUS 5L → €41.50

🌸 **AMBIENTADORES:**
• SILK 750ml → €3.08
• SILK 5L → €15.25

🚿 **ANTICAL:**
• SANICAL 1L → €3.50

*Precios sin IVA. Envío gratuito +€50*`,
    quickReplies: ["Hacer pedido", "Consultar descuentos", "Hablar comercial"]
  },

  // Order Process
  {
    trigger: ["pedido", "comprar", "quiero", "necesito", "pedir"],
    response: `🛒 **NUEVO PEDIDO**

Para realizar tu pedido, necesito:

1️⃣ **Productos que necesitas**
2️⃣ **Cantidades**  
3️⃣ **Datos de tu empresa**
4️⃣ **Dirección de entrega**

Empezamos:
¿Qué productos necesitas?

Ejemplo: "2 CLORSAN 5L, 1 DENGRAS F 6KG"`,
    quickReplies: ["CLORSAN", "DENGRAS F", "WAN FLORAL", "Ver catálogo"]
  },

  // Business Information
  {
    trigger: ["empresa", "negocio", "restaurante", "hotel", "oficina", "comercio"],
    response: `🏢 **INFORMACIÓN DE TU NEGOCIO**

Para ofrecerte el mejor servicio y productos adecuados:

¿Qué tipo de negocio tienes?`,
    quickReplies: [
      "🍽️ Restaurante",
      "🏨 Hotel", 
      "🏢 Oficina",
      "🏪 Comercio",
      "🏥 Centro sanitario",
      "Otro"
    ]
  },

  // Restaurant Specific
  {
    trigger: ["restaurante", "cocina", "bar", "cafetería"],
    response: `🍽️ **PACK RESTAURANTE RECOMENDADO**

Para tu restaurante, te recomiendo:

**PACK BÁSICO** (€35.53):
• 1x CLORSAN 5L (€8.91) - Desinfección general
• 1x DENGRAS F 6KG (€18.15) - Plancha/freidora  
• 1x WAN FLORAL 5L (€4.50) - Suelos comedor
• 1x SANICAL 1L (€3.50) - Baños

**PACK PREMIUM** (+€47.83):
• Todo lo anterior +
• 1x FRESC 5L (€9.90) - Mesas y superficies
• 1x SILK 5L (€15.25) - Ambientador
• 1x PLASTIC PLUS 5L (€41.50) - Protección suelos

¿Te interesa algún pack?`,
    quickReplies: ["Pack Básico", "Pack Premium", "Personalizar", "Solo precios"]
  },

  // Hotel Specific  
  {
    trigger: ["hotel", "hostal", "alojamiento"],
    response: `🏨 **PACK HOTEL RECOMENDADO**

Para tu hotel, pack especializado:

**PACK HOTELERO** (€52.08):
• 2x FRESC 5L (€19.80) - Habitaciones/baños
• 1x SILK 5L (€15.25) - Ambientador  
• 1x WAN FLORAL 5L (€4.50) - Pasillos/recepción
• 1x SANICAL 1L (€3.50) - Baños intensivo
• 1x CLORSAN 5L (€8.91) - Desinfección general

✅ Perfecto para 20-30 habitaciones
✅ Duración aprox: 1 mes
✅ Incluye asesoría de uso

¿Te interesa este pack?`,
    quickReplies: ["Sí, me interesa", "Modificar cantidades", "Solo para 10 hab.", "Precio por separado"]
  },

  // Support and Contact
  {
    trigger: ["ayuda", "soporte", "comercial", "asesor", "contacto"],
    response: `📞 **ATENCIÓN PERSONALIZADA**

Te pongo en contacto con nuestro equipo comercial:

👨‍💼 **Álex - Director Comercial**
📱 Móvil: +34 968 XXX XXX
📧 Email: alex@quimimar.es

⏰ **Horario atención:**
Lunes a Viernes: 8:00 - 18:00
Sábados: 9:00 - 14:00

🚚 **Información entrega:**
• Envío gratuito pedidos +€50
• Entrega 24-48h Murcia y alrededores
• Entrega 48-72h resto España

¿Prefieres que te llame o continúas por WhatsApp?`,
    quickReplies: ["Que me llame", "Seguir por WhatsApp", "Solo información"]
  },

  // Delivery and Logistics
  {
    trigger: ["entrega", "envío", "delivery", "enviar", "recibir"],
    response: `🚚 **INFORMACIÓN DE ENTREGA**

📦 **Condiciones de envío:**
• GRATUITO en pedidos +€50
• €5.90 en pedidos menores

⏱️ **Plazos de entrega:**
• Murcia capital: 24h
• Región de Murcia: 24-48h  
• Valencia, Alicante: 48h
• Resto España: 48-72h

📍 **Zonas de reparto:**
✅ Murcia y pedanías
✅ Cartagena, Lorca, Molina
✅ Toda la Región de Murcia
✅ Península completa

¿Cuál es tu código postal?`,
    quickReplies: ["30XXX (Murcia)", "Otra provincia", "Consultar zona"]
  },

  // Payment Information
  {
    trigger: ["pago", "factura", "transferencia", "efectivo", "tarjeta"],
    response: `💳 **FORMAS DE PAGO**

Para empresas (B2B):
✅ **Transferencia bancaria** (recomendado)
✅ **Contra-reembolso** (+€3 gastos)
✅ **Pago a 30 días** (clientes habituales)

📄 **Facturación:**
• Factura con IVA incluido
• Datos fiscales correctos
• Envío por email automático

💼 **Clientes empresariales:**
• Condiciones especiales de pago
• Descuentos por volumen
• Términos comerciales B2B

¿Necesitas factura con datos específicos?`,
    quickReplies: ["Sí, con CIF", "Factura simplificada", "Informar datos", "Consultar descuentos"]
  },

  // Error handling
  {
    trigger: ["no entiendo", "error", "problema", "mal"],
    response: `❓ **¿Necesitas ayuda?**

Perdona, no he entendido bien tu consulta.

Puedes preguntarme sobre:
• 🛒 Productos y precios
• 📦 Pedidos y entregas  
• 🏢 Packs para tu negocio
• 📞 Contacto comercial

O escribe directamente lo que necesitas.

¿En qué puedo ayudarte?`,
    quickReplies: ["Ver productos", "Hacer pedido", "Precios", "Hablar comercial"]
  }
];

// Utility Functions for WhatsApp Bot
export class WhatsAppOrderBot {
  
  static findResponse(message: string): WhatsAppFlow | null {
    const normalizedMessage = message.toLowerCase().trim();
    
    return WHATSAPP_FLOWS.find(flow => 
      flow.trigger.some(trigger => 
        normalizedMessage.includes(trigger.toLowerCase())
      )
    ) || null;
  }

  static searchProducts(query: string): ProductInfo[] {
    const normalizedQuery = query.toLowerCase();
    
    return QUIMXEL_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery) ||
      product.usage.some(use => use.toLowerCase().includes(normalizedQuery))
    );
  }

  static calculateOrderTotal(items: {productId: string, quantity: number}[]): {
    items: Array<{product: ProductInfo, quantity: number, subtotal: number}>,
    subtotal: number,
    shipping: number,
    total: number
  } {
    const orderItems = items.map(item => {
      const product = QUIMXEL_PRODUCTS.find(p => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      
      return {
        product,
        quantity: item.quantity,
        subtotal: product.price * item.quantity
      };
    });

    const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    const shipping = subtotal >= 50 ? 0 : 5.90;
    const total = subtotal + shipping;

    return { items: orderItems, subtotal, shipping, total };
  }

  static generateOrderSummary(order: ReturnType<typeof WhatsAppOrderBot.calculateOrderTotal>): string {
    let summary = "📋 **RESUMEN DE PEDIDO**\n\n";
    
    order.items.forEach(item => {
      summary += `• ${item.quantity}x ${item.product.name} ${item.product.size}\n`;
      summary += `  €${item.product.price} × ${item.quantity} = €${item.subtotal.toFixed(2)}\n\n`;
    });

    summary += `💰 **TOTALES:**\n`;
    summary += `Subtotal: €${order.subtotal.toFixed(2)}\n`;
    summary += `Envío: €${order.shipping.toFixed(2)}\n`;
    summary += `**TOTAL: €${order.total.toFixed(2)}**\n\n`;
    
    if (order.shipping === 0) {
      summary += "🎉 ¡Envío gratuito!";
    }

    return summary;
  }

  static getBusinessRecommendations(businessType: string): ProductInfo[] {
    const recommendations: Record<string, string[]> = {
      'restaurante': ['CLORSAN-5L', 'DENGRAS-F-6KG', 'WAN-FLORAL-5L', 'SANICAL-1L'],
      'hotel': ['FRESC-5L', 'SILK-5L', 'WAN-FLORAL-5L', 'SANICAL-1L', 'CLORSAN-5L'], 
      'oficina': ['FRESC-1L', 'SILK-750ML', 'WAN-FLORAL-5L'],
      'comercio': ['FRESC-1L', 'WAN-FLORAL-5L', 'SILK-750ML'],
      'sanitario': ['CLORSAN-5L', 'FRESC-5L', 'SANICAL-1L']
    };

    const productIds = recommendations[businessType.toLowerCase()] || [];
    return QUIMXEL_PRODUCTS.filter(p => productIds.includes(p.id));
  }
}

// Export for easy integration
export default WhatsAppOrderBot;