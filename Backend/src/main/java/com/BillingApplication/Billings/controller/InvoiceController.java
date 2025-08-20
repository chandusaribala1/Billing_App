    package com.BillingApplication.Billings.controller;

    import java.time.LocalDate;
    import java.util.List;
import java.util.Optional;

import org.springframework.format.annotation.DateTimeFormat;
    import org.springframework.security.core.annotation.AuthenticationPrincipal;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.web.bind.annotation.DeleteMapping;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.PatchMapping;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.PutMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;

    import com.BillingApplication.Billings.dto.CreateInvoiceRequest;
    import com.BillingApplication.Billings.model.Customer;
    import com.BillingApplication.Billings.model.Invoice;
import com.BillingApplication.Billings.model.User;
    import com.BillingApplication.Billings.repository.CustomerRepository;
import com.BillingApplication.Billings.repository.UserRepository;
import com.BillingApplication.Billings.service.InvoiceService;

    @RestController
    @RequestMapping("/invoices")
    public class InvoiceController {
        private final UserRepository users;
        private final InvoiceService service;
        private final CustomerRepository customerRepo;

       public InvoiceController(InvoiceService service,
                         CustomerRepository customerRepo,
                         UserRepository users) {
    this.service = service;
    this.customerRepo = customerRepo;
    this.users = users;
}

        @PostMapping
        public Invoice create(@RequestBody CreateInvoiceRequest req) {
            return service.createInvoice(req);
        }

        @PutMapping("/{id}")
        public Invoice update(@PathVariable Long id, @RequestBody CreateInvoiceRequest req) {
            return service.updateInvoice(id, req);
        }

        @GetMapping("/{id}")
        public Invoice get(@PathVariable Long id) {
            return service.get(id);
        }

        @GetMapping
        public List<Invoice> list() {
            return service.list();
        }

        @DeleteMapping("/{id}")
        public void delete(@PathVariable Long id) {
            service.delete(id);
        }
        @GetMapping("/customer/{customerId}")
        public List<Invoice> listByCustomer(@PathVariable Long customerId) {
            return service.listByCustomer(customerId);
        }
       @GetMapping("/me")
      public List<Invoice> myInvoices(@AuthenticationPrincipal UserDetails userDetails) {
    User user = users.findByUsername(userDetails.getUsername())
                     .orElseThrow(() -> new IllegalArgumentException("User not found"));
    Optional<Customer> customerOpt = customerRepo.findByEmail(user.getEmail());
    Customer customer = customerOpt
            .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
    return service.getInvoicesForCurrentCustomer(customer.getId());
}

@GetMapping("/search")
        public List<Invoice> search(
                @RequestParam(required = false) String customerName,
                @RequestParam(required = false) String status,
                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
            return service.searchInvoices(customerName, status, date);
        }
        @PatchMapping("/{id}/status")
        public Invoice updateStatus(@PathVariable Long id, @RequestParam String status) {
            return service.updateInvoiceStatus(id, status);
        }
        @GetMapping("/reports/daily")
        public List<Invoice> dailyReport() {
            return service.dailyReport();
        }

        @GetMapping("/reports/monthly")
        public List<Invoice> monthlyReport() {
            return service.monthlyReport();
        }
    }