package com.promotech.api.repositories;

import com.promotech.api.domain.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

    Optional<Category> findByTag(String tag);
}
