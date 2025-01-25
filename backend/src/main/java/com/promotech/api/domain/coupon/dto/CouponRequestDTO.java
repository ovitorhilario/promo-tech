package com.promotech.api.domain.coupon.dto;

import java.util.UUID;

public record CouponRequestDTO(String title, String description, String code, String link_url, UUID store_id) {
}