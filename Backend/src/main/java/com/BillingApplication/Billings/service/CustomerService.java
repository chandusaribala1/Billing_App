package com.BillingApplication.Billings.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.BillingApplication.Billings.dto.CustomerUpdateRequest;
import com.BillingApplication.Billings.model.Customer;
import com.BillingApplication.Billings.repository.CustomerRepository;

import jakarta.transaction.Transactional;
@Service
public class CustomerService {
    private final CustomerRepository repo;
     public CustomerService(CustomerRepository repo)
     {
       this.repo=repo;
    }
  public Customer create(Customer c)
  {
    return repo.save(c);
}
 public Customer update(Long id, Customer c)
 {
    Customer e=repo.findById(id).orElseThrow();
     e.setName(c.getName()); e.setEmail(c.getEmail());
      e.setPhone(c.getPhone()); e.setAddress(c.getAddress());
      e.setDateofbirth(c.getDateofbirth());
      e.setCountry(c.getCountry());
      return repo.save(e);
    }
  public void delete(Long id)
  {
    repo.deleteById(id);
} 
public Customer get(Long id)
{
    return repo.findById(id).orElseThrow();
}
  public List<Customer> list()
  {
    return repo.findAll();
} 
public List<Customer> searchByName(String q)
{
    return repo.findByNameContainingIgnoreCase(q);
}
 public List<Customer> searchByEmail(String q)
 {
    return repo.findByEmailContainingIgnoreCase(q);
}
 @Transactional
    public Customer updateCustomerProfile(Customer customer, CustomerUpdateRequest req) {
        customer.setAddress(req.getAddress());
        customer.setPhone(req.getPhone());
        customer.setDateofbirth(req.getDateofbirth());
        customer.setCountry(req.getCountry());

        return repo.save(customer);
    }

}
