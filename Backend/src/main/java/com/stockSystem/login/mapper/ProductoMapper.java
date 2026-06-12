package com.stockSystem.login.mapper;

import com.stockSystem.login.dto.ProductoResponseDTO;
import com.stockSystem.login.entity.Producto;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductoMapper {

    @Mapping(source = "stock.cantidad", target = "stock")
    @Mapping(source = "categoria.nombre", target = "categoria")
    ProductoResponseDTO toDTO(Producto producto);
}