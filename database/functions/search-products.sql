-- =============================================
-- Advanced Product Search Function
-- Supports multi-language, fuzzy matching, and filtering
-- =============================================

CREATE OR REPLACE FUNCTION advanced_product_search(
    search_query TEXT DEFAULT NULL,
    category_ids UUID[] DEFAULT NULL,
    brand_ids UUID[] DEFAULT NULL,
    price_min DECIMAL DEFAULT NULL,
    price_max DECIMAL DEFAULT NULL,
    customer_id UUID DEFAULT NULL,
    language_code TEXT DEFAULT 'es',
    sort_by TEXT DEFAULT 'relevance', -- 'relevance', 'price_asc', 'price_desc', 'name', 'newest'
    in_stock_only BOOLEAN DEFAULT FALSE,
    page_size INTEGER DEFAULT 20,
    page_number INTEGER DEFAULT 1
)
RETURNS TABLE (
    id UUID,
    sku TEXT,
    name JSONB,
    short_description JSONB,
    category_id UUID,
    category_name JSONB,
    brand_id UUID,
    brand_name TEXT,
    base_price DECIMAL(10,2),
    customer_price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    stock_status TEXT,
    stock_quantity INTEGER,
    featured_image_url TEXT,
    gallery_images TEXT[],
    slug TEXT,
    tags TEXT[],
    avg_rating DECIMAL(3,2),
    review_count INTEGER,
    relevance_score REAL,
    total_count INTEGER
) AS $$
DECLARE
    offset_count INTEGER;
    search_terms TEXT[];
    base_query TEXT;
    where_conditions TEXT[];
    order_clause TEXT;
    total_query TEXT;
    total_results INTEGER;
