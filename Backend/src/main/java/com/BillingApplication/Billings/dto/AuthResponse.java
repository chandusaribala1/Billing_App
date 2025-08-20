package com.BillingApplication.Billings.dto;

public class AuthResponse {
 public AuthResponse(String token, String message, Long id) {
        this.token = token;
        this.message = message;
    }
 private String token;
    private String message;
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public AuthResponse() {
    }
    
}
