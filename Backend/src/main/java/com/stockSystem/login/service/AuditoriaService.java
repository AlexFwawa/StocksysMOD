package com.stockSystem.login.service;

import com.stockSystem.login.dto.AuditoriaResponseDTO;

import java.util.List;

public interface AuditoriaService {

    void registrar(
            String accion,
            String detalle
    );

    List<AuditoriaResponseDTO> obtenerAuditorias();
}