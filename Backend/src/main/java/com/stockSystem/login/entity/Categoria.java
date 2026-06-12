package com.stockSystem.login.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categoria")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cat")
    private Long idCat;

    @Column(nullable = false, length = 100)
    private String nombre;
}