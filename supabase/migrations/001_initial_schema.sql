-- Enums
CREATE TYPE user_role AS ENUM ('customer', 'vendor', 'admin');
CREATE TYPE booking_status AS ENUM ('pending_payment', 'confirmed', 'dispatched', 'delivered', 'return_pickup_scheduled', 'returned', 'inspection_passed', 'deposit_refunded', 'cancelled');
CREATE TYPE payment_status AS ENUM ('created', 'authorized', 'captured', 'refunded', 'failed');
CREATE TYPE garment_size AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL', 'CUSTOM');
CREATE TYPE garment_gender AS ENUM ('women', 'men', 'unisex');

-- Tables

-- 1. profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role DEFAULT 'customer',
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    body_type TEXT,
    style_preferences JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. categories
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    gender garment_gender,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES categories(id),
    display_order INT DEFAULT 0
);

-- 3. products
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    designer_name TEXT,
    retail_price DECIMAL(10, 2) NOT NULL,
    rental_price_3d DECIMAL(10, 2) NOT NULL,
    rental_price_5d DECIMAL(10, 2) NOT NULL,
    rental_price_7d DECIMAL(10, 2) NOT NULL,
    security_deposit DECIMAL(10, 2) NOT NULL,
    fabric TEXT,
    work_type TEXT,
    color TEXT,
    description TEXT,
    occasion_tags TEXT[],
    images TEXT[],
    sizes TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. product_variants
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL,
    size garment_size NOT NULL,
    measurements JSONB,
    is_available BOOLEAN DEFAULT TRUE
);

-- 5. product_reviews
CREATE TABLE product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    body TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. rental_bookings
CREATE TABLE rental_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES profiles(id),
    status booking_status DEFAULT 'pending_payment',
    rental_start_date DATE NOT NULL,
    rental_end_date DATE NOT NULL,
    duration_days INT NOT NULL,
    rental_fee DECIMAL(10, 2) NOT NULL,
    security_deposit DECIMAL(10, 2) NOT NULL,
    total_payable DECIMAL(10, 2) NOT NULL,
    razorpay_order_id TEXT,
    razorpay_payment_id TEXT,
    shipping_address JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. rental_items
CREATE TABLE rental_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES rental_bookings(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    variant_id UUID REFERENCES product_variants(id),
    rental_price DECIMAL(10, 2) NOT NULL
);

-- 8. rental_accessories
CREATE TABLE rental_accessories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES rental_bookings(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    deposit_amount DECIMAL(10, 2) NOT NULL,
    deposit_status TEXT
);

-- 9. security_deposits
CREATE TABLE security_deposits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES rental_bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'held',
    refund_amount DECIMAL(10, 2),
    razorpay_refund_id TEXT,
    refunded_at TIMESTAMPTZ
);

-- 10. payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES rental_bookings(id) ON DELETE CASCADE,
    razorpay_order_id TEXT NOT NULL,
    razorpay_payment_id TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status payment_status DEFAULT 'created',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. vendors
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    store_name TEXT NOT NULL,
    description TEXT,
    gst_number TEXT,
    bank_details JSONB,
    commission_rate DECIMAL(5, 2) DEFAULT 20.00,
    is_active BOOLEAN DEFAULT FALSE
);

-- 12. vendor_products
CREATE TABLE vendor_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE
);

-- 13. vendor_earnings
CREATE TABLE vendor_earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES rental_bookings(id),
    amount DECIMAL(10, 2) NOT NULL,
    commission DECIMAL(10, 2) NOT NULL,
    payout_status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. wishlist
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 15. addresses
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    label TEXT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE
);

-- 16. ai_stylist_sessions
CREATE TABLE ai_stylist_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    preferences JSONB,
    recommendations JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. user_preferences
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    body_type TEXT,
    preferred_colors TEXT[],
    preferred_occasions TEXT[],
    style_preference TEXT,
    budget_range JSONB
);

-- 18. notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers

-- Auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Prevent double booking (Date overlap check)
CREATE OR REPLACE FUNCTION check_rental_overlap()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM rental_items ri
        JOIN rental_bookings rb ON ri.booking_id = rb.id
        WHERE ri.variant_id = NEW.variant_id
        AND rb.status NOT IN ('cancelled', 'returned', 'inspection_passed', 'deposit_refunded')
        AND (
            (NEW.rental_start_date <= rb.rental_end_date) AND 
            (NEW.rental_end_date >= rb.rental_start_date)
        )
    ) THEN
        RAISE EXCEPTION 'Item variant is already booked for these dates.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- RLS Policies

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_accessories ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_stylist_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Product variants are viewable by everyone" ON product_variants FOR SELECT USING (true);

CREATE POLICY "Users can view own bookings" ON rental_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Vendors can view own details" ON vendors FOR SELECT USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_bookings_user ON rental_bookings(user_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
