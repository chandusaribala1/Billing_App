package com.BillingApplication.Billings.dto;

import java.time.LocalDate;

public class CustomerUpdateRequest {
    private String address;
    private String phone;
    private LocalDate dateofbirth;
    private String country;
    public CustomerUpdateRequest() {
    }
    public CustomerUpdateRequest(String address, String phone, LocalDate dateofbirth, String country) {
        this.address = address;
        this.phone = phone;
        this.dateofbirth = dateofbirth;
        this.country = country;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
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
