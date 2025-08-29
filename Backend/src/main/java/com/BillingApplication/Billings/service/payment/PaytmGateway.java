package com.BillingApplication.Billings.service.payment;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("paytm")
public class PaytmGateway implements PaymentGateway {

    @Value("${paytm.merchantId}")
    private String merchantId;

    @Value("${paytm.merchantKey}")
    private String merchantKey;

    @Value("${paytm.website}")
    private String website;

    @Value("${paytm.industryType}")
    private String industryType;

    @Value("${paytm.callbackUrl}")
    private String callbackUrl;

    @Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) throws Exception {
        Map<String, Object> body = new HashMap<>();
        body.put("MID", merchantId);
        body.put("ORDER_ID", "ORDER" + System.currentTimeMillis());
        body.put("CUST_ID", metadata.get("customerId"));
        body.put("TXN_AMOUNT", String.valueOf(amount));
        body.put("CHANNEL_ID", "WEB");
        body.put("WEBSITE", website);
        body.put("INDUSTRY_TYPE_ID", industryType);
        body.put("CALLBACK_URL", callbackUrl);
        String data = merchantId + "|" + body.get("ORDER_ID") + "|" + body.get("TXN_AMOUNT") + "|" + currency;
        String checksum = ChecksumGenerator.generateChecksum(data, merchantKey);

        Map<String, Object> response = new HashMap<>(body);
        response.put("CHECKSUMHASH", checksum);
        response.put("checkoutUrl", "https://securegw-stage.paytm.in/order/process"); 
        return response;
    }

    @Override
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) throws Exception {
        String orderId = (String) payload.get("ORDERID");
        String txnAmount = (String) payload.get("TXNAMOUNT");
        String checksum = (String) payload.get("CHECKSUMHASH");

        String data = merchantId + "|" + orderId + "|" + txnAmount + "|INR";
        return ChecksumGenerator.verifyChecksum(data, checksum, merchantKey);
    }
}
