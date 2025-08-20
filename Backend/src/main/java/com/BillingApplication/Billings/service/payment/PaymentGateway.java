package com.BillingApplication.Billings.service.payment;

import java.util.Map;

public interface PaymentGateway {
    /**
     * Create acific details
     * @param amount Amount in smallest currency unit (e.g., cents or paise)
     * @param currency Currency code like INR, USD
     * @param metadata Any extra metadata (invoiceId, customerId)
     * @return Map containing payment details (orderId, checkoutUrl, etc.)
     */
    Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) throws Exception;

    /**
     * Verify webhook/callback from the gateway
     * @param payload Raw payload from gateway
     * @param headers HTTP headers
     * @return boolean indicating valid payment
     */
    boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) throws Exception;
}
