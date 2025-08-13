-- =============================================
-- Row Level Security Policies for Products
-- =============================================

-- Enable RLS on all product-related tables
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_tag_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_relationships ENABLE ROW LEVEL SECURITY;

-- =============================================
-- Product Categories Policies
-- =============================================

-- Public read access to active categories
CREATE POLICY "categories_public_read" ON public.product_categories
    FOR SELECT USING (is_active = true);

-- Admins can do everything
CREATE POLICY "categories_admin_all" ON public.product_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = auth.uid()
            AND au.can_manage_products = true
        )
    );

-- =============================================
-- Product Brands Policies
-- =============================================

-- Public read access to active brands
CREATE POLICY "brands_public_read" ON public.product_brands
    FOR SELECT USING (is_active = true);

-- Admins can manage brands
CREATE POLICY "brands_admin_all" ON public.product_brands
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = auth.uid()
            AND au.can_manage_products = true
        )
    );

-- =============================================
-- Products Policies
-- =============================================

-- Public read access to visible, active products
CREATE POLICY "products_public_read" ON public.products
    FOR SELECT USING (
        status = 'active' 
        AND visibility IN ('visible', 'catalog', 'search')
    );

-- B2B customers can see B2B-specific pricing and products
CREATE POLICY "products_b2b_read" ON public.products
    FOR SELECT USING (
        status = 'active' 
        AND visibility IN ('visible', 'catalog', 'search')
        AND EXISTS (
            SELECT 1 FROM public.user_profiles up
            WHERE up.id = auth.uid()
            AND up.user_type = 'b2b'
            AND up.is_active = true
        )
    );

-- Admins can see and manage all products
CREATE POLICY "products_admin_all" ON public.products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = auth.uid()
            AND au.can_manage_products = true
        )
    );

-- Sales reps can read products for their customers
CREATE POLICY "products_sales_rep_read" ON public.products
    FOR SELECT USING (
        status = 'active'
        AND EXISTS (
            SELECT 1 FROM public.user_profiles up
            WHERE up.id = auth.uid()
            AND up.user_type = 'admin'
            AND EXISTS (
                SELECT 1 FROM public.user_profiles customer
                WHERE customer.sales_rep_id = up.id
            )
        )
    );

-- =============================================
-- Product Variants Policies
-- =============================================

-- Public read access to variants of visible products
CREATE POLICY "variants_public_read" ON public.product_variants
    FOR SELECT USING (
        is_active = true
        AND EXISTS (
            SELECT 1 FROM public.products p
            WHERE p.id = product_variants.parent_product_id
            AND p.status = 'active'
            AND p.visibility IN ('visible', 'catalog', 'search')
        )
    );

-- Admins can manage all variants
CREATE POLICY "variants_admin_all" ON public.product_variants
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = auth.uid()
            AND au.can_manage_products = true
        )
    );

-- =============================================
-- Product Reviews Policies
-- =============================================

-- Public read access to approved reviews
CREATE POLICY "reviews_public_read" ON public.product_reviews
    FOR SELECT USING (status = 'approved');

-- Users can create reviews for products they purchased
CREATE POLICY "reviews_user_create" ON public.product_reviews
    FOR INSERT WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.user_profiles up
            WHERE up.id = auth.uid()
            AND up.is_active = true
        )
    );

-- Users can update their own pending reviews
CREATE POLICY "reviews_user_update" ON public.product_reviews
    FOR UPDATE USING (
        auth.uid() = user_id
        AND status = 'pending'
    ) WITH CHECK (
        auth.uid() = user_id
        AND status = 'pending'
    );

-- Users can read their own reviews regardless of status
CREATE POLICY "reviews_own_read" ON public.product_reviews
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can manage all reviews
CREATE POLICY "reviews_admin_all" ON public.product_reviews
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = auth.uid()
            AND au.can_manage_products = true
        )
    );

-- =============================================
-- Product Tags Policies
-- =============================================

-- Public read access to all tags
CREATE POLICY "tags_public_read" ON public.product_tags
    FOR SELECT USING (true);

