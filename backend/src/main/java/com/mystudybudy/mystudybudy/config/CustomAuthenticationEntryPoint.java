package com.mystudybudy.mystudybudy.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mystudybudy.mystudybudy.dtos.ResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        // Log the exact type of exception
        logger.error("Authentication Exception Type: " + authException.getClass().getName());
        logger.error("Authentication Exception Message: " + authException.getMessage(), authException);

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ResponseDTO<Object> responseBody = new ResponseDTO<>(
                "error",
                null,
                "Unauthorized",
                authException.getMessage(),
                request.getRequestURI(),
                HttpServletResponse.SC_UNAUTHORIZED
        );

        ObjectMapper objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(responseBody));
    }
}

