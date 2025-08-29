package com.BillingApplication.Billings.dto;

import java.time.LocalDate;

public class RegisterRequest {
     private String username;
     private String email;
    private String password;
    private String phone;
    private String role;
    private String address;
    private LocalDate dateofbirth;
    private String country;
    public RegisterRequest() {
    }
    public RegisterRequest(String username,String email, String password, String role,String phone,String address,LocalDate dateofbirth,String country) {
        this.username = username;
         this.email = email;
        this.password = password;
        this.role = role;
        this.phone=phone;
        this.address=address;
        this.dateofbirth=dateofbirth;
        this.country=country;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail()
     {
         return email; 
        }
    public void setEmail(String email)
     {
         this.email = email;
     }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }
    public LocalDate getDateofbirth() {
        return dateofbirth;
    }
    public void setDateofbirth(LocalDate dateofbirth) {
        this.dateofbirth = dateofbirth;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    

}
