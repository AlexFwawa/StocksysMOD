package com.stockSystem.login.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor

public class UserResponse {

    private Long idUsuario;

    private String email;

    private Set<String> roles;
}