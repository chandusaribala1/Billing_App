package com.BillingApplication.Billings.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BillingApplication.Billings.dto.AuthRequest;
import com.BillingApplication.Billings.dto.AuthResponse;
import com.BillingApplication.Billings.dto.RegisterRequest;
import com.BillingApplication.Billings.model.User;
import com.BillingApplication.Billings.service.AuthService;
import com.BillingApplication.Billings.service.PasswordResetService;

@RestController @RequestMapping("/auth")
public class AuthController {
     private final AuthService auth; 
      private final JavaMailSender mailSender;
    private final PasswordResetService resetService;

     public AuthController(AuthService auth, JavaMailSender mailSender, PasswordResetService resetService) {
        this.auth = auth;
        this.mailSender = mailSender;
        this.resetService = resetService;
    }
  @PostMapping("/register") 
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest req)
  { return ResponseEntity.ok(auth.register(req));
 }
  @PostMapping("/login") 
  public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req)
  { 
    return ResponseEntity.ok(auth.login(req)); 
  }
   @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");

        Optional<User> optionalUser = auth.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "If account exists, reset link is sent."));
        }
        String token = resetService.createPasswordResetToken(optionalUser.get());
        String resetUrl = "http://localhost:3000/reset-password?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Reset Your Password");
        message.setText("Click the link to reset your password:\n" + resetUrl);
        mailSender.send(message);

        return ResponseEntity.ok(Map.of("message", "Reset link sent to your email."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> payload) {
        String token = payload.get("token");
        String newPassword = payload.get("newPassword");

        boolean success = resetService.resetPassword(token, newPassword);
        if (!success) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired token."));
        }

        return ResponseEntity.ok(Map.of("message", "Password successfully reset."));
    }
}
