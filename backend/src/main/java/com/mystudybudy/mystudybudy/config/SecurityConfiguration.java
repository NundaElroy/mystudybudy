package com.mystudybudy.mystudybudy.config;

import com.mystudybudy.mystudybudy.component.CustomOAuth2SuccessHandler;
import com.mystudybudy.mystudybudy.filter.JWTTokenValidator;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration{
    private final JWTTokenValidator jwtTokenValidator;
    private final CustomOAuth2SuccessHandler successHandler;
    private final AuthenticationEntryPoint authenticationEntryPoint;


    public SecurityConfiguration(JWTTokenValidator jwtTokenValidator, CustomOAuth2SuccessHandler successHandler, AuthenticationEntryPoint authenticationEntryPoint) {
        this.jwtTokenValidator = jwtTokenValidator;
        this.successHandler = successHandler;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {

        http
                // Completely disable session management
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .anonymous(anonymous -> anonymous.disable())
                // Disable form login and default security mechanisms
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable())
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/api/**").authenticated()
                                .requestMatchers("/auth/**", "/login/oauth2/code/**", "/oauth2/authorization/**","/login").permitAll() //  Allow OAuth2 login paths without JWT

                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(successHandler) // Handle OAuth success
                )
                .csrf(csrf -> csrf.disable())
                .addFilterBefore(jwtTokenValidator, UsernamePasswordAuthenticationFilter.class)
                .cors(cors -> {
                    cors.configurationSource(corsConfigurationSource());
                })
                .exceptionHandling(ex -> ex.authenticationEntryPoint(authenticationEntryPoint));


        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();
                cfg.setAllowedOrigins(Arrays.asList(
                        "http://localhost:3000",
                        "http://localhost:5173",
                        "http://localhost:4200"));
                cfg.setAllowedMethods(Collections.singletonList("*"));
                cfg.setAllowedHeaders(Collections.singletonList("*"));
                cfg.setExposedHeaders(Arrays.asList("Authorization"));
                cfg.setAllowCredentials(true);
                cfg.setMaxAge(3600L);

                return cfg;

            }
        };
    }
}

