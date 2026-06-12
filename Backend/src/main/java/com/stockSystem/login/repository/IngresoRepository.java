package com.stockSystem.login.repository;

import com.stockSystem.login.entity.Ingreso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngresoRepository extends JpaRepository<Ingreso, Long> {

    void deleteByProductoCodProd(Long codProd);
}
