package com.stockSystem.login.controller;

import com.stockSystem.login.dto.LoginRequest;
import com.stockSystem.login.dto.RegisterRequest;
import com.stockSystem.login.service.AuthService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor

public class AuthController {

    private final AuthService authService;

    // Register:
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        authService.register(request);

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "Usuario registrado correctamente"
                )
        );
    }

    // Login:
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request
    ) {

        String token = authService.login(request);

        return ResponseEntity.ok(
                Map.of(
                        "token",
                        token
                )
        );
    }
}
