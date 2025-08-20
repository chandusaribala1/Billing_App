package com.BillingApplication.Billings.exception;

public class PaymentExceededException extends RuntimeException{
public PaymentExceededException() {
        super("Payment exceeds invoice total");
    }
}
