package com.stockSystem.login.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stock")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_stock")
    private Long idStock;

    @Column(nullable = false)
    private Double cantidad;
}
