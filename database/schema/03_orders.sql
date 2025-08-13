-- =============================================
-- Order Management Schema
-- =============================================

-- Order status enum for consistency
CREATE TYPE order_status AS ENUM (
    'pending',
    'confirmed', 
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded',
    'partially_refunded'
);

-- Payment status enum
CREATE TYPE payment_status AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed',
    'cancelled',
    'refunded',
    'partially_refunded'
);

-- Main orders table
CREATE TABLE public.orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL, -- Human-readable order number
    customer_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    
    -- Order status and tracking
    status order_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    
    -- Pricing breakdown
    subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    shipping_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'EUR',
    
    -- Customer information snapshot (for historical accuracy)
    customer_info JSONB NOT NULL, -- Billing info at time of order
    shipping_info JSONB NOT NULL, -- Shipping info at time of order
    
    -- Payment information
    payment_method TEXT, -- 'bank_transfer', 'credit_card', 'paypal', 'cash_on_delivery'
    payment_reference TEXT, -- External payment ID
    payment_due_date TIMESTAMPTZ, -- For B2B net terms
    
    -- Shipping information
    shipping_method TEXT,
    shipping_provider TEXT, -- 'seur', 'correos', 'nacex', etc.
    tracking_number TEXT,
    estimated_delivery_date TIMESTAMPTZ,
    actual_delivery_date TIMESTAMPTZ,
    
    -- Business logic
    tax_rate DECIMAL(5,4) DEFAULT 0.21, -- Spanish IVA rate
    discount_codes TEXT[], -- Applied discount codes
    sales_rep_id UUID REFERENCES public.user_profiles(id), -- B2B sales representative
    
    -- Notes and communication
    customer_notes TEXT,
    admin_notes TEXT,
    order_source TEXT DEFAULT 'website', -- 'website', 'phone', 'email', 'rep'
    
    -- Dates and timing
    confirmed_at TIMESTAMPTZ,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    cancellation_reason TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order items (line items)
CREATE TABLE public.order_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    product_variant_id UUID REFERENCES public.product_variants(id),
    
    -- Product snapshot at time of order
    product_name JSONB NOT NULL, -- Product name when ordered
    product_sku TEXT NOT NULL,
    product_attributes JSONB, -- Variant attributes if applicable
    
    -- Pricing
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total DECIMAL(12,2) NOT NULL, -- unit_price * quantity
    
    -- Discounts applied to this line
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Order status history for tracking changes
CREATE TABLE public.order_status_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    previous_status order_status,
    new_status order_status NOT NULL,
    changed_by UUID REFERENCES public.user_profiles(id),
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shopping cart (for persistent carts)
CREATE TABLE public.shopping_carts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    session_id TEXT, -- For guest users
    
    -- Cart totals
    subtotal DECIMAL(10,2) DEFAULT 0,
    estimated_tax DECIMAL(10,2) DEFAULT 0,
    estimated_shipping DECIMAL(10,2) DEFAULT 0,
    estimated_total DECIMAL(10,2) DEFAULT 0,
    
    -- Applied discounts
    discount_codes TEXT[] DEFAULT '{}',
    discount_amount DECIMAL(10,2) DEFAULT 0,
    
    -- Cart status
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cart items
CREATE TABLE public.cart_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cart_id UUID REFERENCES public.shopping_carts(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    product_variant_id UUID REFERENCES public.product_variants(id),
    
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    line_total DECIMAL(10,2) NOT NULL,
    
    -- Track when item was added for abandonment analysis
    added_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(cart_id, product_id, product_variant_id)
);

-- Quotes for B2B customers
CREATE TABLE public.quotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quote_number TEXT UNIQUE NOT NULL,
    customer_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    sales_rep_id UUID REFERENCES public.user_profiles(id),
    
    -- Quote details
    subtotal DECIMAL(12,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    
    -- Quote terms
    valid_until TIMESTAMPTZ NOT NULL,
    payment_terms INTEGER DEFAULT 30, -- days
    delivery_terms TEXT,
    
    -- Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired', 'converted')),
    
    -- Notes
    internal_notes TEXT,
    customer_notes TEXT,
    terms_and_conditions TEXT,
    
    -- Conversion tracking
    converted_order_id UUID REFERENCES public.orders(id),
    converted_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote items
CREATE TABLE public.quote_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) NOT NULL,
    product_variant_id UUID REFERENCES public.product_variants(id),
    
    product_name JSONB NOT NULL,
    product_sku TEXT NOT NULL,
    description TEXT,
    
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    line_total DECIMAL(12,2) NOT NULL,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discount codes and promotions
CREATE TABLE public.discount_codes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL, -- Multi-language names
    description JSONB,
    
    -- Discount configuration
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_order_amount DECIMAL(10,2),
    maximum_discount_amount DECIMAL(10,2),
    
    -- Usage limits
    usage_limit INTEGER, -- Total uses allowed
    usage_limit_per_customer INTEGER DEFAULT 1,
    used_count INTEGER DEFAULT 0,
    
    -- Validity
    starts_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    
    -- Restrictions
    customer_eligibility TEXT DEFAULT 'all' CHECK (customer_eligibility IN ('all', 'b2b', 'b2c', 'new_customers')),
    product_categories UUID[], -- Array of category IDs
    excluded_products UUID[], -- Array of product IDs
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track discount code usage
CREATE TABLE public.discount_code_usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    discount_code_id UUID REFERENCES public.discount_codes(id) NOT NULL,
    order_id UUID REFERENCES public.orders(id),
    user_id UUID REFERENCES public.user_profiles(id),
    
    discount_amount DECIMAL(10,2) NOT NULL,
    
    used_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_created_at ON public.orders(created_at);
CREATE INDEX idx_orders_sales_rep_id ON public.orders(sales_rep_id);

CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_id ON public.order_items(product_id);

CREATE INDEX idx_order_status_history_order_id ON public.order_status_history(order_id);

CREATE INDEX idx_shopping_carts_user_id ON public.shopping_carts(user_id);
CREATE INDEX idx_shopping_carts_session_id ON public.shopping_carts(session_id);
CREATE INDEX idx_shopping_carts_expires_at ON public.shopping_carts(expires_at);

CREATE INDEX idx_cart_items_cart_id ON public.cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON public.cart_items(product_id);

CREATE INDEX idx_quotes_customer_id ON public.quotes(customer_id);
CREATE INDEX idx_quotes_sales_rep_id ON public.quotes(sales_rep_id);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_quotes_valid_until ON public.quotes(valid_until);

CREATE INDEX idx_discount_codes_code ON public.discount_codes(code);
CREATE INDEX idx_discount_codes_is_active ON public.discount_codes(is_active);
CREATE INDEX idx_discount_codes_expires_at ON public.discount_codes(expires_at);

-- Triggers
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shopping_carts_updated_at BEFORE UPDATE ON public.shopping_carts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discount_codes_updated_at BEFORE UPDATE ON public.discount_codes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Functions for order number generation
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    year_suffix TEXT;
    sequence_num INTEGER;
    order_num TEXT;
BEGIN
    year_suffix := EXTRACT(year FROM NOW())::TEXT;
    
    -- Get next sequence number for this year
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 6) AS INTEGER)), 0) + 1
    INTO sequence_num
    FROM public.orders 
    WHERE order_number LIKE 'QMR' || year_suffix || '%';
    
    order_num := 'QMR' || year_suffix || LPAD(sequence_num::TEXT, 6, '0');
    
    RETURN order_num;
END;
$$ LANGUAGE plpgsql;