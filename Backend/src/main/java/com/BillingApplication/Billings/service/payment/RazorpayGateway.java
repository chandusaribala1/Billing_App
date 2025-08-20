package com.BillingApplication.Billings.service.payment;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service("razorpay")
public class RazorpayGateway implements PaymentGateway {

    private RazorpayClient client;

    public RazorpayGateway(@Value("${razorpay.key}") String keyId,
                           @Value("${razorpay.secret}") String keySecret) throws Exception {
        this.client = new RazorpayClient(keyId, keySecret);
    }

    @Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) throws Exception {
        JSONObject options = new JSONObject();
        options.put("amount", (int) (amount * 100)); // smallest currency unit
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
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) {
        return true;
    }
}
