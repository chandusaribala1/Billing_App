package com.BillingApplication.Billings.service.payment;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("paypal")
public class PaypalGateway implements PaymentGateway {

    private final String clientId;
    private final String clientSecret;
    private final String mode;

    public PaypalGateway(@Value("${paypal.clientId}") String clientId,
                         @Value("${paypal.clientSecret}") String clientSecret,
                         @Value("${paypal.mode}") String mode) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.mode = mode;
    }

    @Override
    public Map<String, Object> createPayment(double amount, String currency, Map<String, Object> metadata) throws PayPalRESTException {
        APIContext context = new APIContext(clientId, clientSecret, mode);

        Amount amt = new Amount(currency, String.format("%.2f", amount));
        Transaction txn = new Transaction();
        txn.setAmount(amt);

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(new Payer().setPaymentMethod("paypal"));
        payment.setTransactions(List.of(txn));
        payment.setRedirectUrls(new RedirectUrls()
                .setReturnUrl("http://yourdomain.com/api/payments/external/paypal/verify")
                .setCancelUrl("http://yourdomain.com/cancel"));

        Payment created = payment.create(context);

        Map<String, Object> response = new HashMap<>();
        response.put("id", created.getId());
        response.put("approvalUrl", created.getLinks().stream()
                .filter(link -> link.getRel().equals("approval_url"))
                .findFirst().get().getHref());
        return response;
    }

    @Override
    public boolean verifyPayment(Map<String, Object> payload, Map<String, String> headers) throws PayPalRESTException {
        String paymentId = (String) payload.get("paymentId");
        String payerId = (String) payload.get("PayerID");

        APIContext context = new APIContext(clientId, clientSecret, mode);
        Payment payment = new Payment().setId(paymentId);
        PaymentExecution exec = new PaymentExecution().setPayerId(payerId);

        Payment executed = payment.execute(context, exec);
        return "approved".equalsIgnoreCase(executed.getState());
    }
}
