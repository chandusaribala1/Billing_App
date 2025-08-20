package com.BillingApplication.Billings.controller;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BillingApplication.Billings.service.ReportService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService service;

    public ReportController(ReportService service) {
        this.service = service;
    }
    @GetMapping("/invoices")
    public ResponseEntity<Map<String, Object>> invoiceSummary(@RequestParam String from,
                                                              @RequestParam String to) {
        return ResponseEntity.ok(
                service.invoiceSummary(LocalDate.parse(from), LocalDate.parse(to))
        );
    }

    @GetMapping("/outstanding")
    public ResponseEntity<Map<String, Object>> outstanding() {
        return ResponseEntity.ok(service.outstanding());
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<Map<String, Object>> customerHistory(@PathVariable Long customerId) {
        return ResponseEntity.ok(service.customerHistory(customerId));
    }

    @GetMapping("/invoices/daily")
    public ResponseEntity<Map<String, Object>> daily(@RequestParam String date) {
        return ResponseEntity.ok(
                service.dailyReport(LocalDate.parse(date))
        );
    }
    @GetMapping("/invoices/weekly")
    public ResponseEntity<Map<String, Object>> weekly(@RequestParam String from,
                                                      @RequestParam String to) {
        return ResponseEntity.ok(
                service.weeklyReport(LocalDate.parse(from), LocalDate.parse(to))
        );
    }
    @GetMapping("/invoices/monthly")
    public ResponseEntity<Map<String, Object>> monthly(@RequestParam String month) {
        return ResponseEntity.ok(
                service.monthlyReport(YearMonth.parse(month))
        );
    }
}
