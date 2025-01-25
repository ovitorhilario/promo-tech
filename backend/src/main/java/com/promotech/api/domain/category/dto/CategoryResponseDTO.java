package com.promotech.api.domain.category.dto;

import java.util.UUID;

public record CategoryResponseDTO(UUID id, String name, String description, String tag) {
}
