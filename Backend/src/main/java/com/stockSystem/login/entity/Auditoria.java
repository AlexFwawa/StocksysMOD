package com.stockSystem.login.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "auditoria")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fecha;

    private String accion;

    private String detalle;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
}