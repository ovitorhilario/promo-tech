ALTER TABLE promotion
ADD CONSTRAINT fk_promotion_store FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_promotion_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_promotion_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;