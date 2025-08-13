-- =============================================
-- Product Catalog Schema
-- =============================================

-- Product categories with hierarchical structure
CREATE TABLE public.product_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name JSONB NOT NULL, -- {"es": "Limpieza General", "en": "General Cleaning"}
    slug TEXT UNIQUE NOT NULL,
    description JSONB, -- Multi-language descriptions
    parent_id UUID REFERENCES public.product_categories(id),
    sort_order INTEGER DEFAULT 0,
    icon_url TEXT,
    banner_image_url TEXT,
    seo_title JSONB,
    seo_description JSONB,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product brands (Quimxel, etc.)
CREATE TABLE public.product_brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description JSONB,
    logo_url TEXT,
    website_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Main products table
CREATE TABLE public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sku TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL, -- Multi-language names
    description JSONB, -- Multi-language descriptions
    short_description JSONB, -- For cards/lists
    
    -- Categorization
    category_id UUID REFERENCES public.product_categories(id) NOT NULL,
    brand_id UUID REFERENCES public.product_brands(id),
    product_type TEXT NOT NULL CHECK (product_type IN ('simple', 'variable', 'grouped')),
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    cost_price DECIMAL(10,2), -- For margin calculations
    currency TEXT DEFAULT 'EUR',
    
    -- B2B Pricing tiers
    b2b_prices JSONB DEFAULT '{}', -- {"bronze": 8.50, "silver": 8.00, "gold": 7.50}
    min_order_quantity INTEGER DEFAULT 1,
    bulk_discounts JSONB DEFAULT '[]', -- [{"quantity": 10, "discount": 5}, {"quantity": 50, "discount": 10}]
    
    -- Physical properties
    weight DECIMAL(8,3), -- kg
    dimensions JSONB, -- {"length": 20, "width": 15, "height": 25, "unit": "cm"}
    volume DECIMAL(8,3), -- liters
    packaging JSONB, -- {"type": "bottle", "material": "plastic", "recyclable": true}
    
    -- Inventory
    manage_stock BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    stock_status TEXT DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'on_backorder')),
    backorder_allowed BOOLEAN DEFAULT false,
    
    -- Media
    featured_image_url TEXT,
    gallery_images TEXT[], -- Array of image URLs
    product_videos TEXT[], -- Array of video URLs
    safety_data_sheet_url TEXT, -- Important for chemical products
    technical_specification_url TEXT,
    
    -- SEO and Marketing
    slug TEXT UNIQUE NOT NULL,
    seo_title JSONB,
    seo_description JSONB,
    meta_keywords JSONB,
    featured BOOLEAN DEFAULT false,
    on_sale BOOLEAN DEFAULT false,
    
    -- Product attributes
    attributes JSONB DEFAULT '{}', -- {"ph": "7.5", "concentration": "5%", "scent": "lemon"}
    specifications JSONB DEFAULT '{}', -- Detailed technical specs
    certifications TEXT[], -- ["ecolabel", "iso14001", "haccp"]
    
    -- Usage and Safety
    usage_instructions JSONB, -- Multi-language instructions
    safety_warnings JSONB, -- Multi-language safety info
    storage_requirements JSONB, -- Temperature, humidity, etc.
    shelf_life INTEGER, -- months
    
    -- Business logic
    tax_class TEXT DEFAULT 'standard', -- For VAT calculations
    shipping_class TEXT DEFAULT 'standard',
    requires_shipping BOOLEAN DEFAULT true,
    sold_individually BOOLEAN DEFAULT false, -- Prevent multiple in cart
    
    -- Status and visibility
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'discontinued')),
    visibility TEXT DEFAULT 'visible' CHECK (visibility IN ('visible', 'hidden', 'catalog', 'search')),
    
    -- Dates
    available_from TIMESTAMPTZ,
    available_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product variants for variable products (different sizes, concentrations)
CREATE TABLE public.product_variants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    parent_product_id UUID REFERENCES public.products(id) NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL,
    
    -- Variant-specific attributes
    attributes JSONB NOT NULL, -- {"size": "5L", "concentration": "10%"}
    
    -- Pricing (inherits from parent if null)
    price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    b2b_prices JSONB DEFAULT '{}',
    
    -- Inventory
    stock_quantity INTEGER DEFAULT 0,
    sku_suffix TEXT, -- For generating child SKUs
    
    -- Physical properties
    weight DECIMAL(8,3),
    dimensions JSONB,
    volume DECIMAL(8,3),
    
    -- Media
    image_url TEXT,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product reviews and ratings
CREATE TABLE public.product_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    user_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT,
    pros TEXT[],
    cons TEXT[],
    
    -- Verification
    is_verified_purchase BOOLEAN DEFAULT false,
    order_id UUID, -- Will reference orders table
    
    -- Moderation
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    moderated_by UUID REFERENCES public.user_profiles(id),
    moderated_at TIMESTAMPTZ,
    
    -- Helpfulness
    helpful_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(product_id, user_id) -- One review per user per product
);

-- Product tags for flexible categorization
CREATE TABLE public.product_tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name JSONB NOT NULL, -- Multi-language tag names
    slug TEXT UNIQUE NOT NULL,
    color TEXT DEFAULT '#3B82F6', -- Hex color for UI
    description JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Many-to-many relationship for product tags
CREATE TABLE public.product_tag_relationships (
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.product_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, tag_id)
);

-- Product cross-sells and up-sells
CREATE TABLE public.product_relationships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    related_product_id UUID REFERENCES public.products(id) NOT NULL,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN ('cross_sell', 'up_sell', 'alternative', 'accessory')),
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(product_id, related_product_id, relationship_type)
);

-- Product search and filtering indexes
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_brand_id ON public.products(brand_id);
CREATE INDEX idx_products_sku ON public.products(sku);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_visibility ON public.products(visibility);
CREATE INDEX idx_products_featured ON public.products(featured);
CREATE INDEX idx_products_on_sale ON public.products(on_sale);
CREATE INDEX idx_products_stock_status ON public.products(stock_status);
CREATE INDEX idx_products_base_price ON public.products(base_price);
CREATE INDEX idx_products_created_at ON public.products(created_at);

-- Full-text search indexes for multi-language content
CREATE INDEX idx_products_name_gin ON public.products USING gin(name);
CREATE INDEX idx_products_description_gin ON public.products USING gin(description);
CREATE INDEX idx_product_categories_name_gin ON public.product_categories USING gin(name);

-- Variant indexes
CREATE INDEX idx_product_variants_parent_id ON public.product_variants(parent_product_id);
CREATE INDEX idx_product_variants_sku ON public.product_variants(sku);

-- Review indexes
CREATE INDEX idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX idx_product_reviews_user_id ON public.product_reviews(user_id);
CREATE INDEX idx_product_reviews_rating ON public.product_reviews(rating);
CREATE INDEX idx_product_reviews_status ON public.product_reviews(status);

-- Triggers
CREATE TRIGGER update_product_categories_updated_at BEFORE UPDATE ON public.product_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_brands_updated_at BEFORE UPDATE ON public.product_brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON public.product_variants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON public.product_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();