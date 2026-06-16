package com.stockSystem.login.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class AuditoriaResponseDTO {

    private Long id;

    private LocalDateTime fecha;

    private String accion;

    private String detalle;

    private String usuario;
}
