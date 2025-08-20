package com.BillingApplication.Billings.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.BillingApplication.Billings.dto.PaymentRequest;
import com.BillingApplication.Billings.exception.DuplicatePaymentException;
import com.BillingApplication.Billings.exception.InvoiceNotFoundException;
import com.BillingApplication.Billings.exception.PaymentExceededException;
import com.BillingApplication.Billings.model.Invoice;
import com.BillingApplication.Billings.model.Payment;
import com.BillingApplication.Billings.repository.InvoiceRepository;
import com.BillingApplication.Billings.repository.PaymentRepository;
import com.BillingApplication.Billings.service.payment.PaymentGatewayService;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepo;
    private final InvoiceRepository invoiceRepo;
    private final PaymentGatewayService gatewayService;

    public PaymentService(PaymentRepository paymentRepo, InvoiceRepository invoiceRepo,
                          PaymentGatewayService gatewayService) {
        this.paymentRepo = paymentRepo;
        this.invoiceRepo = invoiceRepo;
        this.gatewayService = gatewayService;
    }

    @Transactional
    public Payment record(PaymentRequest req) {
        // FIX: BigDecimal comparison
        if (req.getAmount().compareTo(BigDecimal.ZERO) <= 0)
            throw new IllegalArgumentException("Payment amount must be positive");

        Invoice invoice = invoiceRepo.findById(req.getInvoiceId())
                .orElseThrow(() -> new InvoiceNotFoundException(req.getInvoiceId()));

        BigDecimal totalPaid = getTotalPaid(invoice);
        BigDecimal amountToPay = req.getAmount();

        if (totalPaid.add(amountToPay).compareTo(invoice.getTotalAmount()) > 0) {
            throw new PaymentExceededException();
        }

        boolean exists = paymentRepo.findByInvoice(invoice).stream()
                .anyMatch(p -> p.getAmount().compareTo(amountToPay) == 0
                        && p.getPaymentDate().equals(req.getPaymentDate()));

        if (exists) throw new DuplicatePaymentException();

        Payment payment = new Payment();
        payment.setInvoice(invoice);
        payment.setAmount(amountToPay);
        payment.setPaymentDate(req.getPaymentDate());

        Payment saved = paymentRepo.save(payment);
        updateInvoiceStatus(invoice);

        return saved;
    }

    @Transactional
    public boolean verifyExternalPayment(String gatewayName, Map<String, Object> payload,
                                         Map<String, String> headers) throws Exception {

        boolean valid = gatewayService.verifyPayment(gatewayName, payload, headers);
        if (!valid) return false;

        Long invoiceId = Long.parseLong(payload.get("invoiceId").toString());
        BigDecimal rawAmount = new BigDecimal(payload.get("amount").toString());
        BigDecimal amountInUnits = payload.containsKey("amountInPaise")
                ? rawAmount.divide(BigDecimal.valueOf(100))
                : rawAmount;

        Invoice invoice = invoiceRepo.findById(invoiceId)
                .orElseThrow(() -> new InvoiceNotFoundException(invoiceId));

        boolean exists = paymentRepo.findByInvoice(invoice).stream()
                .anyMatch(p -> p.getAmount().compareTo(amountInUnits) == 0
                        && p.getPaymentDate().equals(LocalDate.now()));

        if (!exists) {
            Payment payment = new Payment();
            payment.setInvoice(invoice);
            payment.setAmount(amountInUnits);
            payment.setPaymentDate(LocalDate.now());
            paymentRepo.save(payment);
            updateInvoiceStatus(invoice);
        }

        return true;
    }

    public List<Payment> byInvoice(Long invoiceId) {
        Invoice invoice = invoiceRepo.findById(invoiceId)
                .orElseThrow(() -> new InvoiceNotFoundException(invoiceId));
        return paymentRepo.findByInvoice(invoice);
    }

    public List<Payment> list() {
        return paymentRepo.findAll();
    }

    private BigDecimal getTotalPaid(Invoice invoice) {
        return paymentRepo.findByInvoice(invoice).stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void updateInvoiceStatus(Invoice invoice) {
        BigDecimal paid = getTotalPaid(invoice);
        BigDecimal total = invoice.getTotalAmount();

        if (paid.compareTo(total) >= 0) invoice.setStatus("PAID");
        else if (paid.compareTo(BigDecimal.ZERO) > 0) invoice.setStatus("PARTIALLY_PAID");
        else invoice.setStatus("UNPAID");

        invoiceRepo.save(invoice);
    }

    public Map<String, Object> createExternalPayment(String gatewayName, Long invoiceId, BigDecimal amount, String currency) {
        Invoice invoice = invoiceRepo.findById(invoiceId)
                .orElseThrow(() -> new InvoiceNotFoundException(invoiceId));

        Map<String, Object> metadata = Map.of(
                "invoiceId", invoiceId,
                "customerId", invoice.getCustomer().getId()
        );

        try {
            return gatewayService.createPayment(gatewayName, amount.doubleValue(), currency, metadata);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create external payment: " + e.getMessage(), e);
        }
    }
    public List<Payment> getPaymentsForCustomer(Long customerId) {
    List<Invoice> invoices = invoiceRepo.findByCustomer_Id(customerId); 
    return invoices.stream()
            .flatMap(invoice -> paymentRepo.findByInvoice(invoice).stream())
            .toList();
}

}
