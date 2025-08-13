-- =============================================
-- Products Seed Data
-- Based on actual Quimxel products from analysis
-- =============================================

-- First, create the Quimxel brand
INSERT INTO public.product_brands (id, name, slug, description, logo_url, website_url, is_featured, is_active) VALUES
(uuid_generate_v4(), 'Quimxel', 'quimxel', 
 '{"es": "Líder en productos químicos profesionales con más de 30 años de experiencia", "en": "Leader in professional chemical products with over 30 years of experience"}',
 '/images/brands/quimxel-logo.png', 'https://www.quimxel.es', true, true);

-- Get brand and category IDs for products
DO $$
DECLARE
    quimxel_brand_id UUID;
    limpieza_general_id UUID;
    desinfectantes_id UUID;
    detergentes_multiusos_id UUID;
    limpiadores_suelos_id UUID;
    lavanderia_id UUID;
    detergentes_liquidos_id UUID;
    alimentaria_id UUID;
    desinfectantes_haccp_id UUID;
    piscinas_id UUID;
    cloro_piscinas_id UUID;
    sanitario_id UUID;
    desinfectantes_hospitalarios_id UUID;
BEGIN
    -- Get IDs
    SELECT id INTO quimxel_brand_id FROM public.product_brands WHERE slug = 'quimxel';
    SELECT id INTO limpieza_general_id FROM public.product_categories WHERE slug = 'limpieza-general';
    SELECT id INTO desinfectantes_id FROM public.product_categories WHERE slug = 'desinfectantes';
    SELECT id INTO detergentes_multiusos_id FROM public.product_categories WHERE slug = 'detergentes-multiusos';
    SELECT id INTO limpiadores_suelos_id FROM public.product_categories WHERE slug = 'limpiadores-suelos';
    SELECT id INTO lavanderia_id FROM public.product_categories WHERE slug = 'lavanderia-profesional';
    SELECT id INTO detergentes_liquidos_id FROM public.product_categories WHERE slug = 'detergentes-liquidos';
    SELECT id INTO alimentaria_id FROM public.product_categories WHERE slug = 'industria-alimentaria';
    SELECT id INTO desinfectantes_haccp_id FROM public.product_categories WHERE slug = 'desinfectantes-haccp';
    SELECT id INTO piscinas_id FROM public.product_categories WHERE slug = 'piscinas';
    SELECT id INTO cloro_piscinas_id FROM public.product_categories WHERE slug = 'cloro-desinfectantes-piscina';
    SELECT id INTO sanitario_id FROM public.product_categories WHERE slug = 'sector-sanitario';
    SELECT id INTO desinfectantes_hospitalarios_id FROM public.product_categories WHERE slug = 'desinfectantes-hospitalarios';

    -- Sample products based on common Quimxel products
    INSERT INTO public.products (
        sku, name, description, short_description, category_id, brand_id, 
        product_type, base_price, currency, b2b_prices, 
        weight, volume, stock_quantity, featured_image_url,
        slug, featured, attributes, certifications,
        usage_instructions, safety_warnings, status, visibility
    ) VALUES
    
    -- CLORSAN - Desinfectante Clorado
    ('QMX-0001', 
     '{"es": "CLORSAN", "en": "CLORSAN"}',
     '{"es": "Desinfectante clorado sanitario de amplio espectro. Eficaz contra bacterias, virus y hongos. Ideal para desinfección de superficies en hospitales, colegios y oficinas.", "en": "Broad-spectrum chlorinated sanitizing disinfectant. Effective against bacteria, viruses and fungi. Ideal for surface disinfection in hospitals, schools and offices."}',
     '{"es": "Desinfectante clorado de amplio espectro", "en": "Broad-spectrum chlorinated disinfectant"}',
     desinfectantes_id, quimxel_brand_id, 'simple', 8.91, 'EUR',
     '{"bronze": 8.50, "silver": 8.00, "gold": 7.50, "platinum": 7.00}',
     5.2, 5.0, 150, '/images/products/clorsan-5l.jpg',
     'clorsan-desinfectante-clorado', true,
     '{"concentration": "5%", "ph": "11-13", "active_ingredient": "sodium_hypochlorite", "contact_time": "5_minutes"}',
     '["haccp", "en14476"]',
     '{"es": "Diluir 1:100 para desinfección general. Aplicar sobre superficie limpia y dejar actuar 5 minutos.", "en": "Dilute 1:100 for general disinfection. Apply on clean surface and leave for 5 minutes."}',
     '{"es": "Usar guantes y gafas de protección. No mezclar con otros productos. Mantener fuera del alcance de niños.", "en": "Use gloves and safety glasses. Do not mix with other products. Keep out of reach of children."}',
     'active', 'visible'),

    -- MULTIXEL - Detergente Multiusos
    ('QMX-0002',
     '{"es": "MULTIXEL", "en": "MULTIXEL"}',
     '{"es": "Detergente concentrado multiusos para limpieza general. Formulación avanzada que elimina grasa, suciedad y manchas. Apto para todo tipo de superficies.", "en": "Concentrated multi-purpose detergent for general cleaning. Advanced formulation that removes grease, dirt and stains. Suitable for all types of surfaces."}',
     '{"es": "Detergente concentrado multiusos", "en": "Concentrated multi-purpose detergent"}',
     detergentes_multiusos_id, quimxel_brand_id, 'variable', 12.45, 'EUR',
     '{"bronze": 11.80, "silver": 11.20, "gold": 10.60, "platinum": 10.00}',
     5.8, 5.0, 200, '/images/products/multixel-5l.jpg',
     'multixel-detergente-multiusos', true,
     '{"ph": "7-8", "concentration": "concentrated", "dilution_ratio": "1:50", "foam_level": "medium"}',
     '["ecolabel", "iso14001"]',
     '{"es": "Diluir 1:50 para limpieza general. Para suciedad intensa usar sin diluir.", "en": "Dilute 1:50 for general cleaning. For heavy soiling use undiluted."}',
     '{"es": "Evitar contacto con ojos. En caso de contacto lavar abundantemente con agua.", "en": "Avoid contact with eyes. In case of contact wash thoroughly with water."}',
     'active', 'visible'),

    -- PAVIXEL - Limpiador de Suelos
    ('QMX-0003',
     '{"es": "PAVIXEL", "en": "PAVIXEL"}',
     '{"es": "Limpiador neutro para todo tipo de suelos. Fórmula que no requiere aclarado y deja un acabado brillante sin cercos. Especialmente indicado para suelos delicados.", "en": "Neutral cleaner for all types of floors. No-rinse formula that leaves a brilliant finish without streaks. Especially suitable for delicate floors."}',
     '{"es": "Limpiador neutro para suelos", "en": "Neutral floor cleaner"}',
     limpiadores_suelos_id, quimxel_brand_id, 'simple', 9.75, 'EUR',
     '{"bronze": 9.30, "silver": 8.80, "gold": 8.30, "platinum": 7.80}',
     5.5, 5.0, 120, '/images/products/pavixel-5l.jpg',
     'pavixel-limpiador-suelos', false,
     '{"ph": "6.5-7.5", "finish_type": "brilliant", "rinse_required": "no", "floor_types": "all"}',
     '["ecolabel"]',
     '{"es": "Diluir 100ml en 8L de agua. Fregar normalmente sin aclarar.", "en": "Dilute 100ml in 8L of water. Mop normally without rinsing."}',
     '{"es": "Mantener el envase cerrado. Evitar temperaturas extremas.", "en": "Keep container closed. Avoid extreme temperatures."}',
     'active', 'visible'),

    -- LAVAXEL - Detergente Líquido Lavandería
    ('QMX-0004',
     '{"es": "LAVAXEL", "en": "LAVAXEL"}',
     '{"es": "Detergente líquido concentrado para lavandería profesional. Excelente poder desengrasante y blanqueante. Activo a bajas temperaturas.", "en": "Concentrated liquid detergent for professional laundry. Excellent degreasing and whitening power. Active at low temperatures."}',
     '{"es": "Detergente líquido para lavandería profesional", "en": "Liquid detergent for professional laundry"}',
     detergentes_liquidos_id, quimxel_brand_id, 'simple', 15.20, 'EUR',
     '{"bronze": 14.40, "silver": 13.70, "gold": 12.90, "platinum": 12.20}',
     6.2, 5.0, 80, '/images/products/lavaxel-5l.jpg',
     'lavaxel-detergente-liquido', false,
     '{"ph": "8.5-9.5", "temperature_range": "30-90°C", "enzymes": "yes", "phosphates": "no"}',
     '["eco_cert", "dermatologically_tested"]',
     '{"es": "Dosificar 20-30ml por kg de ropa según suciedad. Apto para aguas duras.", "en": "Dose 20-30ml per kg of clothing according to soiling. Suitable for hard water."}',
     '{"es": "Evitar contacto prolongado con la piel. Usar guantes en manipulación directa.", "en": "Avoid prolonged skin contact. Use gloves when handling directly."}',
     'active', 'visible'),

    -- ALIMENTXEL - Desinfectante HACCP
    ('QMX-0005',
     '{"es": "ALIMENTXEL", "en": "ALIMENTXEL"}',
     '{"es": "Desinfectante sin aclarado especialmente formulado para la industria alimentaria. Certificado HACCP. No altera el sabor ni olor de los alimentos.", "en": "No-rinse disinfectant specially formulated for food industry. HACCP certified. Does not alter food taste or odor."}',
     '{"es": "Desinfectante HACCP para industria alimentaria", "en": "HACCP disinfectant for food industry"}',
     desinfectantes_haccp_id, quimxel_brand_id, 'simple', 18.90, 'EUR',
     '{"bronze": 17.90, "silver": 17.00, "gold": 16.10, "platinum": 15.20}',
     5.8, 5.0, 60, '/images/products/alimentxel-5l.jpg',
     'alimentxel-desinfectante-haccp', true,
     '{"active_ingredient": "quaternary_ammonium", "contact_time": "30_seconds", "rinse_required": "no", "food_contact": "yes"}',
     '["haccp", "iso22000", "brc"]',
     '{"es": "Aplicar directamente sobre superficies limpias. Tiempo de contacto: 30 segundos.", "en": "Apply directly on clean surfaces. Contact time: 30 seconds."}',
     '{"es": "Producto biocida. Usar de manera responsable. Leer etiqueta antes del uso.", "en": "Biocidal product. Use responsibly. Read label before use."}',
     'active', 'visible'),

    -- PISCINXEL CLORO - Hipoclorito para Piscinas
    ('QMX-0006',
     '{"es": "PISCINXEL CLORO", "en": "PISCINXEL CHLORINE"}',
     '{"es": "Hipoclorito de sodio líquido para desinfección de piscinas. Concentración 150g/L de cloro activo. Ideal para tratamiento continuo del agua.", "en": "Liquid sodium hypochlorite for swimming pool disinfection. 150g/L active chlorine concentration. Ideal for continuous water treatment."}',
     '{"es": "Hipoclorito líquido para piscinas", "en": "Liquid hypochlorite for pools"}',
     cloro_piscinas_id, quimxel_brand_id, 'simple', 22.50, 'EUR',
     '{"bronze": 21.40, "silver": 20.30, "gold": 19.20, "platinum": 18.10}',
     12.5, 10.0, 45, '/images/products/piscinxel-cloro-10l.jpg',
     'piscinxel-cloro-hipoclorito', false,
     '{"active_chlorine": "150g/L", "ph": "11-13", "density": "1.2kg/L", "stability": "UV_stabilized"}',
     '["reach_registered", "pool_certified"]',
     '{"es": "Dosificar según análisis del agua. Mantener cloro libre entre 0.5-2 ppm.", "en": "Dose according to water analysis. Maintain free chlorine between 0.5-2 ppm."}',
     '{"es": "Producto corrosivo. Usar gafas y guantes. No mezclar con ácidos.", "en": "Corrosive product. Use glasses and gloves. Do not mix with acids."}',
     'active', 'visible'),

    -- HOSPITALXEL - Desinfectante Hospitalario
    ('QMX-0007',
     '{"es": "HOSPITALXEL", "en": "HOSPITALXEL"}',
     '{"es": "Desinfectante de alto nivel para uso hospitalario. Eficaz contra virus envueltos y no envueltos, bacterias gram+ y gram-, hongos y esporas. Certificado EN14476.", "en": "High-level disinfectant for hospital use. Effective against enveloped and non-enveloped viruses, gram+ and gram- bacteria, fungi and spores. EN14476 certified."}',
     '{"es": "Desinfectante de alto nivel hospitalario", "en": "High-level hospital disinfectant"}',
     desinfectantes_hospitalarios_id, quimxel_brand_id, 'simple', 24.80, 'EUR',
     '{"bronze": 23.60, "silver": 22.30, "gold": 21.10, "platinum": 19.90}',
     5.9, 5.0, 35, '/images/products/hospitalxel-5l.jpg',
     'hospitalxel-desinfectante-hospitalario', true,
     '{"spectrum": "high_level", "contact_time": "1_minute", "alcohol_free": "yes", "surface_compatibility": "broad"}',
     '["en14476", "en13727", "en1276", "medical_device"]',
     '{"es": "Aplicar sobre superficie limpia. Tiempo de contacto: 1 minuto para virus, 5 minutos para esporas.", "en": "Apply on clean surface. Contact time: 1 minute for viruses, 5 minutes for spores."}',
     '{"es": "Uso exclusivo profesional. Mantener fuera del alcance de pacientes y visitantes.", "en": "Professional use only. Keep out of reach of patients and visitors."}',
     'active', 'visible');

    -- Add product variants for MULTIXEL (different sizes)
    INSERT INTO public.product_variants (
        parent_product_id, sku, name, attributes, price, stock_quantity, 
        volume, weight, image_url, is_active, sort_order
    ) VALUES
    ((SELECT id FROM public.products WHERE sku = 'QMX-0002'),
     'QMX-0002-1L', '{"es": "MULTIXEL 1L", "en": "MULTIXEL 1L"}',
     '{"size": "1L", "packaging": "bottle"}', 3.20, 300, 1.0, 1.2,
     '/images/products/multixel-1l.jpg', true, 1),
    
    ((SELECT id FROM public.products WHERE sku = 'QMX-0002'),
     'QMX-0002-20L', '{"es": "MULTIXEL 20L", "en": "MULTIXEL 20L"}',
     '{"size": "20L", "packaging": "jerrycan"}', 45.80, 25, 20.0, 21.5,
     '/images/products/multixel-20l.jpg', true, 3);

