-- =============================================
-- Sample B2B Customers Seed Data
-- Realistic Murcia-based businesses
-- =============================================

-- Sample B2B customers (realistic Murcia businesses)
INSERT INTO public.user_profiles (
    id, email, full_name, company_name, phone, user_type, 
    tax_id, business_type, discount_tier, billing_address, shipping_address,
    is_active, is_verified, verification_date, language_preference,
    marketing_consent, newsletter_subscription
) VALUES
-- Hotel Mar Menor (Hospitality)
(uuid_generate_v4(), 'compras@hotelmarmenor.com', 'Ana García López', 'Hotel Mar Menor S.L.', 
 '+34 968 123 456', 'b2b', 'B73123456', 'hosteleria', 'gold',
 '{"company": "Hotel Mar Menor S.L.", "street": "Paseo de la Ribera, 45", "city": "Murcia", "postal_code": "30100", "country": "ES"}',
 '{"company": "Hotel Mar Menor S.L.", "street": "Paseo de la Ribera, 45", "city": "Murcia", "postal_code": "30100", "country": "ES"}',
 true, true, NOW() - INTERVAL '3 months', 'es', true, true),

-- Restaurante El Rincón (Food Service)
(uuid_generate_v4(), 'admin@restauranteelrincon.es', 'Carlos Martínez Ruiz', 'Restaurante El Rincón C.B.', 
 '+34 968 234 567', 'b2b', 'E30234567', 'hosteleria', 'silver',
 '{"company": "Restaurante El Rincón C.B.", "street": "Calle Mayor, 23", "city": "Cartagena", "postal_code": "30201", "country": "ES"}',
 '{"company": "Restaurante El Rincón C.B.", "street": "Calle Mayor, 23", "city": "Cartagena", "postal_code": "30201", "country": "ES"}',
 true, true, NOW() - INTERVAL '6 months', 'es', true, true),

-- Centro de Salud (Healthcare)
(uuid_generate_v4(), 'mantenimiento@centrosalud-murcia.es', 'Dr. María Fernández', 'Centro de Salud San Andrés', 
 '+34 968 345 678', 'b2b', 'S3004567A', 'sanitario', 'platinum',
 '{"company": "Centro de Salud San Andrés", "street": "Avenida de la Libertad, 78", "city": "Murcia", "postal_code": "30009", "country": "ES"}',
 '{"company": "Centro de Salud San Andrés", "street": "Avenida de la Libertad, 78", "city": "Murcia", "postal_code": "30009", "country": "ES"}',
 true, true, NOW() - INTERVAL '1 year', 'es', false, true),

-- Empresa de Limpieza
(uuid_generate_v4(), 'pedidos@limpiezasdelmar.com', 'Antonio Sánchez García', 'Limpiezas del Mar S.L.', 
 '+34 968 456 789', 'b2b', 'B30456789', 'limpieza', 'gold',
 '{"company": "Limpiezas del Mar S.L.", "street": "Polígono Industrial Oeste, Nave 12", "city": "Murcia", "postal_code": "30169", "country": "ES"}',
 '{"company": "Limpiezas del Mar S.L.", "street": "Polígono Industrial Oeste, Nave 12", "city": "Murcia", "postal_code": "30169", "country": "ES"}',
 true, true, NOW() - INTERVAL '2 months', 'es', true, true),

-- Conservas Alimentarias
(uuid_generate_v4(), 'calidad@conservasmediterraneo.es', 'Isabel Martín López', 'Conservas Mediterráneo S.A.', 
 '+34 968 567 890', 'b2b', 'A30567890', 'industria', 'platinum',
 '{"company": "Conservas Mediterráneo S.A.", "street": "Carretera de Santomera, Km 3", "city": "Murcia", "postal_code": "30140", "country": "ES"}',
 '{"company": "Conservas Mediterráneo S.A.", "street": "Carretera de Santomera, Km 3", "city": "Murcia", "postal_code": "30140", "country": "ES"}',
 true, true, NOW() - INTERVAL '8 months', 'es', true, true),

-- Colegio Privado
(uuid_generate_v4(), 'administracion@colegiosantateresa.edu', 'Elena Rodríguez Pérez', 'Colegio Santa Teresa', 
 '+34 968 678 901', 'b2b', 'G30678901', 'otros', 'bronze',
 '{"company": "Colegio Santa Teresa", "street": "Calle de la Enseñanza, 15", "city": "Murcia", "postal_code": "30008", "country": "ES"}',
 '{"company": "Colegio Santa Teresa", "street": "Calle de la Enseñanza, 15", "city": "Murcia", "postal_code": "30008", "country": "ES"}',
 true, true, NOW() - INTERVAL '4 months', 'es', true, true),

