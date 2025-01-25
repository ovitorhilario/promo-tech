CREATE TABLE category (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    tag VARCHAR(100) UNIQUE NOT NULL
);