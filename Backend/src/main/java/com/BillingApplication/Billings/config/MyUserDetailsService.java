package com.BillingApplication.Billings.config;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.BillingApplication.Billings.model.User;
import com.BillingApplication.Billings.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepository repo;

    public MyUserDetailsService(UserRepository repo) {
        this.repo = repo;
    }

  @Override
public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
    User u = repo.findByUsername(usernameOrEmail)
                 .orElse(repo.findByEmail(usernameOrEmail)
                 .orElseThrow(() -> new UsernameNotFoundException("User not found: " + usernameOrEmail)));

    return org.springframework.security.core.userdetails.User.builder()
            .username(u.getUsername())
            .password(u.getPassword())
            .authorities(u.getRole())
            .build();
}

}