-- Taller Mecánico
(uuid_generate_v4(), 'gerencia@tallereslopez.com', 'Juan López Hernández', 'Talleres López Hermanos S.L.', 
 '+34 968 789 012', 'b2b', 'B30789012', 'otros', 'silver',
 '{"company": "Talleres López Hermanos S.L.", "street": "Avenida de los Jerónimos, 45", "city": "Murcia", "postal_code": "30155", "country": "ES"}',
 '{"company": "Talleres López Hermanos S.L.", "street": "Avenida de los Jerónimos, 45", "city": "Murcia", "postal_code": "30155", "country": "ES"}',
 true, true, NOW() - INTERVAL '5 months', 'es', true, false),

-- Residencia de Ancianos
(uuid_generate_v4(), 'direccion@residenciamilagros.es', 'Carmen Jiménez Ruiz', 'Residencia Milagros S.L.', 
 '+34 968 890 123', 'b2b', 'B30890123', 'sanitario', 'gold',
 '{"company": "Residencia Milagros S.L.", "street": "Calle del Bienestar, 67", "city": "Molina de Segura", "postal_code": "30500", "country": "ES"}',
 '{"company": "Residencia Milagros S.L.", "street": "Calle del Bienestar, 67", "city": "Molina de Segura", "postal_code": "30500", "country": "ES"}',
 true, true, NOW() - INTERVAL '7 months', 'es', true, true),

-- Club Deportivo con Piscina
(uuid_generate_v4(), 'mantenimiento@clubdeportivoaguasal.es', 'Roberto Gómez Martín', 'Club Deportivo Aguasal', 
 '+34 968 901 234', 'b2b', 'G30901234', 'otros', 'bronze',
 '{"company": "Club Deportivo Aguasal", "street": "Urbanización Los Alcázares, s/n", "city": "Los Alcázares", "postal_code": "30710", "country": "ES"}',
 '{"company": "Club Deportivo Aguasal", "street": "Urbanización Los Alcázares, s/n", "city": "Los Alcázares", "postal_code": "30710", "country": "ES"}',
 true, true, NOW() - INTERVAL '2 months', 'es', true, true),

-- Empresa de Construcción
(uuid_generate_v4(), 'oficina@construccioneslevante.es', 'Francisco Morales Díaz', 'Construcciones Levante S.A.', 
 '+34 968 012 345', 'b2b', 'A30012345', 'industria', 'silver',
 '{"company": "Construcciones Levante S.A.", "street": "Polígono Industrial Sur, Parcela 8", "city": "Alcantarilla", "postal_code": "30820", "country": "ES"}',
 '{"company": "Construcciones Levante S.A.", "street": "Polígono Industrial Sur, Parcela 8", "city": "Alcantarilla", "postal_code": "30820", "country": "ES"}',
 true, true, NOW() - INTERVAL '9 months', 'es', false, false);

-- Set up customer credit accounts for B2B customers
DO $$
DECLARE
    customer_record RECORD;
BEGIN
    FOR customer_record IN 
        SELECT id, discount_tier, company_name 
        FROM public.user_profiles 
        WHERE user_type = 'b2b'
    LOOP
        INSERT INTO public.customer_credit_accounts (
            customer_id, 
            credit_limit, 
            available_credit, 
            payment_terms_days,
            account_status,
            credit_rating
        ) VALUES (
            customer_record.id,
            CASE customer_record.discount_tier
                WHEN 'platinum' THEN 50000.00
                WHEN 'gold' THEN 25000.00
                WHEN 'silver' THEN 10000.00
                WHEN 'bronze' THEN 5000.00
                ELSE 1000.00
            END,
            CASE customer_record.discount_tier
                WHEN 'platinum' THEN 50000.00
                WHEN 'gold' THEN 25000.00
                WHEN 'silver' THEN 10000.00
                WHEN 'bronze' THEN 5000.00
                ELSE 1000.00
            END,
            CASE customer_record.discount_tier
                WHEN 'platinum' THEN 60
                WHEN 'gold' THEN 45
                WHEN 'silver' THEN 30
                WHEN 'bronze' THEN 30
                ELSE 15
            END,
            'active',
            CASE customer_record.discount_tier
                WHEN 'platinum' THEN 'excellent'
                WHEN 'gold' THEN 'good'
                WHEN 'silver' THEN 'good'
                WHEN 'bronze' THEN 'fair'
                ELSE 'fair'
            END
        );
        
        -- Add customer preferences
        INSERT INTO public.customer_preferences (
            customer_id,
            newsletter_frequency,
            promotional_emails,
            order_notifications,
            language_preference,
            preferred_payment_method,
            delivery_frequency
        ) VALUES (
            customer_record.id,
            'monthly',
            true,
            true,
            'es',
            'bank_transfer',
            CASE 
                WHEN customer_record.company_name LIKE '%Hotel%' OR customer_record.company_name LIKE '%Restaurante%' THEN 'weekly'
                WHEN customer_record.company_name LIKE '%Centro%' OR customer_record.company_name LIKE '%Residencia%' THEN 'monthly'
                ELSE 'on_demand'
            END
        );
    END LOOP;
END $$;

