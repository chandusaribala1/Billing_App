package com.BillingApplication.Billings.service.payment;

import java.util.HashMap;
import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service("razorpay")
public class RazorpayGateway implements PaymentGateway {

    private final RazorpayClient client;
    private final String secret;

    public RazorpayGateway(@Value("${razorpay.key}") String keyId,
                           @Value("${razorpay.secret}") String keySecret) throws Exception {
        this.client = new RazorpayClient(keyId, keySecret);
        this.secret = keySecret;
    }

    @Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) throws Exception {
        JSONObject options = new JSONObject();
        options.put("amount", (int) (amount * 100));
        options.put("currency", currency);
        options.put("receipt", "invoice_" + metadata.get("invoiceId"));
        options.put("payment_capture", 1);

        Order order = client.orders.create(options);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        return response;
    }

    @Override
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) throws Exception {
        String orderId = (String) payload.get("razorpay_order_id");
        String paymentId = (String) payload.get("razorpay_payment_id");
        String signature = (String) payload.get("razorpay_signature");

        String data = orderId + "|" + paymentId;
        String generated = hmacSHA256(data, secret);
        return generated.equals(signature);
    }

    private String hmacSHA256(String data, String key) throws Exception {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        return new String(java.util.Base64.getEncoder().encode(sha256_HMAC.doFinal(data.getBytes())));
    }
}
