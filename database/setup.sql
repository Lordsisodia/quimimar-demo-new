-- =============================================
-- Complete Supabase Database Setup Script
-- Run this script to set up the entire Quimimar database
-- =============================================

-- Step 1: Run initial setup and migrations
\i database/migrations/001_initial_setup.sql

-- Step 2: Create all table schemas
\i database/schema/01_auth.sql
\i database/schema/02_products.sql
\i database/schema/03_orders.sql
\i database/schema/04_customers.sql

-- Step 3: Set up security policies
\i database/policies/products.sql

-- Step 4: Create advanced functions
\i database/functions/search-products.sql

-- Step 5: Seed with initial data
\i database/seed/categories.sql
\i database/seed/products.sql
\i database/seed/customers.sql

-- Step 6: Create additional indexes for performance
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_search_vector ON public.products USING gin(
    (
        coalesce(name->>'es', '') || ' ' ||
        coalesce(name->>'en', '') || ' ' ||
        coalesce(description->>'es', '') || ' ' ||
        coalesce(description->>'en', '') || ' ' ||
        sku
    )
);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_created_at_desc ON public.orders(created_at DESC);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_order_items_product_created ON public.order_items(product_id, created_at);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_customer_interactions_customer_created ON public.customer_interactions(customer_id, created_at DESC);

-- Step 7: Refresh materialized views
SELECT refresh_popular_products();

-- Step 8: Set up real-time subscriptions for Supabase
-- Enable real-time for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shopping_carts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cart_items;

-- Step 9: Create admin dashboard views
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
    'products' as metric,
    COUNT(*) as value,
    'Total Products' as label
FROM public.products WHERE status = 'active'
UNION ALL
SELECT 
    'orders_today' as metric,
    COUNT(*) as value,
    'Orders Today' as label
FROM public.orders WHERE DATE(created_at) = CURRENT_DATE
UNION ALL
SELECT 
    'revenue_month' as metric,
    COALESCE(SUM(total_amount), 0) as value,
    'Revenue This Month' as label
FROM public.orders 
WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)
AND status NOT IN ('cancelled', 'refunded')
UNION ALL
SELECT 
    'customers_b2b' as metric,
    COUNT(*) as value,
    'B2B Customers' as label
FROM public.user_profiles WHERE user_type = 'b2b' AND is_active = true
UNION ALL
SELECT 
    'low_stock' as metric,
    COUNT(*) as value,
    'Low Stock Products' as label
FROM public.products 
WHERE manage_stock = true 
AND stock_quantity <= low_stock_threshold
AND status = 'active';

-- Grant permissions for the dashboard view
GRANT SELECT ON admin_dashboard_stats TO authenticated;

