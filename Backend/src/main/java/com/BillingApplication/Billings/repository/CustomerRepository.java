package com.BillingApplication.Billings.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BillingApplication.Billings.model.Customer;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
    List<Customer> findByNameContainingIgnoreCase(String name);
  List<Customer> findByEmailContainingIgnoreCase(String email);
  Optional<Customer> findByEmail(String email);

}
