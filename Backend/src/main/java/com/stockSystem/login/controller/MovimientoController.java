package com.stockSystem.login.controller;

import com.stockSystem.login.dto.MovimientoResponseDTO;

import com.stockSystem.login.service.MovimientoService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/movimientos")

@RequiredArgsConstructor

public class MovimientoController {

    private final MovimientoService
            movimientoService;

    @GetMapping

    @PreAuthorize("isAuthenticated()")

    public ResponseEntity<
            List<MovimientoResponseDTO>
            > obtenerMovimientos() {

        return ResponseEntity.ok(

                movimientoService
                        .obtenerMovimientos()
        );
    }
}