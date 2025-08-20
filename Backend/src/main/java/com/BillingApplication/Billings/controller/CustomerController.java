package com.BillingApplication.Billings.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BillingApplication.Billings.model.Customer;
import com.BillingApplication.Billings.service.CustomerService;

@RestController @RequestMapping("/customers")
public class CustomerController {
    private final CustomerService service; 
    public CustomerController(CustomerService service)
    {
        this.service=service;
    }
    @PostMapping 
    public ResponseEntity<Customer> create(@RequestBody Customer c)
    { 
        return ResponseEntity.ok(service.create(c)); 
    }
    @PutMapping("/{id}") 
    public ResponseEntity<Customer> update(@PathVariable Long id, @RequestBody Customer c)
    { 
        return ResponseEntity.ok(service.update(id,c));
    }
     @DeleteMapping("/{id}") 
     public ResponseEntity<Void> delete(@PathVariable Long id)
     { 
        service.delete(id); return ResponseEntity.noContent().build(); 
    }
  @GetMapping("/{id}") 
  public ResponseEntity<Customer> get(@PathVariable Long id)
  { 
    return ResponseEntity.ok(service.get(id));
 }
  @GetMapping 
  public ResponseEntity<List<Customer>> list()
  { 
    return ResponseEntity.ok(service.list()); 
}
  @GetMapping("/search/name") 
  public ResponseEntity<List<Customer>> searchByName(@RequestParam String q)
  { 
    return ResponseEntity.ok(service.searchByName(q));
 }
  @GetMapping("/search/email") 
  public ResponseEntity<List<Customer>> searchByEmail(@RequestParam String q)
  { 
    return ResponseEntity.ok(service.searchByEmail(q)); 
}


}
