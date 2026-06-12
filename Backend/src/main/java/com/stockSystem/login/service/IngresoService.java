package com.stockSystem.login.service;

import com.stockSystem.login.dto.MovimientoRequestDTO;
import com.stockSystem.login.entity.Ingreso;
import com.stockSystem.login.entity.Producto;
import com.stockSystem.login.entity.Stock;
import com.stockSystem.login.entity.Usuario;
import com.stockSystem.login.repository.IngresoRepository;
import com.stockSystem.login.repository.ProductoRepository;
import com.stockSystem.login.repository.StockRepository;
import com.stockSystem.login.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional

public class IngresoService {

    private final IngresoRepository ingresoRepository;
    private final ProductoRepository productoRepository;
    private final StockRepository stockRepository;
    private final UsuarioRepository usuarioRepository;

    public void registrarIngreso(
            MovimientoRequestDTO dto,
            String email
    ) {

        Producto producto = productoRepository
                .findById(dto.getProductoId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Producto no encontrado"
                        )
                );

        Usuario usuario = usuarioRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuario no encontrado"
                        )
                );

        Stock stock = producto.getStock();

        stock.setCantidad(
                stock.getCantidad() +
                        dto.getCantidad()
        );

        stockRepository.save(stock);

        Ingreso ingreso = new Ingreso();

        ingreso.setProducto(producto);
        ingreso.setCantidad(dto.getCantidad());
        ingreso.setFechaIngreso(LocalDate.now());
        ingreso.setUsuario(usuario);

        ingresoRepository.save(ingreso);
    }
}