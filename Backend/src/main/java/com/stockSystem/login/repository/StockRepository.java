package com.stockSystem.login.repository;

import com.stockSystem.login.entity.Stock;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long>{

}

