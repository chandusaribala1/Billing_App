package com.BillingApplication.Billings.config;

import java.io.IOException;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil; 
    private final MyUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, MyUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil; 
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) 
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization"); 
        String token = null; 
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7); 
            try {
                username = jwtUtil.extractUsername(token);
            } catch (Exception ignored) {}
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails ud = userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validate(token)) {
                    var authorities = ud.getAuthorities().stream()
                                        .map(a -> new SimpleGrantedAuthority(a.getAuthority().replace("ROLE_", "")))
                                        .collect(Collectors.toList());

                    UsernamePasswordAuthenticationToken auth = 
                        new UsernamePasswordAuthenticationToken(ud, null, authorities);

                    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (Exception ex) {
                System.out.println("User not found or JWT invalid: " + ex.getMessage());
            }
        }

        chain.doFilter(request, response);
    }
}
