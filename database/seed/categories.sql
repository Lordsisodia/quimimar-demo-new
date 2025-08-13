-- =============================================
-- Product Categories Seed Data
-- Based on Quimxel's actual product categories
-- =============================================

-- Main product categories from Quimxel analysis
INSERT INTO public.product_categories (id, name, slug, description, parent_id, sort_order, is_active) VALUES
-- Main categories
(uuid_generate_v4(), 
 '{"es": "Limpieza General", "en": "General Cleaning"}',
 'limpieza-general',
 '{"es": "Productos para la limpieza diaria y mantenimiento general", "en": "Products for daily cleaning and general maintenance"}',
 NULL, 1, true),

(uuid_generate_v4(), 
 '{"es": "Lavandería Profesional", "en": "Professional Laundry"}',
 'lavanderia-profesional',
 '{"es": "Detergentes y productos especializados para lavandería industrial", "en": "Detergents and specialized products for industrial laundry"}',
 NULL, 2, true),

(uuid_generate_v4(), 
 '{"es": "Industria Alimentaria", "en": "Food Industry"}',
 'industria-alimentaria',
 '{"es": "Productos de limpieza y desinfección para la industria alimentaria", "en": "Cleaning and disinfection products for food industry"}',
 NULL, 3, true),

(uuid_generate_v4(), 
 '{"es": "Automoción", "en": "Automotive"}',
 'automocion',
 '{"es": "Productos especializados para limpieza automotriz", "en": "Specialized products for automotive cleaning"}',
 NULL, 4, true),

(uuid_generate_v4(), 
 '{"es": "Sector Sanitario", "en": "Healthcare Sector"}',
 'sector-sanitario',
 '{"es": "Productos de limpieza y desinfección para centros sanitarios", "en": "Cleaning and disinfection products for healthcare facilities"}',
 NULL, 5, true),

(uuid_generate_v4(), 
 '{"es": "Industria y Construcción", "en": "Industry & Construction"}',
 'industria-construccion',
 '{"es": "Productos industriales y para construcción", "en": "Industrial and construction products"}',
 NULL, 6, true),

(uuid_generate_v4(), 
 '{"es": "Piscinas", "en": "Swimming Pools"}',
 'piscinas',
 '{"es": "Productos químicos para tratamiento de piscinas", "en": "Chemical products for swimming pool treatment"}',
 NULL, 7, true),

(uuid_generate_v4(), 
 '{"es": "Ecolabel", "en": "Ecolabel"}',
 'ecolabel',
 '{"es": "Productos ecológicos certificados", "en": "Certified ecological products"}',
 NULL, 8, true);

-- Get category IDs for subcategories
DO $$
DECLARE
    limpieza_general_id UUID;
    lavanderia_id UUID;
    alimentaria_id UUID;
    automocion_id UUID;
    sanitario_id UUID;
    industria_id UUID;
    piscinas_id UUID;
    ecolabel_id UUID;