-- Step 10: Create notification functions
CREATE OR REPLACE FUNCTION notify_low_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.stock_quantity <= NEW.low_stock_threshold AND OLD.stock_quantity > OLD.low_stock_threshold THEN
        -- This would trigger a notification in the application
        INSERT INTO public.notifications (
            type, title, message, data, created_at
        ) VALUES (
            'low_stock',
            'Producto con stock bajo',
            'El producto ' || (NEW.name->>'es') || ' tiene stock bajo (' || NEW.stock_quantity || ' unidades)',
            json_build_object('product_id', NEW.id, 'current_stock', NEW.stock_quantity, 'threshold', NEW.low_stock_threshold),
            NOW()
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create notifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    read BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES public.user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trigger for low stock notifications
DROP TRIGGER IF EXISTS trigger_low_stock_notification ON public.products;
CREATE TRIGGER trigger_low_stock_notification
    AFTER UPDATE OF stock_quantity ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION notify_low_stock();

-- Step 11: Insert sample orders for testing
DO $$
DECLARE
    hotel_customer_id UUID;
    restaurant_customer_id UUID;
    cleaning_customer_id UUID;
    clorsan_product_id UUID;
    multixel_product_id UUID;
    sample_order_id UUID;
BEGIN
    -- Get customer IDs
    SELECT id INTO hotel_customer_id FROM public.user_profiles WHERE company_name = 'Hotel Mar Menor S.L.';
    SELECT id INTO restaurant_customer_id FROM public.user_profiles WHERE company_name = 'Restaurante El Rincón C.B.';
    SELECT id INTO cleaning_customer_id FROM public.user_profiles WHERE company_name = 'Limpiezas del Mar S.L.';
    
    -- Get product IDs
    SELECT id INTO clorsan_product_id FROM public.products WHERE sku = 'QMX-0001';
    SELECT id INTO multixel_product_id FROM public.products WHERE sku = 'QMX-0002';
    
    -- Create sample order for hotel
    INSERT INTO public.orders (
        id, order_number, customer_id, status, payment_status,
        subtotal, tax_amount, total_amount,
        customer_info, shipping_info,
        payment_method, created_at
    ) VALUES (
        uuid_generate_v4(),
        generate_order_number(),
        hotel_customer_id,
        'delivered',
        'completed',
        150.00, 31.50, 181.50,
        '{"company": "Hotel Mar Menor S.L.", "email": "compras@hotelmarmenor.com", "phone": "+34 968 123 456"}',
        '{"company": "Hotel Mar Menor S.L.", "street": "Paseo de la Ribera, 45", "city": "Murcia", "postal_code": "30100"}',
        'bank_transfer',
        NOW() - INTERVAL '1 week'
    ) RETURNING id INTO sample_order_id;
    
    -- Add order items
    INSERT INTO public.order_items (order_id, product_id, product_name, product_sku, unit_price, quantity, line_total) VALUES
    (sample_order_id, clorsan_product_id, '{"es": "CLORSAN", "en": "CLORSAN"}', 'QMX-0001', 8.00, 10, 80.00),
    (sample_order_id, multixel_product_id, '{"es": "MULTIXEL", "en": "MULTIXEL"}', 'QMX-0002', 11.20, 5, 56.00);
    
    -- Create pending order for restaurant
    INSERT INTO public.orders (
        id, order_number, customer_id, status, payment_status,
        subtotal, tax_amount, total_amount,
        customer_info, shipping_info,
        payment_method, created_at
    ) VALUES (
        uuid_generate_v4(),
        generate_order_number(),
        restaurant_customer_id,
        'confirmed',
        'pending',
        89.10, 18.71, 107.81,
        '{"company": "Restaurante El Rincón C.B.", "email": "admin@restauranteelrincon.es", "phone": "+34 968 234 567"}',
        '{"company": "Restaurante El Rincón C.B.", "street": "Calle Mayor, 23", "city": "Cartagena", "postal_code": "30201"}',
        'bank_transfer',
        NOW() - INTERVAL '2 days'
    ) RETURNING id INTO sample_order_id;
    
    INSERT INTO public.order_items (order_id, product_id, product_name, product_sku, unit_price, quantity, line_total) VALUES
    (sample_order_id, clorsan_product_id, '{"es": "CLORSAN", "en": "CLORSAN"}', 'QMX-0001', 8.50, 10, 85.00);
    
END $$;

-- Step 12: Update user profile statistics based on orders
UPDATE public.user_profiles SET 
    total_orders = order_stats.order_count,
    total_spent = order_stats.total_amount,
    last_order_date = order_stats.last_order
FROM (
    SELECT 
        customer_id,
        COUNT(*) as order_count,
        SUM(total_amount) as total_amount,
        MAX(created_at) as last_order
    FROM public.orders 
    WHERE status NOT IN ('cancelled', 'refunded')
    GROUP BY customer_id
) order_stats
WHERE user_profiles.id = order_stats.customer_id;

-- Final verification queries
SELECT 'Database setup completed successfully!' as status;
SELECT 'Total products created: ' || COUNT(*) as products FROM public.products;
SELECT 'Total categories created: ' || COUNT(*) as categories FROM public.product_categories;
SELECT 'Total B2B customers created: ' || COUNT(*) as b2b_customers FROM public.user_profiles WHERE user_type = 'b2b';
SELECT 'Total orders created: ' || COUNT(*) as orders FROM public.orders;