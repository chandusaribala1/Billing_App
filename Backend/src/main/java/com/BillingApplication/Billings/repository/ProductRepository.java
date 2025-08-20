package com.BillingApplication.Billings.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BillingApplication.Billings.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
 List<Product> findByNameContainingIgnoreCase(String name);
}
