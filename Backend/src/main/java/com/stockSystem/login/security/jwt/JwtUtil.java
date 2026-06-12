package com.stockSystem.login.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    
    private final String SECRET = "clave_super_secreta_del_proyecto_final_sistema_de_Stocks_05_04_2026";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
    private final long EXPIRATION = 1000 *60 *60; //1 hora

    //generar token
    public String generateToken(String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
    //Extraer username
    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }
    //Validar Token
    public boolean isTokenValid(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }
    //Ver si expiro
    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }
    //Obtener datos internos
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