-- Add some sample addresses for customers who might need multiple delivery locations
INSERT INTO public.customer_addresses (customer_id, type, company_name, first_name, last_name, address_line_1, city, postal_code, country, phone, is_default, delivery_instructions) VALUES
-- Hotel with multiple locations
((SELECT id FROM public.user_profiles WHERE company_name = 'Hotel Mar Menor S.L.'), 'shipping', 'Hotel Mar Menor - Anexo', 'Ana', 'García López', 'Calle del Puerto, 12', 'Murcia', '30100', 'ES', '+34 968 123 457', false, 'Entregar en recepción - Edificio anexo'),

-- Restaurant chain with central kitchen
((SELECT id FROM public.user_profiles WHERE company_name = 'Restaurante El Rincón C.B.'), 'shipping', 'El Rincón - Cocina Central', 'Carlos', 'Martínez Ruiz', 'Polígono Industrial, Nave 5', 'Cartagena', '30201', 'ES', '+34 968 234 568', false, 'Horario de entrega: 6:00-14:00'),

-- Cleaning company serving multiple locations
((SELECT id FROM public.user_profiles WHERE company_name = 'Limpiezas del Mar S.L.'), 'shipping', 'Limpiezas del Mar - Almacén Norte', 'Antonio', 'Sánchez García', 'Avenida del Mar, 89', 'San Javier', '30730', 'ES', '+34 968 456 790', false, 'Llamar antes de entregar');

-- Add some customer interaction history
INSERT INTO public.customer_interactions (customer_id, staff_user_id, interaction_type, subject, description, status, priority, created_at) VALUES
-- Recent sales calls
((SELECT id FROM public.user_profiles WHERE company_name = 'Hotel Mar Menor S.L.'), NULL, 'sales_call', 'Revisión trimestral de necesidades', 'Llamada de seguimiento para revisar consumos y posibles necesidades adicionales de productos de limpieza para la temporada alta.', 'resolved', 'medium', NOW() - INTERVAL '1 week'),

((SELECT id FROM public.user_profiles WHERE company_name = 'Centro de Salud San Andrés'), NULL, 'quote_request', 'Solicitud presupuesto desinfectantes COVID', 'El cliente solicita presupuesto para desinfectantes hospitalarios de alto nivel para protocolo COVID.', 'resolved', 'high', NOW() - INTERVAL '2 weeks'),

-- Support tickets
((SELECT id FROM public.user_profiles WHERE company_name = 'Conservas Mediterráneo S.A.'), NULL, 'support_ticket', 'Consulta sobre certificaciones HACCP', 'Cliente consulta sobre renovación de certificados HACCP para productos ALIMENTXEL.', 'resolved', 'medium', NOW() - INTERVAL '3 days'),

-- Complaints handled
((SELECT id FROM public.user_profiles WHERE company_name = 'Talleres López Hermanos S.L.'), NULL, 'complaint', 'Retraso en entrega', 'Cliente reporta retraso de 2 días en entrega programada. Se resolvió reorganizando la ruta de reparto.', 'resolved', 'medium', NOW() - INTERVAL '1 month'),

-- Compliments
((SELECT id FROM public.user_profiles WHERE company_name = 'Residencia Milagros S.L.'), NULL, 'compliment', 'Excelente servicio técnico', 'El cliente felicita al equipo técnico por la rápida respuesta en la resolución de dudas sobre dosificación de productos.', 'closed', 'low', NOW() - INTERVAL '2 months');

-- Sample B2C customers for testing
INSERT INTO public.user_profiles (
    id, email, full_name, phone, user_type, language_preference,
    billing_address, shipping_address, is_active, is_verified,
    marketing_consent, newsletter_subscription
) VALUES
(uuid_generate_v4(), 'juan.perez@gmail.com', 'Juan Pérez García', '+34 666 123 456', 'b2c', 'es',
 '{"street": "Calle de la Paz, 23, 3ºB", "city": "Murcia", "postal_code": "30001", "country": "ES"}',
 '{"street": "Calle de la Paz, 23, 3ºB", "city": "Murcia", "postal_code": "30001", "country": "ES"}',
 true, true, true, true),

(uuid_generate_v4(), 'maria.gonzalez@hotmail.com', 'María González López', '+34 666 234 567', 'b2c', 'es',
 '{"street": "Avenida Juan Carlos I, 45", "city": "Cartagena", "postal_code": "30201", "country": "ES"}',
 '{"street": "Avenida Juan Carlos I, 45", "city": "Cartagena", "postal_code": "30201", "country": "ES"}',
 true, false, false, false),

(uuid_generate_v4(), 'pedro.martinez@yahoo.es', 'Pedro Martínez Ruiz', '+34 666 345 678', 'b2c', 'es',
 '{"street": "Calle Mayor, 12", "city": "Molina de Segura", "postal_code": "30500", "country": "ES"}',
 '{"street": "Calle Mayor, 12", "city": "Molina de Segura", "postal_code": "30500", "country": "ES"}',
 true, true, true, false);