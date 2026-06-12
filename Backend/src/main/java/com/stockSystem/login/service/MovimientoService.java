package com.stockSystem.login.service;

import com.stockSystem.login.dto.MovimientoResponseDTO;

import com.stockSystem.login.entity.Egreso;
import com.stockSystem.login.entity.Ingreso;

import com.stockSystem.login.repository.EgresoRepository;
import com.stockSystem.login.repository.IngresoRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service

@RequiredArgsConstructor

public class MovimientoService {

    private final IngresoRepository ingresoRepository;

    private final EgresoRepository egresoRepository;

    public List<MovimientoResponseDTO>
    obtenerMovimientos() {

        List<MovimientoResponseDTO>
                movimientos = new ArrayList<>();

        // ingresos
        List<Ingreso> ingresos =
                ingresoRepository.findAll();

        for (Ingreso ingreso : ingresos) {

            movimientos.add(

                    new MovimientoResponseDTO(

                            "INGRESO",

                            ingreso.getProducto()
                                    .getNombre(),

                            ingreso.getCantidad(),

                            ingreso.getUsuario()
                                    .getEmail(),

                            ingreso.getFechaIngreso()
                    )
            );
        }

        // egresos
        List<Egreso> egresos =
                egresoRepository.findAll();

        for (Egreso egreso : egresos) {

            movimientos.add(

                    new MovimientoResponseDTO(

                            "EGRESO",

                            egreso.getProducto()
                                    .getNombre(),

                            egreso.getCantidad(),

                            egreso.getUsuario()
                                    .getEmail(),

                            egreso.getFechaEgreso()
                    )
            );
        }

        // ordenar fecha descendente:
        movimientos.sort(

                Comparator.comparing(
                        MovimientoResponseDTO::getFecha
                ).reversed()
        );

        return movimientos;
    }
}