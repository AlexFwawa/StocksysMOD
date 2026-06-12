package com.stockSystem.login.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor

public class ErrorResponse {

    private LocalDateTime timestamp;

    private Integer status;

    private String error;
}
