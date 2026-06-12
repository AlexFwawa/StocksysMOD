package com.stockSystem.login.service.impl;

import com.stockSystem.login.entity.Usuario;
import com.stockSystem.login.repository.UsuarioRepository;
import com.stockSystem.login.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public Usuario findByEmail(String email) {

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}