END $$;

-- Add some product tags
INSERT INTO public.product_tags (name, slug, color, description) VALUES
('{"es": "Más Vendido", "en": "Best Seller"}', 'best-seller', '#FF6B35', 
 '{"es": "Productos más populares", "en": "Most popular products"}'),
 
('{"es": "Nuevo", "en": "New"}', 'new-product', '#10B981', 
 '{"es": "Productos nuevos", "en": "New products"}'),
 
('{"es": "Oferta", "en": "Sale"}', 'on-sale', '#EF4444', 
 '{"es": "Productos en oferta", "en": "Products on sale"}'),
 
('{"es": "Profesional", "en": "Professional"}', 'professional', '#3B82F6', 
 '{"es": "Uso profesional", "en": "Professional use"}'),
 
('{"es": "Ecológico", "en": "Eco-Friendly"}', 'eco-friendly', '#22C55E', 
 '{"es": "Productos ecológicos", "en": "Eco-friendly products"}');

-- Tag some products
INSERT INTO public.product_tag_relationships (product_id, tag_id) VALUES
((SELECT id FROM public.products WHERE sku = 'QMX-0001'), 
 (SELECT id FROM public.product_tags WHERE slug = 'best-seller')),
((SELECT id FROM public.products WHERE sku = 'QMX-0001'), 
 (SELECT id FROM public.product_tags WHERE slug = 'professional')),
((SELECT id FROM public.products WHERE sku = 'QMX-0002'), 
 (SELECT id FROM public.product_tags WHERE slug = 'eco-friendly')),
((SELECT id FROM public.products WHERE sku = 'QMX-0005'), 
 (SELECT id FROM public.product_tags WHERE slug = 'professional')),
((SELECT id FROM public.products WHERE sku = 'QMX-0007'), 
 (SELECT id FROM public.product_tags WHERE slug = 'professional'));