package com.BillingApplication.Billings.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BillingApplication.Billings.model.PasswordResetToken;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
 Optional<PasswordResetToken> findByToken(String token);

}
