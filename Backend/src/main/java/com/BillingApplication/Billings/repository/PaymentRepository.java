package com.BillingApplication.Billings.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BillingApplication.Billings.model.Invoice;
import com.BillingApplication.Billings.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long>{
  List<Payment> findByInvoice(Invoice invoice);
 @Query("select p from Payment p where p.paymentDate between :from and :to")
  List<Payment> findByPaymentDateBetween(@Param("from") LocalDate from, @Param("to") LocalDate to);
}
