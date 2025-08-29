package com.BillingApplication.Billings.service.payment;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.instamojo.wrapper.api.ApiContext;
import com.instamojo.wrapper.api.Instamojo;
import com.instamojo.wrapper.api.InstamojoImpl;
import com.instamojo.wrapper.model.PaymentOrder;
import com.instamojo.wrapper.model.PaymentOrderResponse;

@Service("instamojo")
public class InstamojoGateway implements PaymentGateway {

    private final Instamojo api;

    public InstamojoGateway(@Value("${instamojo.clientId}") String clientId,
                            @Value("${instamojo.clientSecret}") String clientSecret,
                            @Value("${instamojo.endpoint}") String endpoint) throws Exception {
        ApiContext context = ApiContext.create(clientId, clientSecret, ApiContext.Mode.TEST); 
        this.api = new InstamojoImpl(context);
    }

    @Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) throws Exception {
        PaymentOrder order = new PaymentOrder();
        order.setName("Customer Payment");
        order.setEmail("customer@example.com");
        order.setPhone("9999999999");
        order.setCurrency(currency);
        order.setAmount(amount);
        order.setRedirectUrl("http://yourdomain.com/api/payments/external/instamojo/verify");
        order.setTransactionId("txn_" + metadata.get("invoiceId"));

        PaymentOrderResponse response = api.createPaymentOrder(order);

        Map<String, Object> result = new HashMap<>();
        result.put("paymentRequestId", response.getPaymentOrder().getId());
        result.put("checkoutUrl", response.getPaymentOptions().getPaymentUrl());
        return result;
    }

    @Override
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) {
        String status = (String) payload.get("status");
        return "Credit".equalsIgnoreCase(status);
    }
}
