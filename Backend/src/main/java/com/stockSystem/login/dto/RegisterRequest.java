package com.stockSystem.login.dto;


import jakarta.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RegisterRequest {

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Formato de email inválido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")

    @Size(
            min = 6,
            max = 50,
            message = "La contraseña debe tener entre 6 y 50 caracteres"
    )
    private String password;
}