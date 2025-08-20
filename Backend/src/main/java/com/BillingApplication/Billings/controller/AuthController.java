package com.BillingApplication.Billings.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BillingApplication.Billings.dto.AuthRequest;
import com.BillingApplication.Billings.dto.AuthResponse;
import com.BillingApplication.Billings.dto.RegisterRequest;
import com.BillingApplication.Billings.service.AuthService;

@RestController @RequestMapping("/auth")
public class AuthController {
     private final AuthService auth; 
     public AuthController(AuthService auth){this.auth=auth;}
  @PostMapping("/register") 
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req)
  { return ResponseEntity.ok(auth.register(req));
 }
  @PostMapping("/login") 
  public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req)
  { 
    return ResponseEntity.ok(auth.login(req)); 
  }
}
