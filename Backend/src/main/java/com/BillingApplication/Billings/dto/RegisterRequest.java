package com.BillingApplication.Billings.dto;

public class RegisterRequest {
     private String username;
     private String email;
    private String password;
    private String phone;
    private String role;
    private String address;
    public RegisterRequest() {
    }
    public RegisterRequest(String username,String email, String password, String role,String phone,String address) {
        this.username = username;
         this.email = email;
        this.password = password;
        this.role = role;
        this.phone=phone;
        this.address=address;
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
    

}
