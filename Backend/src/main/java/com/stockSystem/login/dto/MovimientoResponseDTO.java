package com.stockSystem.login.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class MovimientoResponseDTO {

    private String tipo;

    private String producto;

    private Double cantidad;

    private String usuario;

    private LocalDate fecha;
}
