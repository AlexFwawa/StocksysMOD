package com.stockSystem.login.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "egresos")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Egreso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_egreso")
    private Long idEgreso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cod_prod")
    private Producto producto;

    @Column(nullable = false)
    private Double cantidad;

    @Column(name = "fecha_egreso")
    private LocalDate fechaEgreso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;
}
