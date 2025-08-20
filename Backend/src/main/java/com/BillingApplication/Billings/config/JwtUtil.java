package com.BillingApplication.Billings.config;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
@Component
public class JwtUtil {
  @Value("${jwt.secret}") 
  private String secret;
  @Value("${jwt.expiration}") 
  private long expiration;
  private Key getKey()
  {
     return Keys.hmacShaKeyFor(secret.getBytes()); 
  }
  public String generateToken(String username){
    return Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis()+expiration)).signWith(getKey()).compact();
  }
  public String extractUsername(String token)
  { 
    return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody().getSubject(); 
  }
  public boolean validate(String token)
  { 
    try{ Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token); 
        return true;
    }
    catch(Exception e)
    {
        return false;
    }
 }
}
