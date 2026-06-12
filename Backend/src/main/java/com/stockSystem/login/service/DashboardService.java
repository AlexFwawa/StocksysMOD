package com.stockSystem.login.service;

import com.stockSystem.login.dto.DashboardStatsDTO;

import com.stockSystem.login.entity.Producto;

import com.stockSystem.login.repository.*;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service

@RequiredArgsConstructor

public class DashboardService {

    private final ProductoRepository
            productoRepository;

    private final IngresoRepository
            ingresoRepository;

    private final EgresoRepository
            egresoRepository;

    public DashboardStatsDTO obtenerStats() {

        List<Producto> productos =
                productoRepository.findAll();

        // total productos
        long totalProductos =
                productos.size();

        // stock total
        double stockTotal = productos.stream()

                .mapToDouble(
                        p -> p.getStock()
                                .getCantidad()
                )
                .sum();

        // stock bajo
        long stockBajo = productos.stream()

                .filter(
                        p -> p.getStock()
                                .getCantidad() <= 5
                )
                .count();

        // hoy
        LocalDate hoy = LocalDate.now();

        long ingresosHoy =
                ingresoRepository.findAll()

                        .stream()

                        .filter(
                                i -> i.getFechaIngreso()
                                        .equals(hoy)
                        )
                        .count();

        long egresosHoy =
                egresoRepository.findAll()

                        .stream()

                        .filter(
                                e -> e.getFechaEgreso()
                                        .equals(hoy)
                        )
                        .count();

        return new DashboardStatsDTO(

                totalProductos,

                stockTotal,

                ingresosHoy,

                egresosHoy,

                stockBajo
        );
    }
}
