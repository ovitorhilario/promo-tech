CREATE TABLE promotion (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL,
    price REAL NOT NULL,
    img_url VARCHAR(2048) NOT NULL,
    link_url VARCHAR(2048) NOT NULL,

    is_expired BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    store_id UUID,
    category_id UUID,
    user_id UUID
);