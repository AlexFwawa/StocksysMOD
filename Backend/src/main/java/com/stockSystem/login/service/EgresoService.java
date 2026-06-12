package com.stockSystem.login.service;

import com.stockSystem.login.dto.MovimientoRequestDTO;
import com.stockSystem.login.entity.Egreso;
import com.stockSystem.login.entity.Producto;
import com.stockSystem.login.entity.Stock;
import com.stockSystem.login.entity.Usuario;
import com.stockSystem.login.repository.EgresoRepository;
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

public class EgresoService {

    private final EgresoRepository egresoRepository;
    private final ProductoRepository productoRepository;
    private final StockRepository stockRepository;
    private final UsuarioRepository usuarioRepository;

    public Egreso crearEgreso(MovimientoRequestDTO dto) {

        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Stock stock = producto.getStock();

        //Validación crítica
        if (stock.getCantidad() < dto.getCantidad()) {
            throw new RuntimeException("Stock insuficiente");
        }

        //Validacion de stock insufiente:
        if (stock.getCantidad() < dto.getCantidad()) {

            throw new RuntimeException(
                    "Stock insuficiente. Disponible: "
                            + stock.getCantidad()
            );
        }

        //Descontar stock
        stock.setCantidad(stock.getCantidad() - dto.getCantidad());

        stockRepository.save(stock);

        //Registrar movimiento
        Egreso egreso = new Egreso();

        egreso.setProducto(producto);
        egreso.setCantidad(dto.getCantidad());
        egreso.setFechaEgreso(LocalDate.now());

        return egresoRepository.save(egreso);
    }

    //registrar el egreso:
    @Transactional

    public void registrarEgreso(
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

        // validar stock
        if (stock.getCantidad() < dto.getCantidad()) {

            throw new RuntimeException(
                    "Stock insuficiente"
            );
        }

        // actualizar stock
        stock.setCantidad(
                stock.getCantidad() -
                        dto.getCantidad()
        );

        stockRepository.save(stock);

        // movimiento
        Egreso egreso = new Egreso();

        egreso.setProducto(producto);

        egreso.setCantidad(dto.getCantidad());

        egreso.setFechaEgreso(LocalDate.now());

        egreso.setUsuario(usuario);

        egresoRepository.save(egreso);
    }
}
