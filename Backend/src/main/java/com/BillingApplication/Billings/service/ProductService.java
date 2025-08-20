package com.BillingApplication.Billings.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.BillingApplication.Billings.model.Product;
import com.BillingApplication.Billings.repository.ProductRepository;

@Service
public class ProductService {
private final ProductRepository repo; 
public ProductService(ProductRepository repo)
{
    this.repo=repo;
}
public Product create(Product p)
{
    return repo.save(p);
} 
public Product update(Long id, Product p)
{
    Product e=repo.findById(id).orElseThrow();
     e.setName(p.getName()); 
     e.setPrice(p.getPrice()); 
     e.setCategory(p.getCategory());
     return repo.save(e);
}
public void delete(Long id)
{
    repo.deleteById(id);
}
 public Product get(Long id)
 {
    return repo.findById(id).orElseThrow();
}
 public List<Product> list()
 {
    return repo.findAll();
} 
public List<Product> search(String q)
{
    return repo.findByNameContainingIgnoreCase(q);
}
}
