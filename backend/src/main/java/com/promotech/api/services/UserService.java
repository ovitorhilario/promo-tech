package com.promotech.api.services;

import com.promotech.api.domain.user.User;
import com.promotech.api.domain.user.UserRole;
import com.promotech.api.domain.user.dto.LoginRequestDTO;
import com.promotech.api.domain.user.dto.LoginResponseDTO;
import com.promotech.api.domain.user.dto.RegisterRequestDTO;
import com.promotech.api.infra.security.TokenService;
import com.promotech.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;

    @Value("${api.security.admin.password}")
    private String adminPassword;

    public UserService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            TokenService tokenService
    ) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public LoginResponseDTO authenticate(LoginRequestDTO dto) {
        this.createAdminIfNotExists(dto.username());

        var usernamePassword = new UsernamePasswordAuthenticationToken(dto.username(), dto.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateToken((User) auth.getPrincipal());

        return new LoginResponseDTO(token);
    }

    public void register(RegisterRequestDTO dto, UserRole role) throws IllegalArgumentException {
        if (userRepository.findByUsername(dto.username()) != null || dto.username().equalsIgnoreCase("admin")) {
            throw new IllegalArgumentException("Username já em uso.");
        }
        String encryptedPassword = new BCryptPasswordEncoder().encode(dto.password());
        User newUser = new User(dto.username(), encryptedPassword, role, dto.full_name(), dto.email());

        userRepository.save(newUser);
    }

    public void createAdminIfNotExists(String username) {
        if (!username.equals("admin")) return;

        if (userRepository.findByUsername("admin") == null) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(adminPassword);
            User admin = new User("admin", encryptedPassword, UserRole.ADMIN, "Admin", "admin@admin.com");
            userRepository.save(admin);
        }
    }
}
