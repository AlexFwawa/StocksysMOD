package com.stockSystem.login.dto;

import lombok.*;

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class DashboardStatsDTO {

    private Long totalProductos;

    private Double stockTotal;

    private Long ingresosHoy;

    private Long egresosHoy;

    private Long stockBajo;
}