package com.promotech.api.domain.store.dto;

import java.time.Instant;
import java.util.UUID;

public record StoreResponseDTO(UUID id, String name, String description, Instant created_at, Instant updated_at, String img_url, String link_url, String tag) {
}