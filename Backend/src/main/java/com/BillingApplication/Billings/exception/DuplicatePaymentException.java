package com.BillingApplication.Billings.exception;

public class DuplicatePaymentException extends RuntimeException{
public DuplicatePaymentException() {
        super("Duplicate payment detected for this invoice on the same date");
    }
}
