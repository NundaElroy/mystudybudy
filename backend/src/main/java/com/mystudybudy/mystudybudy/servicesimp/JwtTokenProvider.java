package com.mystudybudy.mystudybudy.servicesimp;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {


    private final String SECRET_KEY;
    private final long jwtExpirationDate;

    public   JwtTokenProvider(@Value("${jwt.secret.key}") String secretKey, @Value("${jwt.expiration.time}") long jwtExpirationDate) {
        this.SECRET_KEY = secretKey;
        this.jwtExpirationDate = jwtExpirationDate;
    }

    // generate JWT token
    public String generateToken(String email){


        Date currentDate = new Date();

        //7 days
        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);
        String token;
        try {
            token = Jwts.builder()
                    .subject(email)
                    .issuedAt(new Date())
                    .expiration(expireDate)
                    .signWith(key())
                    .compact();
        }catch (Exception e){
            throw  new RuntimeException("Error generating token");
        }

        return token;
    }

    private SecretKey key(){
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        return Keys.hmacShaKeyFor(keyBytes);
    }


    // get username from JWT token
    public String getEmail(String authorizationHeader) {
        // Ensure the Authorization header is valid
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header format.");
        }

        // Remove the 'Bearer ' prefix
        String token = authorizationHeader.substring(7);

        // Parse the JWT and extract the subject (email)
        return Jwts.parser()
                .verifyWith( key())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // validate JWT token
    public boolean validateToken(String token){
        Jwts.parser()
                .verifyWith((SecretKey) key())
                .build()
                .parse(token);

        return true;

    }




}
