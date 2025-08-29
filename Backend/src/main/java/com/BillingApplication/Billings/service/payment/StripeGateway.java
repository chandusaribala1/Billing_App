package com.BillingApplication.Billings.service.payment;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;

@Service("stripe")
public class StripeGateway implements PaymentGateway {

    private final String webhookSecret;

    public StripeGateway(
            @Value("${stripe.secretKey}") String secretKey,
            @Value("${stripe.webhookSecret}") String webhookSecret) {
        Stripe.apiKey = secretKey;
        this.webhookSecret = webhookSecret;
    }

    @Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) throws Exception {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (amount * 100))
                .setCurrency(currency)
                .putMetadata("invoiceId", metadata.get("invoiceId").toString())
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        Map<String, Object> response = new HashMap<>();
        response.put("clientSecret", intent.getClientSecret());
        response.put("paymentId", intent.getId());
        return response;
    }

    @Override
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) throws Exception {
        String rawBody = (payload != null) ? (String) payload.get("rawBody") : null;
        String sigHeader = headers.getOrDefault("Stripe-Signature", headers.get("stripe-signature"));

        if (rawBody == null || sigHeader == null) {
            return false;
        }

        try {
            Event event = Webhook.constructEvent(rawBody, sigHeader, webhookSecret);
            if ("payment_intent.succeeded".equals(event.getType())) {
                return true;
            }
            return true;
        } catch (SignatureVerificationException e) {
            return false;
        }
    }
}
