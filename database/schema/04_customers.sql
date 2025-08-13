-- =============================================
-- Customer Management Schema
-- =============================================

-- Customer addresses for multiple shipping/billing locations
CREATE TABLE public.customer_addresses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Address details
    type TEXT NOT NULL CHECK (type IN ('billing', 'shipping', 'both')),
    company_name TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    address_line_1 TEXT NOT NULL,
    address_line_2 TEXT,
    city TEXT NOT NULL,
    state_province TEXT,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'ES',
    
    -- Contact information
    phone TEXT,
    email TEXT,
    
    -- Delivery preferences
    delivery_instructions TEXT,
    access_code TEXT,
    preferred_delivery_time TEXT, -- "morning", "afternoon", "any"
    
    -- Status
    is_default BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer communication preferences
CREATE TABLE public.customer_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Communication preferences
    newsletter_frequency TEXT DEFAULT 'weekly' CHECK (newsletter_frequency IN ('daily', 'weekly', 'monthly', 'never')),
    promotional_emails BOOLEAN DEFAULT true,
    order_notifications BOOLEAN DEFAULT true,
    sms_notifications BOOLEAN DEFAULT false,
    phone_notifications BOOLEAN DEFAULT false,
    
    -- Product preferences
    preferred_categories UUID[], -- Array of category IDs
    preferred_brands UUID[], -- Array of brand IDs
    price_range_min DECIMAL(10,2),
    price_range_max DECIMAL(10,2),
    
    -- Language and display
    language_preference TEXT DEFAULT 'es' CHECK (language_preference IN ('es', 'en')),
    currency_preference TEXT DEFAULT 'EUR',
    timezone TEXT DEFAULT 'Europe/Madrid',
    
    -- Business preferences (B2B)
    preferred_payment_method TEXT,
    delivery_frequency TEXT, -- "weekly", "monthly", "on_demand"
    minimum_order_value DECIMAL(10,2),
    automatic_reorder BOOLEAN DEFAULT false,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(customer_id)
);

-- Customer contact history and interactions
CREATE TABLE public.customer_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    staff_user_id UUID REFERENCES public.user_profiles(id),
    
    -- Interaction details
    interaction_type TEXT NOT NULL CHECK (interaction_type IN (
        'phone_call', 'email', 'chat', 'meeting', 'quote_request', 
        'complaint', 'compliment', 'support_ticket', 'sales_call'
    )),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    
    -- Interaction outcome
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Follow-up
    requires_followup BOOLEAN DEFAULT false,
    followup_date TIMESTAMPTZ,
    followup_notes TEXT,
    
    -- Attachments
    attachments TEXT[], -- Array of file URLs
    
    -- Resolution
    resolved_at TIMESTAMPTZ,
    resolution_notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer loyalty program
CREATE TABLE public.loyalty_programs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name JSONB NOT NULL, -- Multi-language names
    description JSONB,
    
    -- Program configuration
    points_per_euro DECIMAL(5,2) DEFAULT 1.00, -- Points earned per euro spent
    minimum_points_redemption INTEGER DEFAULT 100,
    point_value DECIMAL(5,4) DEFAULT 0.01, -- Euro value per point
    
    -- Tier configuration
    tier_thresholds JSONB DEFAULT '{}', -- {"bronze": 0, "silver": 1000, "gold": 5000}
    tier_benefits JSONB DEFAULT '{}', -- Benefits for each tier
    
    -- Program rules
    points_expiry_months INTEGER DEFAULT 24,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer loyalty points and transactions
CREATE TABLE public.customer_loyalty_points (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    program_id UUID REFERENCES public.loyalty_programs(id) NOT NULL,
    
    -- Points transaction
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'redeemed', 'expired', 'adjusted')),
    points_amount INTEGER NOT NULL, -- Can be negative for redemptions
    points_balance INTEGER NOT NULL, -- Running balance
    
    -- Transaction details
    order_id UUID REFERENCES public.orders(id), -- If related to an order
    description TEXT NOT NULL,
    reference_id TEXT, -- External reference
    
    -- Expiry tracking
    expires_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer credit limits and payment terms (B2B)
CREATE TABLE public.customer_credit_accounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Credit configuration
    credit_limit DECIMAL(12,2) NOT NULL DEFAULT 0,
    available_credit DECIMAL(12,2) NOT NULL DEFAULT 0,
    used_credit DECIMAL(12,2) NOT NULL DEFAULT 0,
    
    -- Payment terms
    payment_terms_days INTEGER DEFAULT 30,
    early_payment_discount DECIMAL(5,2) DEFAULT 0, -- Percentage discount for early payment
    late_payment_fee DECIMAL(5,2) DEFAULT 0, -- Percentage fee for late payment
    
    -- Account status
    account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'closed')),
    credit_hold BOOLEAN DEFAULT false,
    credit_hold_reason TEXT,
    
    -- Risk assessment
    credit_rating TEXT CHECK (credit_rating IN ('excellent', 'good', 'fair', 'poor', 'high_risk')),
    risk_notes TEXT,
    last_credit_review TIMESTAMPTZ,
    next_credit_review TIMESTAMPTZ,
    
    -- Guarantees
    guarantee_amount DECIMAL(12,2) DEFAULT 0,
    guarantee_type TEXT, -- "bank_guarantee", "insurance", "deposit"
    guarantee_reference TEXT,
    guarantee_expiry TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(customer_id)
);

