package com.BillingApplication.Billings.service.payment;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
@Service("paytm")
public class PaytmGateway implements PaymentGateway{
@Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) {
        Map<String, Object> response = new HashMap<>();
        response.put("txnToken", "paytm_dummy_token");
        response.put("checkoutUrl", "https://securegw.paytm.in/theia/processTransaction");
        return response;
    }

    @Override
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) {
        return true;
    }
}
