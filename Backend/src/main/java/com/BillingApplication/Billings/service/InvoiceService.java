package com.BillingApplication.Billings.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.BillingApplication.Billings.dto.CreateInvoiceRequest;
import com.BillingApplication.Billings.dto.InvoiceItemRequest;
import com.BillingApplication.Billings.model.Customer;
import com.BillingApplication.Billings.model.Invoice;
import com.BillingApplication.Billings.model.InvoiceItem;
import com.BillingApplication.Billings.model.Product;
import com.BillingApplication.Billings.repository.CustomerRepository;
import com.BillingApplication.Billings.repository.InvoiceRepository;
import com.BillingApplication.Billings.repository.ProductRepository;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepo;
    private final CustomerRepository customerRepo;
    private final ProductRepository productRepo;

    public InvoiceService(InvoiceRepository invoiceRepo, CustomerRepository customerRepo, ProductRepository productRepo) {
        this.invoiceRepo = invoiceRepo;
        this.customerRepo = customerRepo;
        this.productRepo = productRepo;
    }

    // ---------------- CREATE INVOICE ----------------
    @Transactional
    public Invoice createInvoice(CreateInvoiceRequest req) {
        Customer customer = customerRepo.findById(req.getCustomerId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        Invoice invoice = new Invoice();
        invoice.setCustomer(customer);
        invoice.setDueDate(req.getDueDate());
        invoice.setStatus("UNPAID");

        BigDecimal total = addOrUpdateInvoiceItems(invoice, req.getItems());
        invoice.setTotalAmount(total);

        return invoiceRepo.save(invoice);
    }

    // ---------------- UPDATE INVOICE ----------------
    @Transactional
    public Invoice updateInvoice(Long id, CreateInvoiceRequest req) {
        Invoice invoice = invoiceRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found"));

        invoice.setDueDate(req.getDueDate());

        BigDecimal total = addOrUpdateInvoiceItems(invoice, req.getItems());
        invoice.setTotalAmount(total);

        return invoiceRepo.save(invoice);
    }

    // ---------------- ADD / UPDATE ITEMS ----------------
    @Transactional
    private BigDecimal addOrUpdateInvoiceItems(Invoice invoice, List<InvoiceItemRequest> itemsReq) {
        if (itemsReq == null) itemsReq = new ArrayList<>(); // handle null

        List<InvoiceItem> existingItems = invoice.getItems();
        existingItems.clear(); // safe because initialized in entity

        BigDecimal total = BigDecimal.ZERO;

        for (InvoiceItemRequest itemReq : itemsReq) {
            Product product = productRepo.findById(itemReq.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found: " + itemReq.getProductId()));

            InvoiceItem item = new InvoiceItem();
            item.setInvoice(invoice);
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());

            BigDecimal unitPrice = product.getPrice();
            BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            item.setUnitPrice(unitPrice);
            item.setLineTotal(lineTotal);

            total = total.add(lineTotal);
            existingItems.add(item);
        }

        return total;
    }

    // ---------------- OTHER METHODS ----------------
    public void delete(Long id) { invoiceRepo.deleteById(id); }

    public Invoice get(Long id) {
        return invoiceRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
    }

    public List<Invoice> list() { return invoiceRepo.findAll(); }

    public List<Invoice> listByCustomer(Long customerId) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        return invoiceRepo.findByCustomer(customer);
    }

    @Transactional
    public Invoice updateInvoiceStatus(Long id, String status) {
        Invoice invoice = invoiceRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        invoice.setStatus(status);
        return invoiceRepo.save(invoice);
    }

    public List<Invoice> getInvoicesForCurrentCustomer(Long customerId) {
        return listByCustomer(customerId);
    }

    public List<Invoice> searchInvoices(String customerName, String status, LocalDate date) {
        LocalDate nextDate = (date != null) ? date.plusDays(1) : null;
        return invoiceRepo.searchInvoices(customerName, status, date, nextDate);
    }
    public List<Invoice> dailyReport() {
    LocalDate today = LocalDate.now();
    return invoiceRepo.findByCreatedDateBetween(today, today.plusDays(1));
}

public List<Invoice> monthlyReport() {
    LocalDate startMonth = LocalDate.now().withDayOfMonth(1);
    LocalDate endMonth = startMonth.plusMonths(1);
    return invoiceRepo.findByCreatedDateBetween(startMonth, endMonth);
}

}
