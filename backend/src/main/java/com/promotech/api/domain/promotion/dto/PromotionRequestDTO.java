package com.promotech.api.domain.promotion.dto;

import java.util.UUID;

public record PromotionRequestDTO(String title, String description, Float price, String img_url, String link_url, UUID category_id, UUID store_id) {
}