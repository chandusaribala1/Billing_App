package com.BillingApplication.Billings.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.BillingApplication.Billings.config.JwtUtil;
import com.BillingApplication.Billings.dto.AuthRequest;
import com.BillingApplication.Billings.dto.AuthResponse;
import com.BillingApplication.Billings.dto.RegisterRequest;
import com.BillingApplication.Billings.model.Customer;
import com.BillingApplication.Billings.model.User;
import com.BillingApplication.Billings.repository.CustomerRepository;
import com.BillingApplication.Billings.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository users;
    private final CustomerRepository customers;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;
    private final AuthenticationManager authManager;

    public AuthService(UserRepository users,
                       CustomerRepository customers,
                       PasswordEncoder encoder,
                       JwtUtil jwt,
                       AuthenticationManager authManager) {
        this.users = users;
        this.customers = customers;
        this.encoder = encoder;
        this.jwt = jwt;
        this.authManager = authManager;
    }
    public AuthResponse register(RegisterRequest req) {
        if (users.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User u = new User();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());
        u.setPassword(encoder.encode(req.getPassword()));
        u.setRole("CUSTOMER");
        users.save(u);

        Customer c = new Customer();
        c.setName(req.getUsername());
        c.setEmail(req.getEmail());
        c.setPhone(req.getPhone());
        c.setAddress(req.getAddress());
        c.setDateofbirth(req.getDateofbirth());
        c.setCountry(req.getCountry());
        customers.save(c);
        String token = jwt.generateToken(u.getEmail());
        return new AuthResponse(token, u.getRole(), u.getId());
    }

    public AuthResponse login(AuthRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        User u = users.findByEmail(req.getEmail()).orElseThrow();
        String token = jwt.generateToken(u.getEmail());
        return new AuthResponse(token, u.getRole(), u.getId());
    }

    public User assignRole(Long userId, String role) {
        User user = users.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (!role.equalsIgnoreCase("CUSTOMER") && !role.equalsIgnoreCase("ACCOUNTANT")) {
            throw new RuntimeException("Invalid role");
        }
        user.setRole(role.toUpperCase());
        return users.save(user);
    }
    public Optional<User> findByEmail(String email) {
    return users.findByEmail(email);
}
}
