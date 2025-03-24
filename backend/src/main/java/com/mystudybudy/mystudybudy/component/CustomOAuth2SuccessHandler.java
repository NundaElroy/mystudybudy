package com.mystudybudy.mystudybudy.component;

import com.mystudybudy.mystudybudy.entity.User;
import com.mystudybudy.mystudybudy.repo.UserRepository;
import com.mystudybudy.mystudybudy.servicesimp.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtService;

    public CustomOAuth2SuccessHandler(UserRepository userRepository, JwtTokenProvider jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        // Check if user exists, if not, save them
        userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = new User(email, name, picture);
            return userRepository.save(newUser);
        });

        // Generate JWT
        String jwt = jwtService.generateToken(email);

        // Send JWT as response
        response.setContentType("application/json");
        response.getWriter().write("{\"token\": \"" + jwt + "\"}");
        response.getWriter().flush();
    }
}

