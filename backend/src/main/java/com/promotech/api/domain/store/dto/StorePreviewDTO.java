package com.promotech.api.domain.store.dto;

import java.util.UUID;

public record StorePreviewDTO(UUID id, String name, String img_url, String tag) {
}