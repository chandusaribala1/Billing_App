package com.BillingApplication.Billings.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BillingApplication.Billings.dto.PaymentRequest;
import com.BillingApplication.Billings.model.Customer;
import com.BillingApplication.Billings.model.Payment;
import com.BillingApplication.Billings.model.User;
import com.BillingApplication.Billings.repository.CustomerRepository;
import com.BillingApplication.Billings.repository.UserRepository;
import com.BillingApplication.Billings.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final UserRepository users;
    private final CustomerRepository customerRepo;
    private final PaymentService service;

      public PaymentController(PaymentService service,
                             UserRepository users,
                             CustomerRepository customerRepo) {
        this.service = service;
        this.users = users;
        this.customerRepo = customerRepo;
    }
    @PostMapping
    public Payment record(@RequestBody PaymentRequest req) {
        return service.record(req);
    }
    @GetMapping("/invoice/{invoiceId}")
    public List<Payment> byInvoice(@PathVariable Long invoiceId) {
        return service.byInvoice(invoiceId);
    }
    @GetMapping
    public List<Payment> list() {
        return service.list();
    }
    @PostMapping("/external/{gateway}/{invoiceId}")
    public Map<String, Object> createExternal(
            @PathVariable String gateway,
            @PathVariable Long invoiceId,
            @RequestParam("amount") BigDecimal amount,
            @RequestParam("currency") String currency
    ) {
        return service.createExternalPayment(gateway, invoiceId, amount, currency);
    }
   @PostMapping(value = "/external/{gateway}/verify", consumes = "application/json")
public boolean verifyExternal(
        @PathVariable String gateway,
        @RequestBody(required = false) String rawBody,
        @RequestHeader Map<String, String> headers
) throws Exception {
    Map<String, Object> payload;
    if (rawBody == null || rawBody.isBlank()) {
        payload = Map.of();
    } else {
        com.fasterxml.jackson.databind.ObjectMapper om = new com.fasterxml.jackson.databind.ObjectMapper();
        payload = om.readValue(rawBody, new com.fasterxml.jackson.core.type.TypeReference<Map<String, Object>>() {});
        payload.put("rawBody", rawBody);
    }
    return service.verifyExternalPayment(gateway, payload, headers);
}
    @GetMapping("/me")
    public List<Payment> myPayments(@AuthenticationPrincipal UserDetails userDetails) {
        User user = users.findByUsername(userDetails.getUsername())
                         .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Customer customer = customerRepo.findByEmail(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        return service.getPaymentsForCustomer(customer.getId());
    }
}
