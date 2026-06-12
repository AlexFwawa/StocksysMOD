package com.stockSystem.login.controller;

import com.stockSystem.login.dto.MovimientoRequestDTO;
import com.stockSystem.login.service.IngresoService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ingresos")
@RequiredArgsConstructor

public class IngresoController {

    private final IngresoService ingresoService;

    @PostMapping
    public ResponseEntity<String> registrarIngreso(

            @Valid
            @RequestBody MovimientoRequestDTO dto,

            Authentication authentication
    ) {

        ingresoService.registrarIngreso(

                dto,

                authentication.getName()
        );

        return ResponseEntity.ok(
                "Ingreso registrado"
        );
    }
}