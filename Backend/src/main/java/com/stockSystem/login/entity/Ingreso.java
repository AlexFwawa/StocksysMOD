package com.stockSystem.login.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "ingresos")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Ingreso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingreso")
    private Long idIngreso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cod_prod")
    private Producto producto;

    @Column(nullable = false)
    private Double cantidad;

    @Column(name = "fecha_ingreso")
    private LocalDate fechaIngreso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
}