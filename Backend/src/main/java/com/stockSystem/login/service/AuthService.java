package com.stockSystem.login.service;

import com.stockSystem.login.dto.LoginRequest;
import com.stockSystem.login.dto.RegisterRequest;

public interface AuthService {
    String login(LoginRequest request);

    void register(RegisterRequest request);
}
