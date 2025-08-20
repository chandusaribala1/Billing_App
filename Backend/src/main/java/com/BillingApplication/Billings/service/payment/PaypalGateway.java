package com.BillingApplication.Billings.service.payment;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service("paypal")
public class PaypalGateway implements PaymentGateway {

    @Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) {
        Map<String, Object> response = new HashMap<>();
        response.put("paymentId", "paypal_dummy_id");
        response.put("checkoutUrl", "https://www.paypal.com/checkout?paymentId=dummy");
        return response;
    }

    @Override
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) {
        return true;
    }
}
