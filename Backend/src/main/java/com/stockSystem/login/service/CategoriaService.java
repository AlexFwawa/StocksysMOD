package com.stockSystem.login.service;

import com.stockSystem.login.dto.CategoriaRequestDTO;
import com.stockSystem.login.dto.CategoriaResponseDTO;
import com.stockSystem.login.entity.Categoria;
import com.stockSystem.login.repository.CategoriaRepository;
import com.stockSystem.login.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final ProductoRepository productoRepository;

    public List<CategoriaResponseDTO> obtenerCategorias() {
        return categoriaRepository.findAll().stream()
                .map(cat -> new CategoriaResponseDTO(cat.getIdCat(), cat.getNombre()))
                .collect(Collectors.toList());
    }

    public CategoriaResponseDTO crearCategoria(CategoriaRequestDTO dto) {
        Categoria categoria = new Categoria();
        categoria.setNombre(dto.getNombre());
        Categoria saved = categoriaRepository.save(categoria);
        return new CategoriaResponseDTO(saved.getIdCat(), saved.getNombre());
    }

    @Transactional
    public CategoriaResponseDTO actualizarCategoria(Long id, CategoriaRequestDTO dto) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        categoria.setNombre(dto.getNombre());
        categoriaRepository.save(categoria);
        return new CategoriaResponseDTO(categoria.getIdCat(), categoria.getNombre());
    }

    @Transactional
    public void eliminarCategoria(Long id) {
        if (productoRepository.existsByCategoriaIdCat(id)) {
            throw new RuntimeException("No se puede eliminar la categoría porque tiene productos asociados.");
        }
        categoriaRepository.deleteById(id);
    }
}