BEGIN
    -- Calculate offset
    offset_count := (page_number - 1) * page_size;
    
    -- Prepare search terms
    IF search_query IS NOT NULL AND search_query != '' THEN
        search_terms := string_to_array(lower(unaccent(search_query)), ' ');
    END IF;
    
    -- Build base query
    base_query := '
        SELECT DISTINCT
            p.id,
            p.sku,
            p.name,
            p.short_description,
            p.category_id,
            pc.name as category_name,
            p.brand_id,
            pb.name as brand_name,
            p.base_price,
            get_customer_price(p.id, $' || (10 + array_length(coalesce(search_terms, '{}'), 1)) || ') as customer_price,
            p.sale_price,
            p.stock_status,
            p.stock_quantity,
            p.featured_image_url,
            p.gallery_images,
            p.slug,
            COALESCE(
                ARRAY(
                    SELECT pt.name->>''' || language_code || '''
                    FROM public.product_tag_relationships ptr
                    JOIN public.product_tags pt ON ptr.tag_id = pt.id
                    WHERE ptr.product_id = p.id
                ), ARRAY[]::TEXT[]
            ) as tags,
            COALESCE(stats.avg_rating, 0) as avg_rating,
            COALESCE(stats.review_count, 0) as review_count
        FROM public.products p
        LEFT JOIN public.product_categories pc ON p.category_id = pc.id
        LEFT JOIN public.product_brands pb ON p.brand_id = pb.id
        LEFT JOIN (
            SELECT 
                pr.product_id,
                ROUND(AVG(pr.rating), 2) as avg_rating,
                COUNT(*) as review_count
            FROM public.product_reviews pr
            WHERE pr.status = ''approved''
            GROUP BY pr.product_id
        ) stats ON p.id = stats.product_id
    ';
    
    -- Build WHERE conditions
    where_conditions := ARRAY['p.status = ''active'''];
    where_conditions := array_append(where_conditions, 'p.visibility IN (''visible'', ''catalog'', ''search'')');
    
    -- Add search condition
    IF search_query IS NOT NULL AND search_query != '' THEN
        where_conditions := array_append(where_conditions, 
            '(p.name::text ILIKE ''%'' || $1 || ''%'' OR ' ||
            'p.sku ILIKE ''%'' || $1 || ''%'' OR ' ||
            'p.description::text ILIKE ''%'' || $1 || ''%'' OR ' ||
            'p.short_description::text ILIKE ''%'' || $1 || ''%'')'
        );
    END IF;
    
    -- Add category filter
    IF category_ids IS NOT NULL THEN
        where_conditions := array_append(where_conditions, 'p.category_id = ANY($2)');
    END IF;
    
    -- Add brand filter
    IF brand_ids IS NOT NULL THEN
        where_conditions := array_append(where_conditions, 'p.brand_id = ANY($3)');
    END IF;
    
    -- Add price filters
    IF price_min IS NOT NULL THEN
        where_conditions := array_append(where_conditions, 'get_customer_price(p.id, $' || (10 + array_length(coalesce(search_terms, '{}'), 1)) || ') >= $4');
    END IF;
    
    IF price_max IS NOT NULL THEN
        where_conditions := array_append(where_conditions, 'get_customer_price(p.id, $' || (10 + array_length(coalesce(search_terms, '{}'), 1)) || ') <= $5');
    END IF;
    
    -- Add stock filter
    IF in_stock_only THEN
        where_conditions := array_append(where_conditions, 'p.stock_status = ''in_stock'' AND p.stock_quantity > 0');
    END IF;
    
    -- Build ORDER BY clause
    CASE sort_by
        WHEN 'price_asc' THEN
            order_clause := 'ORDER BY get_customer_price(p.id, $' || (10 + array_length(coalesce(search_terms, '{}'), 1)) || ') ASC, p.name->>''' || language_code || ''' ASC';
        WHEN 'price_desc' THEN
            order_clause := 'ORDER BY get_customer_price(p.id, $' || (10 + array_length(coalesce(search_terms, '{}'), 1)) || ') DESC, p.name->>''' || language_code || ''' ASC';
        WHEN 'name' THEN
            order_clause := 'ORDER BY p.name->>''' || language_code || ''' ASC';
        WHEN 'newest' THEN
            order_clause := 'ORDER BY p.created_at DESC';
        ELSE -- relevance
            IF search_query IS NOT NULL AND search_query != '' THEN
                order_clause := 'ORDER BY (
                    (CASE WHEN p.name::text ILIKE ''%'' || $1 || ''%'' THEN 3.0 ELSE 0.0 END) +
                    (CASE WHEN p.sku ILIKE ''%'' || $1 || ''%'' THEN 2.5 ELSE 0.0 END) +
                    (CASE WHEN p.description::text ILIKE ''%'' || $1 || ''%'' THEN 1.5 ELSE 0.0 END) +
                    (CASE WHEN p.featured THEN 1.0 ELSE 0.0 END) +
                    (COALESCE(stats.avg_rating, 0) * 0.2)
                ) DESC, p.featured DESC, p.created_at DESC';
            ELSE
                order_clause := 'ORDER BY p.featured DESC, COALESCE(stats.avg_rating, 0) DESC, p.created_at DESC';
            END IF;
    END CASE;
    
    -- Get total count first
    total_query := 'SELECT COUNT(DISTINCT p.id) FROM public.products p ' ||
                   'LEFT JOIN public.product_categories pc ON p.category_id = pc.id ' ||
                   'LEFT JOIN public.product_brands pb ON p.brand_id = pb.id ' ||
                   'WHERE ' || array_to_string(where_conditions, ' AND ');
    
    -- Execute total count query
    IF search_query IS NOT NULL THEN
        EXECUTE total_query USING search_query, category_ids, brand_ids, price_min, price_max INTO total_results;
    ELSE
        EXECUTE total_query USING category_ids, brand_ids, price_min, price_max INTO total_results;
    END IF;
    
    -- Build final query with pagination
    base_query := base_query || ' WHERE ' || array_to_string(where_conditions, ' AND ') || 
                  ' ' || order_clause || 
                  ' LIMIT $' || (6 + array_length(coalesce(search_terms, '{}'), 1)) || 
                  ' OFFSET $' || (7 + array_length(coalesce(search_terms, '{}'), 1));
    
    -- Return results with total count
    RETURN QUERY
    SELECT 
        result.*,
        total_results as total_count
    FROM (
        -- Dynamic query execution would go here
        -- For now, return a simplified version
        SELECT DISTINCT
            p.id,
            p.sku,
            p.name,
            p.short_description,
            p.category_id,
            pc.name as category_name,
            p.brand_id,
            pb.name as brand_name,
            p.base_price,
            get_customer_price(p.id, customer_id) as customer_price,
            p.sale_price,
            p.stock_status,
            p.stock_quantity,
            p.featured_image_url,
            p.gallery_images,
            p.slug,
            COALESCE(
                ARRAY(
                    SELECT pt.name->>language_code
                    FROM public.product_tag_relationships ptr
                    JOIN public.product_tags pt ON ptr.tag_id = pt.id
                    WHERE ptr.product_id = p.id
                ), ARRAY[]::TEXT[]
            ) as tags,
            COALESCE(stats.avg_rating, 0) as avg_rating,
            COALESCE(stats.review_count, 0) as review_count,
            CASE 
                WHEN search_query IS NULL OR search_query = '' THEN 1.0
                ELSE (
                    (CASE WHEN p.name::text ILIKE '%' || search_query || '%' THEN 3.0 ELSE 0.0 END) +
                    (CASE WHEN p.sku ILIKE '%' || search_query || '%' THEN 2.5 ELSE 0.0 END) +
                    (CASE WHEN p.description::text ILIKE '%' || search_query || '%' THEN 1.5 ELSE 0.0 END) +
                    (CASE WHEN p.featured THEN 1.0 ELSE 0.0 END) +
                    (COALESCE(stats.avg_rating, 0) * 0.2)
                )
            END as relevance_score
        FROM public.products p
        LEFT JOIN public.product_categories pc ON p.category_id = pc.id
        LEFT JOIN public.product_brands pb ON p.brand_id = pb.id
        LEFT JOIN (
            SELECT 
                pr.product_id,
                ROUND(AVG(pr.rating), 2) as avg_rating,
                COUNT(*) as review_count
            FROM public.product_reviews pr
            WHERE pr.status = 'approved'
            GROUP BY pr.product_id
        ) stats ON p.id = stats.product_id
        WHERE 
            p.status = 'active'
            AND p.visibility IN ('visible', 'catalog', 'search')
            AND (search_query IS NULL OR search_query = '' OR (
                p.name::text ILIKE '%' || search_query || '%' OR
                p.sku ILIKE '%' || search_query || '%' OR
                p.description::text ILIKE '%' || search_query || '%'
            ))
            AND (category_ids IS NULL OR p.category_id = ANY(category_ids))
            AND (brand_ids IS NULL OR p.brand_id = ANY(brand_ids))
            AND (price_min IS NULL OR get_customer_price(p.id, customer_id) >= price_min)
            AND (price_max IS NULL OR get_customer_price(p.id, customer_id) <= price_max)
            AND (NOT in_stock_only OR (p.stock_status = 'in_stock' AND p.stock_quantity > 0))
        ORDER BY 
            CASE 
                WHEN sort_by = 'price_asc' THEN get_customer_price(p.id, customer_id)
                ELSE NULL
            END ASC,
            CASE 
                WHEN sort_by = 'price_desc' THEN get_customer_price(p.id, customer_id)
                ELSE NULL
            END DESC,
            CASE 
                WHEN sort_by = 'name' THEN p.name->>language_code
                ELSE NULL
            END ASC,
            CASE 
                WHEN sort_by = 'newest' THEN p.created_at
                ELSE NULL
            END DESC,
            -- Default relevance ordering
            CASE 
                WHEN sort_by = 'relevance' OR sort_by IS NULL THEN
                    CASE 
                        WHEN search_query IS NULL OR search_query = '' THEN 1.0
                        ELSE (
                            (CASE WHEN p.name::text ILIKE '%' || search_query || '%' THEN 3.0 ELSE 0.0 END) +
                            (CASE WHEN p.sku ILIKE '%' || search_query || '%' THEN 2.5 ELSE 0.0 END) +
                            (CASE WHEN p.description::text ILIKE '%' || search_query || '%' THEN 1.5 ELSE 0.0 END) +
                            (CASE WHEN p.featured THEN 1.0 ELSE 0.0 END) +
                            (COALESCE(stats.avg_rating, 0) * 0.2)
                        )
                    END
                ELSE NULL
            END DESC,
            p.featured DESC,
            p.created_at DESC
        LIMIT page_size
        OFFSET offset_count
    ) result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;