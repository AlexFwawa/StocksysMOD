package com.stockSystem.login.service.impl;

import com.stockSystem.login.dto.LoginRequest;
import com.stockSystem.login.dto.RegisterRequest;
import com.stockSystem.login.entity.Rol;
import com.stockSystem.login.entity.Usuario;
import com.stockSystem.login.repository.RolRepository;
import com.stockSystem.login.repository.UsuarioRepository;
import com.stockSystem.login.security.jwt.JwtUtil;
import com.stockSystem.login.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor

public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    // Login
    @Override
    public String login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        return jwtUtil.generateToken(request.getEmail());
    }

    // Register
    @Override
    public void register(RegisterRequest request) {

        // Validar email duplicado
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }

        // Buscar rol por defecto
        Rol rolUsuario = rolRepository.findByNombre("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Rol ROLE_USER no encontrado"));

        // Crear usuario
        Usuario usuario = new Usuario();

        usuario.setEmail(request.getEmail());

        usuario.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        usuario.setActivo(true);

        usuario.setRoles(Set.of(rolUsuario));

        usuarioRepository.save(usuario);
    }
}