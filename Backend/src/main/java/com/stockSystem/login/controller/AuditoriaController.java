package com.stockSystem.login.controller;

import com.stockSystem.login.dto.AuditoriaResponseDTO;
import com.stockSystem.login.service.AuditoriaService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditoria")
@RequiredArgsConstructor

public class AuditoriaController {

    private final AuditoriaService auditoriaService;

    @GetMapping

    @PreAuthorize("isAuthenticated()")

    public ResponseEntity<List<AuditoriaResponseDTO>>
    obtenerAuditorias() {

        return ResponseEntity.ok(
                auditoriaService.obtenerAuditorias()
        );
    }
}
