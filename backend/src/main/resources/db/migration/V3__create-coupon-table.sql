CREATE TABLE coupon (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL,
    code VARCHAR(100) NOT NULL,
    link_url VARCHAR(2048) NOT NULL,

    is_expired BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    store_id UUID,
    user_id UUID
);