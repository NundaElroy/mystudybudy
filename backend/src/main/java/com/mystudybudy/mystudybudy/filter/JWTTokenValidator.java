package com.mystudybudy.mystudybudy.filter;

import com.mystudybudy.mystudybudy.servicesimp.JwtTokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.HandlerExecutionChain;

import java.io.IOException;
import java.util.List;

@Component
public class JWTTokenValidator  extends OncePerRequestFilter {

    private  final JwtTokenProvider jwtTokenProvider;
    private final HandlerExceptionResolver resolver;

    public JWTTokenValidator(JwtTokenProvider jwtTokenProvider, @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.resolver = resolver;
    }

//    private final String SECRET_KEY;
//
//    public JWTTokenValidator(@Value("${jwt.secret.key}") String secretKey) {
//        this.SECRET_KEY = secretKey;
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {


         System.out.println("in the jwt filter ....");
        //Todo:: deal with null exceptions
        String authorizationHeader = request.getHeader("Authorization");
        String token = authorizationHeader.substring(7);//Bearer length is 7

        if (token.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        try{


            jwtTokenProvider.validateToken(token);


            String email = jwtTokenProvider.getEmail(authorizationHeader);
            String authorities = "ROLE_USER";

            List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

            Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);
            SecurityContextHolder.getContext().setAuthentication(authentication);


            filterChain.doFilter(request, response);

        }catch (Exception e){
           resolver.resolveException(request,response,null,e);
        }




    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Only apply this filter to API requests
        return !request.getRequestURI().startsWith("/api/");
    }
}

