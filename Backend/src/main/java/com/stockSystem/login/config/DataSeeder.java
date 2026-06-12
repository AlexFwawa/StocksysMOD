package com.stockSystem.login.config;

import com.stockSystem.login.entity.Categoria;
import com.stockSystem.login.entity.Rol;
import com.stockSystem.login.entity.Usuario;
import com.stockSystem.login.repository.CategoriaRepository;
import com.stockSystem.login.repository.RolRepository;
import com.stockSystem.login.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private RolRepository roleRepository;
    @Autowired
    private UsuarioRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Value("${spring.app.admin.username}")
    private String adminUsername;
    @Value("${spring.app.admin.password}")
    private String adminPassword;

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        // Crear categorías si no existen
        if (categoriaRepository.count() == 0) {
            List<String> nombres = List.of(
                "Accesorios", "Construcción", "Ferretería", "Indumentaria",
                "Industrial", "Informática", "Mecánica", "Nautica"
            );
            for (String nombre : nombres) {
                Categoria cat = new Categoria();
                cat.setNombre(nombre);
                categoriaRepository.save(cat);
            }
        }

        //Crea el rol
        Rol adminRole = roleRepository.findByNombre("ADMIN").orElseGet(() -> {
            Rol rol = new Rol();
            rol.setNombre("ADMIN");
            return roleRepository.save(rol);
        });

        //Crea el administrador
        userRepository.findByEmail(adminUsername).orElseGet(() -> {
            Usuario admin = new Usuario();
            admin.setEmail(adminUsername);
            admin.setPassword(passwordEncoder.encode(adminPassword));

            //Agrega el rol al administrador
            admin.getRoles().add(adminRole);

            return userRepository.save(admin);
        });
    }
}