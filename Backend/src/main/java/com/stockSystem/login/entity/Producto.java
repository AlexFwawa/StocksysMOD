package com.stockSystem.login.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "producto")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cod_prod")
    private Long codProd;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_stock")
    private Stock stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cat")
    private Categoria categoria;
}