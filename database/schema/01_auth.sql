-- =============================================
-- Authentication and User Management Schema
-- =============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom user profiles extending Supabase Auth
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    phone TEXT,
    language_preference TEXT DEFAULT 'es' CHECK (language_preference IN ('es', 'en')),
    user_type TEXT DEFAULT 'b2c' CHECK (user_type IN ('b2c', 'b2b', 'admin')),
    
    -- B2B specific fields
    tax_id TEXT, -- CIF/NIF for Spanish companies
    business_type TEXT CHECK (business_type IN ('hosteleria', 'limpieza', 'industria', 'sanitario', 'otros')),
    annual_volume DECIMAL(12,2),
    credit_limit DECIMAL(12,2) DEFAULT 0,
    payment_terms INTEGER DEFAULT 30, -- days
    discount_tier TEXT DEFAULT 'standard' CHECK (discount_tier IN ('standard', 'bronze', 'silver', 'gold', 'platinum')),
    
    -- Address information
    billing_address JSONB, -- Structured address data
    shipping_address JSONB, -- Structured address data
    
    -- Account status
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMPTZ,
    last_order_date TIMESTAMPTZ,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    
    -- Preferences
    marketing_consent BOOLEAN DEFAULT false,
    newsletter_subscription BOOLEAN DEFAULT false,
    price_alerts BOOLEAN DEFAULT false,
    order_notifications BOOLEAN DEFAULT true,
    
    -- Metadata
    notes TEXT, -- Admin notes
    tags TEXT[], -- For segmentation
    referral_source TEXT,
    sales_rep_id UUID REFERENCES public.user_profiles(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users table for enhanced permissions
CREATE TABLE public.admin_users (
    id UUID REFERENCES public.user_profiles(id) PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'sales_manager', 'inventory_manager', 'customer_service')),
    permissions JSONB NOT NULL DEFAULT '{}', -- Specific permissions object
    can_view_analytics BOOLEAN DEFAULT false,
    can_manage_products BOOLEAN DEFAULT false,
    can_manage_orders BOOLEAN DEFAULT false,
    can_manage_customers BOOLEAN DEFAULT false,
    can_export_data BOOLEAN DEFAULT false,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customer sessions for tracking activity
CREATE TABLE public.customer_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id),
    session_token TEXT UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    location JSONB, -- Country, region, city
    pages_visited TEXT[],
    products_viewed UUID[],
    search_queries TEXT[],
    cart_value DECIMAL(10,2),
    session_duration INTEGER, -- seconds
    ended_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Password reset tokens (if using custom auth)
CREATE TABLE public.password_reset_tokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- API keys for B2B integrations
CREATE TABLE public.api_keys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) NOT NULL,
    key_name TEXT NOT NULL,
    api_key TEXT UNIQUE NOT NULL,
    permissions JSONB NOT NULL DEFAULT '{}',
    rate_limit INTEGER DEFAULT 1000, -- requests per hour
    is_active BOOLEAN DEFAULT true,
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_user_type ON public.user_profiles(user_type);
CREATE INDEX idx_user_profiles_company_name ON public.user_profiles(company_name);
CREATE INDEX idx_user_profiles_is_active ON public.user_profiles(is_active);
CREATE INDEX idx_user_profiles_discount_tier ON public.user_profiles(discount_tier);
CREATE INDEX idx_customer_sessions_user_id ON public.customer_sessions(user_id);
CREATE INDEX idx_customer_sessions_created_at ON public.customer_sessions(created_at);
CREATE INDEX idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX idx_api_keys_api_key ON public.api_keys(api_key);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON public.api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();