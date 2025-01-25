package com.promotech.api.repositories;

import com.promotech.api.domain.category.Category;
import com.promotech.api.domain.promotion.Promotion;
import com.promotech.api.domain.store.Store;
import com.promotech.api.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PromotionRepository extends JpaRepository<Promotion, UUID> {

    List<Promotion> findByUser(User user);

    List<Promotion> findByStore(Store store);

    List<Promotion> findByCategory(Category category);
}
