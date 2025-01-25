package com.promotech.api.services;

import com.promotech.api.domain.category.Category;
import com.promotech.api.domain.promotion.Promotion;
import com.promotech.api.domain.promotion.dto.PromotionRequestDTO;
import com.promotech.api.domain.promotion.dto.PromotionResponseDTO;
import com.promotech.api.domain.promotion.dto.PromotionUpdateDTO;
import com.promotech.api.domain.store.Store;
import com.promotech.api.domain.user.User;
import com.promotech.api.mappers.PromotionMapper;
import com.promotech.api.repositories.PromotionRepository;
import com.promotech.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryService categoryService;
    @Autowired
    private StoreService storeService;

    @Autowired
    private PromotionMapper mapper;

    public Optional<PromotionResponseDTO> create(PromotionRequestDTO dto, User user) throws IllegalArgumentException {
        Category category = categoryService.getById(dto.category_id()).orElseThrow(
                () -> new IllegalArgumentException("Invalid promotion UUID")
        );
        Store store = storeService.getById(dto.store_id()).orElseThrow(
                () -> new IllegalArgumentException("Invalid promotion UUID")
        );

        Promotion promotion = mapper.toEntity(dto);
        promotion.setUser(user);
        promotion.setCategory(category);
        promotion.setStore(store);
        promotion.setIsExpired(false);

        return Optional.ofNullable(mapper.toDto(promotionRepository.save(promotion)));
    }

    public void delete(UUID promotionId, User user) {
        Promotion promotion = promotionRepository.findById(promotionId).orElseThrow();

        if (this.belongsToUser(user, promotion) || user.isAdmin()) {
            promotionRepository.deleteById(promotionId);
        }
    }

    public Optional<PromotionResponseDTO> update(PromotionUpdateDTO dto, UUID promotionId, User user) throws IllegalArgumentException, IllegalAccessException
    {
        Promotion promotion = promotionRepository.findById(promotionId).orElseThrow(
                () -> new IllegalArgumentException("Invalid promotion UUID")
        );
        Category category = categoryService.getById(dto.category_id()).orElseThrow(
                () -> new IllegalArgumentException("Invalid category UUID")
        );
        Store store = storeService.getById(dto.store_id()).orElseThrow(
                () -> new IllegalArgumentException("Invalid store UUID")
        );

        if (!this.belongsToUser(user, promotion)) {
            throw new IllegalAccessException("Promotion don't belongs to user");
        }
        mapper.updateEntityFromDto(dto, promotion);
        promotion.setCategory(category);
        promotion.setStore(store);

        return Optional.ofNullable(mapper.toDto(promotionRepository.save(promotion)));
    }

    public List<PromotionResponseDTO> listAll() {
        return promotionRepository.findAll(sortByCreation())
                .stream().map(mapper::toDto).toList();
    }

    public List<PromotionResponseDTO> listFromUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow();
        return promotionRepository.findByUser(user).stream().map(mapper::toDto).toList();
    }

    private boolean belongsToUser(User user, Promotion promotion) {
        UUID promotionUserId = promotion.getUser().getId();
        return user.getId().equals(promotionUserId);
    }

    private Sort sortByCreation() {
        return Sort.by(Sort.Direction.DESC, "createdAt");
    }
}
