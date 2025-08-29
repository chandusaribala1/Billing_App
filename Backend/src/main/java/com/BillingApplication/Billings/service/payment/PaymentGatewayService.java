package com.BillingApplication.Billings.service.payment;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class PaymentGatewayService {

    private final Map<String, PaymentGateway> gateways;

    public PaymentGatewayService(Map<String, PaymentGateway> gateways) {
        this.gateways = gateways;
    }

    public PaymentGateway getGateway(String name) {
        PaymentGateway gw = gateways.get(name.toLowerCase());
        if (gw == null) {
            throw new RuntimeException("Gateway not supported: " + name);
        }
        return gw;
    }

    public Map<String, Object> createPayment(String gatewayName, double amount, String currency, Map<String, Object> metadata) throws Exception {
        return getGateway(gatewayName).createPayment(amount, currency, metadata);
    }

    public boolean verifyPayment(String gatewayName, Map<String, Object> payload, Map<String, String> headers) throws Exception {
        return getGateway(gatewayName).verifyPayment(payload, headers);
    }
}
