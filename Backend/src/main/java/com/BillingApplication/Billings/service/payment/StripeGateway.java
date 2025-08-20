package com.BillingApplication.Billings.service.payment;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
@Service("stripe")
public class StripeGateway implements PaymentGateway{
    @Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) {
        Map<String, Object> response = new HashMap<>();
        response.put("paymentIntentId", "stripe_dummy_intent");
        response.put("clientSecret", "dummy_client_secret");
        return response;
    }

    @Override
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) {
        return true;
    }
}
