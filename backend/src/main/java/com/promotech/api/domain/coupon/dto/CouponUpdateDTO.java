package com.promotech.api.domain.coupon.dto;

import java.util.UUID;

public record CouponUpdateDTO(String title, String description, String code, String link_url, UUID store_id, boolean is_expired) {
}
