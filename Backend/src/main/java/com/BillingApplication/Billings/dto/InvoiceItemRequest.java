package com.BillingApplication.Billings.dto;

import java.math.BigDecimal;

public class InvoiceItemRequest {
    private Long productId;
    private int quantity;
    private BigDecimal unitPrice;

    public InvoiceItemRequest() {}

    public InvoiceItemRequest(Long productId, int quantity, BigDecimal unitPrice) {
        this.productId = productId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public BigDecimal getUnitPrice() { return unitPrice; }
    public void setUnitPrice(BigDecimal unitPrice) { this.unitPrice = unitPrice; }
}
