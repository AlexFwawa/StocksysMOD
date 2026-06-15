package com.stockSystem.login.service;

import com.stockSystem.login.dto.ProductoRequestDTO;
import com.stockSystem.login.dto.ProductoResponseDTO;
import com.stockSystem.login.entity.*;
import com.stockSystem.login.mapper.ProductoMapper;
import com.stockSystem.login.repository.*;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;
    private final StockRepository stockRepository;
    private final IngresoRepository ingresoRepository;
    private final EgresoRepository egresoRepository;
    private final ProductoMapper productoMapper;

    public ProductoResponseDTO crearProducto(ProductoRequestDTO dto) {

        Categoria categoria = categoriaRepository.findById(dto.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        Stock stock = new Stock();
        stock.setCantidad(0.0);

        stockRepository.save(stock);

        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setCategoria(categoria);
        producto.setStock(stock);

        Producto productoGuardado = productoRepository.save(producto);

        return productoMapper.toDTO(productoGuardado);
    }

    public List<ProductoResponseDTO> obtenerProductos() {

        return productoRepository
                .findByActivoTrueOrderByCodProdAsc()
                .stream()
                .map(productoMapper::toDTO)
                .toList();
    }

    @Transactional
    public ProductoResponseDTO actualizarProducto(
            Long id,
            ProductoRequestDTO dto
    ) {

        Producto producto = productoRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Producto no encontrado"
                        )
                );

        // categoria
        Categoria categoria = categoriaRepository
                .findById(dto.getCategoriaId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Categoría no encontrada"
                        )
                );

        // actualizar
        producto.setNombre(dto.getNombre());

        producto.setDescripcion(dto.getDescripcion());

        producto.setCategoria(categoria);

        productoRepository.save(producto);

        return productoMapper.toDTO(producto);
    }

    @Transactional
    public void eliminarProducto(Long id) {

        Producto producto = productoRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Producto no encontrado"
                        )
                );

        producto.setActivo(false);

        productoRepository.save(producto);
    }
}
