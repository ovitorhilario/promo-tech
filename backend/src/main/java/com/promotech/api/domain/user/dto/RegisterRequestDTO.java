package com.promotech.api.domain.user.dto;

public record RegisterRequestDTO(String username, String password, String full_name, String email) {
}