package com.BillingApplication.Billings.model;
import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity @Table(name="customers")
public class Customer {
    
  @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
   private Long id;
  private String name;
   @Column(unique=true) private String email; 
   private String phone;
   private String address;
   private LocalDate dateofbirth;
   private String country;
   public Customer() {
}
   public Customer(Long id, String name, String email, String phone,String address,LocalDate dateofbirth,String country) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address=address;
    this.dateofbirth=dateofbirth;
    this.country=country;
}
   public Long getId() {
    return id;
   }
   public void setId(Long id) {
    this.id = id;
   }
   public String getName() {
    return name;
   }
   public void setName(String name) {
    this.name = name;
   }
   public String getEmail() {
    return email;
   }
   public void setEmail(String email) {
    this.email = email;
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
   public void setAddress(String address) {
      this.address = address;
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
