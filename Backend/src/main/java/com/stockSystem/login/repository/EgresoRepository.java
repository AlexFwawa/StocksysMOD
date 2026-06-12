package com.stockSystem.login.repository;

import com.stockSystem.login.entity.Egreso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EgresoRepository extends JpaRepository<Egreso, Long> {

    void deleteByProductoCodProd(Long codProd);
}