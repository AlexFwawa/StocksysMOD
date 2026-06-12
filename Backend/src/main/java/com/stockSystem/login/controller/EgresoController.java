package com.stockSystem.login.controller;

import com.stockSystem.login.dto.MovimientoRequestDTO;
import com.stockSystem.login.service.EgresoService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/egresos")
@RequiredArgsConstructor

public class EgresoController {

    private final EgresoService egresoService;

    @PostMapping
    public ResponseEntity<String> registrarEgreso(

            @Valid
            @RequestBody MovimientoRequestDTO dto,

            Authentication authentication
    ) {

        egresoService.registrarEgreso(

                dto,

                authentication.getName()
        );

        return ResponseEntity.ok(
                "Egreso registrado"
        );
    }
}