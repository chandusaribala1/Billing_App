package com.BillingApplication.Billings.dto;

import java.time.LocalDate;
import java.util.List;

public class CreateInvoiceRequest {

    private Long customerId;
    private LocalDate dueDate;
    private List<InvoiceItemRequest> items;

    public CreateInvoiceRequest() {}

    public CreateInvoiceRequest(Long customerId, LocalDate dueDate, List<InvoiceItemRequest> items) {
        this.customerId = customerId;
        this.dueDate = dueDate;
        this.items = items;
    }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public List<InvoiceItemRequest> getItems() { return items; }
    public void setItems(List<InvoiceItemRequest> items) { this.items = items; }
}
