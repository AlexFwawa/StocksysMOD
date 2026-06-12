package com.stockSystem.login.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "rol")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long idRol;

    @Column(nullable = false, unique = true, length = 50)
    private String nombre;
}
