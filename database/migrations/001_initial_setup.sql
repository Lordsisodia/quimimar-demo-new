-- =============================================
-- Initial Database Setup Migration
-- Run this after creating the Supabase project
-- =============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy text search
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- For accent-insensitive search

-- Create custom types
CREATE TYPE order_status AS ENUM (
    'pending', 'confirmed', 'processing', 'shipped', 
    'delivered', 'cancelled', 'refunded', 'partially_refunded'
);

CREATE TYPE payment_status AS ENUM (
    'pending', 'processing', 'completed', 'failed', 
    'cancelled', 'refunded', 'partially_refunded'
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to generate human-readable IDs
CREATE OR REPLACE FUNCTION generate_human_id(prefix TEXT, table_name TEXT, id_column TEXT)
RETURNS TEXT AS $$
DECLARE
    year_suffix TEXT;
    sequence_num INTEGER;
    human_id TEXT;
    max_attempts INTEGER := 100;
    attempt INTEGER := 0;
    exists_check BOOLEAN;
BEGIN
    year_suffix := EXTRACT(year FROM NOW())::TEXT;
    
    LOOP
        -- Get next sequence number
        EXECUTE format('SELECT COALESCE(MAX(CAST(SUBSTRING(%I FROM %s) AS INTEGER)), 0) + 1 
                       FROM %I 
                       WHERE %I LIKE %L',
                      id_column, 
                      LENGTH(prefix || year_suffix) + 1,
                      table_name,
                      id_column,
                      prefix || year_suffix || '%')
        INTO sequence_num;
        
        human_id := prefix || year_suffix || LPAD(sequence_num::TEXT, 6, '0');
        
        -- Check if ID already exists
        EXECUTE format('SELECT EXISTS(SELECT 1 FROM %I WHERE %I = %L)',
                      table_name, id_column, human_id)
        INTO exists_check;
        
        IF NOT exists_check THEN
            RETURN human_id;
        END IF;
        
        attempt := attempt + 1;
        IF attempt >= max_attempts THEN
            RAISE EXCEPTION 'Could not generate unique ID after % attempts', max_attempts;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create function for full-text search with Spanish support
CREATE OR REPLACE FUNCTION search_products(
    search_term TEXT,
    category_filter UUID DEFAULT NULL,
    brand_filter UUID DEFAULT NULL,
    min_price DECIMAL DEFAULT NULL,
    max_price DECIMAL DEFAULT NULL,
    customer_id UUID DEFAULT NULL,
    limit_count INTEGER DEFAULT 50,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    sku TEXT,
    name JSONB,
    description JSONB,
    category_id UUID,
    brand_id UUID,
    base_price DECIMAL(10,2),
    customer_price DECIMAL(10,2),
    stock_status TEXT,
    featured_image_url TEXT,
    slug TEXT,
    relevance_score REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.sku,
        p.name,
        p.description,
        p.category_id,
        p.brand_id,
        p.base_price,
        get_customer_price(p.id, customer_id) as customer_price,
        p.stock_status,
        p.featured_image_url,
        p.slug,
        CASE 
            WHEN search_term IS NULL OR search_term = '' THEN 1.0
            ELSE (
                -- Name match (highest weight)
                (CASE WHEN p.name::text ILIKE '%' || search_term || '%' THEN 1.0 ELSE 0.0 END) * 3.0 +
                -- SKU match (high weight)
                (CASE WHEN p.sku ILIKE '%' || search_term || '%' THEN 1.0 ELSE 0.0 END) * 2.5 +
                -- Description match (medium weight)
                (CASE WHEN p.description::text ILIKE '%' || search_term || '%' THEN 1.0 ELSE 0.0 END) * 1.5 +
                -- Fuzzy name match (low weight)
                similarity(unaccent(lower(p.name::text)), unaccent(lower(search_term))) * 1.0
            )
        END as relevance_score
    FROM public.products p
    WHERE 
        p.status = 'active'
        AND p.visibility IN ('visible', 'catalog', 'search')
        AND can_view_product(p.id, customer_id)
        AND (search_term IS NULL OR search_term = '' OR (
            p.name::text ILIKE '%' || search_term || '%' OR
            p.sku ILIKE '%' || search_term || '%' OR
            p.description::text ILIKE '%' || search_term || '%' OR
            similarity(unaccent(lower(p.name::text)), unaccent(lower(search_term))) > 0.3
        ))
        AND (category_filter IS NULL OR p.category_id = category_filter)
        AND (brand_filter IS NULL OR p.brand_id = brand_filter)
        AND (min_price IS NULL OR get_customer_price(p.id, customer_id) >= min_price)
        AND (max_price IS NULL OR get_customer_price(p.id, customer_id) <= max_price)
    ORDER BY 
        CASE WHEN search_term IS NULL OR search_term = '' THEN p.sort_order ELSE 0 END,
        relevance_score DESC,
        p.featured DESC,
        p.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get category hierarchy
CREATE OR REPLACE FUNCTION get_category_hierarchy(category_id UUID)
RETURNS TABLE (
    id UUID,
    name JSONB,
    slug TEXT,
    level INTEGER,
    path TEXT[]
) AS $$
WITH RECURSIVE category_tree AS (
    -- Base case: start with the given category
    SELECT 
        pc.id,
        pc.name,
        pc.slug,
        0 as level,
        ARRAY[pc.slug] as path
    FROM public.product_categories pc
    WHERE pc.id = category_id
    
    UNION ALL
    
    -- Recursive case: get parent categories
    SELECT 
        pc.id,
        pc.name,
        pc.slug,
        ct.level + 1,
        ARRAY[pc.slug] || ct.path
    FROM public.product_categories pc
    JOIN category_tree ct ON pc.id = (
        SELECT parent_id FROM public.product_categories WHERE id = ct.id
    )
)
SELECT * FROM category_tree ORDER BY level DESC;
$$ LANGUAGE sql SECURITY DEFINER;

-- Create function to get product statistics
CREATE OR REPLACE FUNCTION get_product_stats(product_id UUID)
RETURNS TABLE (
    total_reviews INTEGER,
    average_rating DECIMAL(3,2),
    total_sales INTEGER,
    current_stock INTEGER,
    view_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*)::INTEGER FROM public.product_reviews pr WHERE pr.product_id = get_product_stats.product_id AND pr.status = 'approved'),
        (SELECT ROUND(AVG(pr.rating), 2) FROM public.product_reviews pr WHERE pr.product_id = get_product_stats.product_id AND pr.status = 'approved'),
        (SELECT COALESCE(SUM(oi.quantity), 0)::INTEGER FROM public.order_items oi WHERE oi.product_id = get_product_stats.product_id),
        (SELECT p.stock_quantity FROM public.products p WHERE p.id = get_product_stats.product_id),
        0 as view_count; -- Placeholder for future analytics
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create materialized view for popular products
CREATE MATERIALIZED VIEW popular_products AS
SELECT 
    p.id,
    p.sku,
    p.name,
    p.slug,
    p.featured_image_url,
    p.base_price,
    p.category_id,
    p.brand_id,
    COALESCE(sales.total_sold, 0) as total_sold,
    COALESCE(reviews.avg_rating, 0) as avg_rating,
    COALESCE(reviews.review_count, 0) as review_count,
    (
        COALESCE(sales.total_sold, 0) * 0.4 +
        COALESCE(reviews.avg_rating, 0) * 20 * 0.3 +
        COALESCE(reviews.review_count, 0) * 0.2 +
        (CASE WHEN p.featured THEN 50 ELSE 0 END) * 0.1
    ) as popularity_score
FROM public.products p
LEFT JOIN (
    SELECT 
        oi.product_id,
        SUM(oi.quantity) as total_sold
    FROM public.order_items oi
    JOIN public.orders o ON oi.order_id = o.id
    WHERE o.status NOT IN ('cancelled', 'refunded')
    GROUP BY oi.product_id
) sales ON p.id = sales.product_id
LEFT JOIN (
    SELECT 
        pr.product_id,
        AVG(pr.rating) as avg_rating,
        COUNT(*) as review_count
    FROM public.product_reviews pr
    WHERE pr.status = 'approved'
    GROUP BY pr.product_id
) reviews ON p.id = reviews.product_id
WHERE p.status = 'active'
ORDER BY popularity_score DESC;

-- Create index on the materialized view
CREATE INDEX idx_popular_products_popularity_score ON popular_products(popularity_score DESC);
CREATE INDEX idx_popular_products_category_id ON popular_products(category_id);
CREATE INDEX idx_popular_products_brand_id ON popular_products(brand_id);

-- Create function to refresh popular products
CREATE OR REPLACE FUNCTION refresh_popular_products()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW popular_products;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create initial admin user function
CREATE OR REPLACE FUNCTION create_initial_admin(
    admin_email TEXT,
    admin_name TEXT
)
RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
BEGIN
    -- This function should be called after the first admin user signs up
    -- It will upgrade their account to admin status
    
    SELECT id INTO new_user_id
    FROM public.user_profiles
    WHERE email = admin_email;
    
    IF new_user_id IS NULL THEN
        RAISE EXCEPTION 'User with email % not found', admin_email;
    END IF;
    
    -- Update user profile to admin
    UPDATE public.user_profiles 
    SET 
        user_type = 'admin',
        full_name = admin_name,
        is_verified = true,
        verification_date = NOW()
    WHERE id = new_user_id;
    
    -- Create admin user record
    INSERT INTO public.admin_users (
        id, role, permissions, 
        can_view_analytics, can_manage_products, 
        can_manage_orders, can_manage_customers, can_export_data
    ) VALUES (
        new_user_id, 'super_admin', '{"all": true}',
        true, true, true, true, true
    );
    
    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create notification for low stock
CREATE OR REPLACE FUNCTION check_low_stock()
RETURNS TABLE (
    product_id UUID,
    product_name JSONB,
    current_stock INTEGER,
    threshold INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id as product_id,
        p.name as product_name,
        p.stock_quantity as current_stock,
        p.low_stock_threshold as threshold
    FROM public.products p
    WHERE 
        p.manage_stock = true 
        AND p.stock_quantity <= p.low_stock_threshold
        AND p.status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;