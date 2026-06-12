package com.stockSystem.login.service;

import com.stockSystem.login.entity.Usuario;

public interface UserService {

    Usuario findByEmail(String email);
}