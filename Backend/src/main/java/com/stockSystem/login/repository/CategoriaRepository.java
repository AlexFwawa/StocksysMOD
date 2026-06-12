package com.stockSystem.login.repository;

import com.stockSystem.login.entity.Categoria;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {}