BEGIN
    -- Get parent category IDs
    SELECT id INTO limpieza_general_id FROM public.product_categories WHERE slug = 'limpieza-general';
    SELECT id INTO lavanderia_id FROM public.product_categories WHERE slug = 'lavanderia-profesional';
    SELECT id INTO alimentaria_id FROM public.product_categories WHERE slug = 'industria-alimentaria';
    SELECT id INTO automocion_id FROM public.product_categories WHERE slug = 'automocion';
    SELECT id INTO sanitario_id FROM public.product_categories WHERE slug = 'sector-sanitario';
    SELECT id INTO industria_id FROM public.product_categories WHERE slug = 'industria-construccion';
    SELECT id INTO piscinas_id FROM public.product_categories WHERE slug = 'piscinas';
    SELECT id INTO ecolabel_id FROM public.product_categories WHERE slug = 'ecolabel';

    -- Limpieza General subcategories
    INSERT INTO public.product_categories (name, slug, description, parent_id, sort_order, is_active) VALUES
    ('{"es": "Desinfectantes", "en": "Disinfectants"}', 'desinfectantes', 
     '{"es": "Productos desinfectantes para superficies", "en": "Disinfectant products for surfaces"}', 
     limpieza_general_id, 1, true),
    
    ('{"es": "Detergentes Multiusos", "en": "Multi-purpose Detergents"}', 'detergentes-multiusos',
     '{"es": "Detergentes versátiles para múltiples superficies", "en": "Versatile detergents for multiple surfaces"}',
     limpieza_general_id, 2, true),
    
    ('{"es": "Limpiadores de Cristales", "en": "Glass Cleaners"}', 'limpiadores-cristales',
     '{"es": "Productos especializados para limpieza de cristales", "en": "Specialized products for glass cleaning"}',
     limpieza_general_id, 3, true),
    
    ('{"es": "Limpiadores de Suelos", "en": "Floor Cleaners"}', 'limpiadores-suelos',
     '{"es": "Productos para limpieza y mantenimiento de suelos", "en": "Products for floor cleaning and maintenance"}',
     limpieza_general_id, 4, true),
    
    ('{"es": "Abrillantadores", "en": "Polish & Shine"}', 'abrillantadores',
     '{"es": "Productos abrillantadores y protectores", "en": "Polish and protective products"}',
     limpieza_general_id, 5, true);

    -- Lavandería Profesional subcategories
    INSERT INTO public.product_categories (name, slug, description, parent_id, sort_order, is_active) VALUES
    ('{"es": "Detergentes en Polvo", "en": "Powder Detergents"}', 'detergentes-polvo',
     '{"es": "Detergentes en polvo para lavandería industrial", "en": "Powder detergents for industrial laundry"}',
     lavanderia_id, 1, true),
    
    ('{"es": "Detergentes Líquidos", "en": "Liquid Detergents"}', 'detergentes-liquidos',
     '{"es": "Detergentes líquidos concentrados", "en": "Concentrated liquid detergents"}',
     lavanderia_id, 2, true),
    
    ('{"es": "Suavizantes", "en": "Fabric Softeners"}', 'suavizantes',
     '{"es": "Suavizantes para ropa profesional", "en": "Professional fabric softeners"}',
     lavanderia_id, 3, true),
    
    ('{"es": "Blanqueadores", "en": "Bleaches"}', 'blanqueadores',
     '{"es": "Blanqueadores y quitamanchas", "en": "Bleaches and stain removers"}',
     lavanderia_id, 4, true);

    -- Industria Alimentaria subcategories
    INSERT INTO public.product_categories (name, slug, description, parent_id, sort_order, is_active) VALUES
    ('{"es": "Desengrasantes Alimentarios", "en": "Food Grade Degreasers"}', 'desengrasantes-alimentarios',
     '{"es": "Desengrasantes seguros para industria alimentaria", "en": "Food-safe degreasers for food industry"}',
     alimentaria_id, 1, true),
    
    ('{"es": "Desinfectantes HACCP", "en": "HACCP Disinfectants"}', 'desinfectantes-haccp',
     '{"es": "Desinfectantes certificados HACCP", "en": "HACCP certified disinfectants"}',
     alimentaria_id, 2, true),
    
    ('{"es": "Limpiadores CIP", "en": "CIP Cleaners"}', 'limpiadores-cip',
     '{"es": "Productos para sistemas de limpieza in situ", "en": "Products for Clean-in-Place systems"}',
     alimentaria_id, 3, true);

    -- Automoción subcategories
    INSERT INTO public.product_categories (name, slug, description, parent_id, sort_order, is_active) VALUES
    ('{"es": "Lavado de Vehículos", "en": "Vehicle Washing"}', 'lavado-vehiculos',
     '{"es": "Champús y productos para lavado exterior", "en": "Shampoos and exterior washing products"}',
     automocion_id, 1, true),
    
    ('{"es": "Limpieza Interior", "en": "Interior Cleaning"}', 'limpieza-interior',
     '{"es": "Productos para limpieza de interiores", "en": "Interior cleaning products"}',
     automocion_id, 2, true),
    
    ('{"es": "Desengrasantes Motor", "en": "Engine Degreasers"}', 'desengrasantes-motor',
     '{"es": "Desengrasantes especializados para motores", "en": "Specialized engine degreasers"}',
     automocion_id, 3, true);

    -- Sector Sanitario subcategories
    INSERT INTO public.product_categories (name, slug, description, parent_id, sort_order, is_active) VALUES
    ('{"es": "Desinfectantes Hospitalarios", "en": "Hospital Disinfectants"}', 'desinfectantes-hospitalarios',
     '{"es": "Desinfectantes de grado hospitalario", "en": "Hospital-grade disinfectants"}',
     sanitario_id, 1, true),
    
    ('{"es": "Antisépticos", "en": "Antiseptics"}', 'antisepticos',
     '{"es": "Antisépticos para uso sanitario", "en": "Antiseptics for healthcare use"}',
     sanitario_id, 2, true),
    
    ('{"es": "Limpiadores Quirófano", "en": "Operating Room Cleaners"}', 'limpiadores-quirofano',
     '{"es": "Productos especializados para quirófanos", "en": "Specialized products for operating rooms"}',
     sanitario_id, 3, true);

    -- Piscinas subcategories
    INSERT INTO public.product_categories (name, slug, description, parent_id, sort_order, is_active) VALUES
    ('{"es": "Cloro y Desinfectantes", "en": "Chlorine & Disinfectants"}', 'cloro-desinfectantes-piscina',
     '{"es": "Productos clorados para desinfección", "en": "Chlorinated products for disinfection"}',
     piscinas_id, 1, true),
    
    ('{"es": "Reguladores de pH", "en": "pH Regulators"}', 'reguladores-ph',
     '{"es": "Productos para ajuste de pH", "en": "Products for pH adjustment"}',
     piscinas_id, 2, true),
    
    ('{"es": "Floculantes", "en": "Flocculants"}', 'floculantes',
     '{"es": "Floculantes para clarificación del agua", "en": "Flocculants for water clarification"}',
     piscinas_id, 3, true),
    
    ('{"es": "Algicidas", "en": "Algaecides"}', 'algicidas',
     '{"es": "Productos anti-algas", "en": "Anti-algae products"}',
     piscinas_id, 4, true);

    -- Add some cross-category products under Ecolabel
    INSERT INTO public.product_categories (name, slug, description, parent_id, sort_order, is_active) VALUES
    ('{"es": "Detergentes Ecológicos", "en": "Ecological Detergents"}', 'detergentes-ecologicos',
     '{"es": "Detergentes con certificación ecológica", "en": "Detergents with ecological certification"}',
     ecolabel_id, 1, true),
    
    ('{"es": "Limpiadores Biodegradables", "en": "Biodegradable Cleaners"}', 'limpiadores-biodegradables',
     '{"es": "Limpiadores 100% biodegradables", "en": "100% biodegradable cleaners"}',
     ecolabel_id, 2, true);

END $$;