package com.BillingApplication.Billings.service.payment;

import java.util.Map;

public interface PaymentGateway {
    Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) throws Exception;

    boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) throws Exception;
}
