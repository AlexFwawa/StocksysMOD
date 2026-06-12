package com.stockSystem.login.controller;

import com.stockSystem.login.dto.DashboardStatsDTO;

import com.stockSystem.login.service.DashboardService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/dashboard")

@RequiredArgsConstructor

public class DashboardController {

    private final DashboardService
            dashboardService;

    @GetMapping("/stats")

    @PreAuthorize("isAuthenticated()")

    public ResponseEntity<DashboardStatsDTO>
    obtenerStats() {

        return ResponseEntity.ok(

                dashboardService.obtenerStats()
        );
    }
}