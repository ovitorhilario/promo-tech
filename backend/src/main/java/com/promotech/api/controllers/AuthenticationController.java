package com.promotech.api.controllers;

import com.promotech.api.domain.user.User;
import com.promotech.api.domain.user.UserRole;
import com.promotech.api.domain.user.dto.LoginRequestDTO;
import com.promotech.api.domain.user.dto.RegisterRequestDTO;
import com.promotech.api.mappers.UserMapper;
import com.promotech.api.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserMapper userMapper;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody @Valid LoginRequestDTO dto) {
        return ResponseEntity.ok(userService.authenticate(dto));
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody @Valid RegisterRequestDTO dto) {
        try {
            userService.register(dto, UserRole.USER);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> registerAdmin(@RequestBody @Valid RegisterRequestDTO dto) {
        try {
            userService.register(dto, UserRole.ADMIN);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/session")
    public ResponseEntity<Object> session(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(userMapper.toDto(user));
    }
}
