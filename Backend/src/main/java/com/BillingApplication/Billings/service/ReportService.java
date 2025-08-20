package com.BillingApplication.Billings.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.BillingApplication.Billings.model.Customer;
import com.BillingApplication.Billings.model.Invoice;
import com.BillingApplication.Billings.repository.CustomerRepository;
import com.BillingApplication.Billings.repository.InvoiceRepository;

@Service
public class ReportService {

    private final InvoiceRepository invoiceRepo;
    private final CustomerRepository customerRepo;

    public ReportService(InvoiceRepository invoiceRepo, CustomerRepository customerRepo) {
        this.invoiceRepo = invoiceRepo;
        this.customerRepo = customerRepo;
    }

    public Map<String, Object> invoiceSummary(LocalDate from, LocalDate to) {
        List<Invoice> invoices = invoiceRepo.findByDueDateBetween(from, to);
        double total = invoices.stream()
                .mapToDouble(i -> i.getTotalAmount() != null ? i.getTotalAmount().doubleValue() : 0.0)
                .sum();

        Map<String, Object> summary = new HashMap<>();
        summary.put("count", invoices.size());
        summary.put("totalAmount", total);
        summary.put("invoices", invoices);

        return summary;
    }

    public Map<String, Object> outstanding() {
        List<Invoice> unpaid = invoiceRepo.findByStatus("UNPAID");
        List<Invoice> partiallyPaid = invoiceRepo.findByStatus("PARTIALLY_PAID");

        Map<String, Object> report = new HashMap<>();
        report.put("unpaid", unpaid);
        report.put("partiallyPaid", partiallyPaid);

        return report;
    }

    public Map<String, Object> customerHistory(Long customerId) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        List<Invoice> invoices = invoiceRepo.findByCustomer(customer);
        Map<String, Object> history = new HashMap<>();
        history.put("customer", customer);
        history.put("invoices", invoices);

        return history;
    }

    public Map<String, Object> dailyReport(LocalDate date) {
        return invoiceSummary(date, date);
    }

    public Map<String, Object> weeklyReport(LocalDate from, LocalDate to) {
        return invoiceSummary(from, to);
    }

    public Map<String, Object> monthlyReport(YearMonth month) {
        LocalDate start = month.atDay(1);
        LocalDate end = month.atEndOfMonth();
        return invoiceSummary(start, end);
    }
}
