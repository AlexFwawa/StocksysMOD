package com.stockSystem.login.repository;

import com.stockSystem.login.entity.Auditoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditoriaRepository
        extends JpaRepository<Auditoria, Long> {
}