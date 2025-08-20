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

import com.BillingApplication.Billings.model.Product;
import com.BillingApplication.Billings.service.ProductService;

@RestController @RequestMapping("/products")
public class ProductController {
private final ProductService service; 
public ProductController(ProductService service)
{
    this.service=service;
}
  @PostMapping 
  public ResponseEntity<Product> create(@RequestBody Product p)
  {
     return ResponseEntity.ok(service.create(p));
     }
  @PutMapping("/{id}") 
  public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product p)
  {
     return ResponseEntity.ok(service.update(id,p));
     }
  @DeleteMapping("/{id}") 
  public ResponseEntity<Void> delete(@PathVariable Long id)
  {
     service.delete(id); return ResponseEntity.noContent().build(); 
    }
  @GetMapping("/{id}") 
  public ResponseEntity<Product> get(@PathVariable Long id)
  {
     return ResponseEntity.ok(service.get(id));
     }
  @GetMapping 
  public ResponseEntity<List<Product>> list()
  {
     return ResponseEntity.ok(service.list()); 
    }
  @GetMapping("/search") 
  public ResponseEntity<List<Product>> search(@RequestParam String q)
  {
     return ResponseEntity.ok(service.search(q)); 
    }
}
