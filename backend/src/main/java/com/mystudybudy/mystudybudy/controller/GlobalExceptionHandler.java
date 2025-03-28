package com.mystudybudy.mystudybudy.controller;

import com.mystudybudy.mystudybudy.dtos.ResponseDTO;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ResponseDTO<?>> handleBadCredentialsException(ExpiredJwtException e, HttpServletRequest request) {
        ResponseDTO<?> response = new ResponseDTO<>(
                "401",
                null,
                "expired jwt token",
                e.getMessage(),
                request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.value()
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
