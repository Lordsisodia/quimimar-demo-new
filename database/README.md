# Quimimar Database Structure for Supabase

This folder contains all the database schemas, migrations, and seed data needed to set up the Supabase backend for the Quimimar demo project.

## 📁 Folder Structure

```
database/
├── README.md                 # This file
├── schema/                   # Database table schemas
│   ├── 01_auth.sql          # Authentication and user tables
│   ├── 02_products.sql      # Product catalog tables
│   ├── 03_orders.sql        # Order management tables
│   ├── 04_customers.sql     # Customer management tables
│   ├── 05_inventory.sql     # Inventory tracking tables
│   ├── 06_content.sql       # CMS content tables
│   └── 07_analytics.sql     # Analytics and tracking tables
├── migrations/              # Database migrations
│   ├── 001_initial_setup.sql
│   ├── 002_add_indexes.sql
│   └── 003_add_rls_policies.sql
├── seed/                    # Sample data for development
│   ├── products.sql         # Sample products from Quimxel
│   ├── categories.sql       # Product categories
│   ├── customers.sql        # Sample B2B customers
│   └── content.sql          # CMS content
├── functions/               # Supabase Edge Functions
│   ├── calculate-shipping.sql
│   ├── process-order.sql
│   └── search-products.sql
└── policies/                # Row Level Security policies
    ├── products.sql
    ├── orders.sql
    └── customers.sql
```

## 🚀 Setup Instructions

1. **Create Supabase Project**
   ```bash
   # Initialize Supabase locally
   npx supabase init
   
   # Start local development
   npx supabase start
   ```

2. **Run Schema Migrations**
   ```bash
   # Apply all schemas in order
   npx supabase db reset
   ```

3. **Seed Development Data**
   ```bash
   # Load sample data
   psql -h localhost -p 54322 -d postgres -U postgres -f database/seed/categories.sql
   psql -h localhost -p 54322 -d postgres -U postgres -f database/seed/products.sql
   psql -h localhost -p 54322 -d postgres -U postgres -f database/seed/customers.sql
   ```

## 🔐 Security Features

- Row Level Security (RLS) enabled on all tables
- Role-based access control for B2B vs B2C customers
- Admin panel access restrictions
- API rate limiting configurations

## 📊 Key Features Supported

- **Multi-language product catalog** (Spanish/English)
- **B2B customer management** with special pricing
- **Inventory tracking** with stock alerts
- **Order processing** with status tracking
- **Content management** for dynamic pages
- **Analytics tracking** for business insights
- **Search functionality** with full-text search
- **File storage** for product images and documents

## 🔄 Real-time Features

- Live inventory updates
- Real-time order status changes
- Customer activity tracking
- Admin dashboard notifications

## 🌐 Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📈 Performance Optimizations

- Indexed foreign keys for fast joins
- Materialized views for complex queries
- Connection pooling configuration
- Query optimization guidelines