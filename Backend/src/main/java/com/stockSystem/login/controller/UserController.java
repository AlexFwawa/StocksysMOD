package com.stockSystem.login.controller;

import com.stockSystem.login.dto.UserResponse;
import com.stockSystem.login.entity.Usuario;
import com.stockSystem.login.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor

public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponse getProfile(Authentication authentication) {

        // Spring Security usa email para autentificación:
        String email = authentication.getName();

        Usuario usuario = userService.findByEmail(email);

        return new UserResponse(
                usuario.getIdUsuario(),
                usuario.getEmail(),
                usuario.getRoles()
                        .stream()
                        .map(rol -> rol.getNombre())
                        .collect(Collectors.toSet())
        );
    }
}