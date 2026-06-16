package com.stockSystem.login.service.impl;

import com.stockSystem.login.entity.Auditoria;
import com.stockSystem.login.entity.Usuario;
import com.stockSystem.login.repository.AuditoriaRepository;
import com.stockSystem.login.service.AuditoriaService;
import com.stockSystem.login.service.UserService;
import com.stockSystem.login.dto.AuditoriaResponseDTO;
import java.util.List;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;


@Service
@RequiredArgsConstructor
public class AuditoriaServiceImpl
        implements AuditoriaService {

    private final AuditoriaRepository auditoriaRepository;
    private final UserService userService;

    @Override
    public void registrar(
            String accion,
            String detalle
    ) {

        Authentication auth =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = auth.getName();

        Usuario usuario =
                userService.findByEmail(email);

        Auditoria auditoria =
                Auditoria.builder()
                        .fecha(LocalDateTime.now())
                        .accion(accion)
                        .detalle(detalle)
                        .usuario(usuario)
                        .build();

        auditoriaRepository.save(auditoria);
    }

    @Override
    public List<AuditoriaResponseDTO> obtenerAuditorias() {

        return auditoriaRepository
                .findAllByOrderByFechaDesc()
                .stream()
                .map(a -> new AuditoriaResponseDTO(
                        a.getId(),
                        a.getFecha(),
                        a.getAccion(),
                        a.getDetalle(),
                        a.getUsuario().getEmail()
                ))
                .toList();
    }
}