-- Customer payment history and outstanding balances
CREATE TABLE public.customer_invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    order_id UUID REFERENCES public.orders(id),
    
    -- Invoice details
    invoice_number TEXT UNIQUE NOT NULL,
    invoice_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    due_date TIMESTAMPTZ NOT NULL,
    
    -- Amounts
    subtotal DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    paid_amount DECIMAL(12,2) DEFAULT 0,
    outstanding_amount DECIMAL(12,2) NOT NULL,
    
    -- Payment status
    payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'overdue', 'cancelled')),
    
    -- Payment tracking
    payment_reference TEXT,
    paid_at TIMESTAMPTZ,
    
    -- Late payment handling
    days_overdue INTEGER DEFAULT 0,
    late_fees_applied DECIMAL(10,2) DEFAULT 0,
    
    -- Notes
    notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer segmentation for marketing
CREATE TABLE public.customer_segments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name JSONB NOT NULL, -- Multi-language names
    description JSONB,
    
    -- Segmentation criteria
    criteria JSONB NOT NULL, -- Complex criteria object
    
    -- Auto-update configuration
    is_dynamic BOOLEAN DEFAULT true, -- Auto-update based on criteria
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    
    -- Marketing preferences
    default_discount_percentage DECIMAL(5,2) DEFAULT 0,
    priority_level INTEGER DEFAULT 1, -- 1-5 scale
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Many-to-many relationship for customer segments
CREATE TABLE public.customer_segment_memberships (
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    segment_id UUID REFERENCES public.customer_segments(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    
    PRIMARY KEY (customer_id, segment_id)
);

-- Customer wishlist
CREATE TABLE public.customer_wishlists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    product_variant_id UUID REFERENCES public.product_variants(id) ON DELETE CASCADE,
    
    -- Wishlist details
    priority INTEGER DEFAULT 1 CHECK (priority >= 1 AND priority <= 5),
    notes TEXT,
    quantity_desired INTEGER DEFAULT 1,
    
    -- Notifications
    notify_when_available BOOLEAN DEFAULT true,
    notify_when_on_sale BOOLEAN DEFAULT true,
    target_price DECIMAL(10,2), -- Notify when price drops below this
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(customer_id, product_id, product_variant_id)
);

-- Indexes for performance
CREATE INDEX idx_customer_addresses_customer_id ON public.customer_addresses(customer_id);
CREATE INDEX idx_customer_addresses_type ON public.customer_addresses(type);
CREATE INDEX idx_customer_addresses_is_default ON public.customer_addresses(is_default);

CREATE INDEX idx_customer_interactions_customer_id ON public.customer_interactions(customer_id);
CREATE INDEX idx_customer_interactions_staff_user_id ON public.customer_interactions(staff_user_id);
CREATE INDEX idx_customer_interactions_type ON public.customer_interactions(interaction_type);
CREATE INDEX idx_customer_interactions_status ON public.customer_interactions(status);
CREATE INDEX idx_customer_interactions_created_at ON public.customer_interactions(created_at);

CREATE INDEX idx_customer_loyalty_points_customer_id ON public.customer_loyalty_points(customer_id);
CREATE INDEX idx_customer_loyalty_points_program_id ON public.customer_loyalty_points(program_id);
CREATE INDEX idx_customer_loyalty_points_expires_at ON public.customer_loyalty_points(expires_at);

CREATE INDEX idx_customer_invoices_customer_id ON public.customer_invoices(customer_id);
CREATE INDEX idx_customer_invoices_order_id ON public.customer_invoices(order_id);
CREATE INDEX idx_customer_invoices_payment_status ON public.customer_invoices(payment_status);
CREATE INDEX idx_customer_invoices_due_date ON public.customer_invoices(due_date);
CREATE INDEX idx_customer_invoices_invoice_number ON public.customer_invoices(invoice_number);

CREATE INDEX idx_customer_wishlists_customer_id ON public.customer_wishlists(customer_id);
CREATE INDEX idx_customer_wishlists_product_id ON public.customer_wishlists(product_id);

-- Triggers
CREATE TRIGGER update_customer_addresses_updated_at BEFORE UPDATE ON public.customer_addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_preferences_updated_at BEFORE UPDATE ON public.customer_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_interactions_updated_at BEFORE UPDATE ON public.customer_interactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_loyalty_programs_updated_at BEFORE UPDATE ON public.loyalty_programs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_credit_accounts_updated_at BEFORE UPDATE ON public.customer_credit_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_invoices_updated_at BEFORE UPDATE ON public.customer_invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_segments_updated_at BEFORE UPDATE ON public.customer_segments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();