-- Admins can manage tags
CREATE POLICY "tags_admin_all" ON public.product_tags
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = auth.uid()
            AND au.can_manage_products = true
        )
    );

-- =============================================
-- Product Tag Relationships Policies
-- =============================================

-- Public read access to tag relationships for visible products
CREATE POLICY "tag_relationships_public_read" ON public.product_tag_relationships
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.products p
            WHERE p.id = product_tag_relationships.product_id
            AND p.status = 'active'
            AND p.visibility IN ('visible', 'catalog', 'search')
        )
    );

-- Admins can manage tag relationships
CREATE POLICY "tag_relationships_admin_all" ON public.product_tag_relationships
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = auth.uid()
            AND au.can_manage_products = true
        )
    );

-- =============================================
-- Product Relationships Policies
-- =============================================

-- Public read access to relationships for visible products
CREATE POLICY "product_relationships_public_read" ON public.product_relationships
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.products p1
            WHERE p1.id = product_relationships.product_id
            AND p1.status = 'active'
            AND p1.visibility IN ('visible', 'catalog', 'search')
        )
        AND EXISTS (
            SELECT 1 FROM public.products p2
            WHERE p2.id = product_relationships.related_product_id
            AND p2.status = 'active'
            AND p2.visibility IN ('visible', 'catalog', 'search')
        )
    );

-- Admins can manage product relationships
CREATE POLICY "product_relationships_admin_all" ON public.product_relationships
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = auth.uid()
            AND au.can_manage_products = true
        )
    );

-- =============================================
-- Functions for Dynamic Pricing
-- =============================================

-- Function to get customer-specific pricing
CREATE OR REPLACE FUNCTION get_customer_price(
    product_id UUID,
    customer_id UUID DEFAULT NULL
)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    base_price DECIMAL(10,2);
    customer_tier TEXT;
    b2b_prices JSONB;
    tier_price DECIMAL(10,2);
BEGIN
    -- Get product base price and B2B prices
    SELECT p.base_price, p.b2b_prices
    INTO base_price, b2b_prices
    FROM public.products p
    WHERE p.id = product_id;
    
    -- If no customer ID provided, return base price
    IF customer_id IS NULL THEN
        RETURN base_price;
    END IF;
    
    -- Get customer discount tier
    SELECT up.discount_tier
    INTO customer_tier
    FROM public.user_profiles up
    WHERE up.id = customer_id
    AND up.user_type = 'b2b'
    AND up.is_active = true;
    
    -- If not a B2B customer, return base price
    IF customer_tier IS NULL THEN
        RETURN base_price;
    END IF;
    
    -- Get tier-specific price
    tier_price := (b2b_prices ->> customer_tier)::DECIMAL(10,2);
    
    -- Return tier price if available, otherwise base price
    RETURN COALESCE(tier_price, base_price);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if customer can view product
CREATE OR REPLACE FUNCTION can_view_product(
    product_id UUID,
    customer_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    product_visibility TEXT;
    product_status TEXT;
    customer_type TEXT;
BEGIN
    -- Get product visibility and status
    SELECT p.visibility, p.status
    INTO product_visibility, product_status
    FROM public.products p
    WHERE p.id = product_id;
    
    -- Product must be active
    IF product_status != 'active' THEN
        RETURN FALSE;
    END IF;
    
    -- If product is hidden, only admins can see it
    IF product_visibility = 'hidden' THEN
        RETURN EXISTS (
            SELECT 1 FROM public.user_profiles up
            JOIN public.admin_users au ON up.id = au.id
            WHERE up.id = customer_id
        );
    END IF;
    
    -- Visible products can be seen by everyone
    IF product_visibility = 'visible' THEN
        RETURN TRUE;
    END IF;
    
    -- Catalog-only products need authenticated users
    IF product_visibility = 'catalog' THEN
        RETURN customer_id IS NOT NULL;
    END IF;
    
    -- Search-only products are visible in search but not catalog
    IF product_visibility = 'search' THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;