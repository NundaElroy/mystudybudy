package com.mystudybudy.mystudybudy.controller;

import com.mystudybudy.mystudybudy.dtos.ResponseDTO;
import com.mystudybudy.mystudybudy.entity.User;
import com.mystudybudy.mystudybudy.service.UserService;
import com.mystudybudy.mystudybudy.servicesimp.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/api/user")
    private ResponseDTO<?> getUserDetails(@RequestHeader("Authorization") String token, HttpServletRequest request) {
        if(token == null) {
            return new ResponseDTO<>("error", "Token is missing");
        }
        String email = jwtTokenProvider.getEmail(token);
        User user = userService.findByEmail(email);

        return new ResponseDTO<>("success",
                                         user,
                                   null,
                                "request successful",
                                        request.getRequestURI(),
                                     HttpServletResponse.SC_OK);
    }
}
