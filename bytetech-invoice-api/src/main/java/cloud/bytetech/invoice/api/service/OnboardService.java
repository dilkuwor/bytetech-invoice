package cloud.bytetech.invoice.api.service;

import cloud.bytetech.invoice.api.domain.*;
import cloud.bytetech.invoice.api.repository.CustomerRepository;
import cloud.bytetech.invoice.api.repository.InvoiceRepository;
import cloud.bytetech.invoice.api.repository.RdpAccountRepository;
import cloud.bytetech.invoice.api.repository.SubscriptionRepository;
import cloud.bytetech.invoice.api.util.PasswordHelper;
import cloud.bytetech.invoice.api.web.dto.OnboardOrAssignReq;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class OnboardService {
    private final CustomerRepository customers;
    private final RdpAccountRepository accounts;
    private final SubscriptionRepository subs;
    private final InvoiceRepository invoices;

    public OnboardService(CustomerRepository c,
                          RdpAccountRepository a,
                          SubscriptionRepository s,
                          InvoiceRepository i) {
        this.customers = c;
        this.accounts = a;
        this.subs = s;
        this.invoices = i;
    }

    @Transactional
    public Invoice onboardOrAssignAndCreateDraft(OnboardOrAssignReq req) {
        LocalDate today = LocalDate.now();

        // 1) Customer
        Customer customer = (req.customerEmail() != null)
                ? customers.findAll().stream()
                .filter(c -> req.customerEmail().equalsIgnoreCase(c.getEmail()))
                .findFirst().orElse(null)
                : null;
        if (customer == null) {
            customer = Customer.builder()
                    .name(req.customerName())
                    .email(req.customerEmail())
                    .build();
            customers.save(customer);
        }

        // 2) RDP Account
        var account = accounts.findByUsername(req.rdpUsername())
                .orElseGet(() -> accounts.save(
                        RdpAccount.builder()
                                .username(req.rdpUsername())
                                .password(PasswordHelper.generate(5))  // 👈 auto 7-char password
                                .build()
                ));

        // 3) Active subscription (if any)
        var activeOpt = subs.findFirstByRdpAccountIdAndStatus(account.getId(), "ACTIVE");
        Subscription active = activeOpt.orElse(null);

        if (active != null && !active.getCustomer().getId().equals(customer.getId())) {
            // End the old one immediately
            active.setEndDate(today);
            active.setStatus("ENDED");
        }

        // 4) Ensure active subscription for this customer
        Subscription current = activeOpt.isPresent() && active != null
                && "ACTIVE".equals(active.getStatus())
                && active.getCustomer().getId().equals(customer.getId())
                ? active
                : subs.save(Subscription.builder()
                .rdpAccount(account)
                .customer(customer)
                .monthlyPrice(account.getMonthlyPrice())
                .startDate(today)
                .nextInvoiceDate(today)
                .status("ACTIVE")
                .build()
        );

        // 5) Create today's draft invoice if not already present
        if (!invoices.existsBySubscriptionIdAndPeriodStart(current.getId(), today)) {
            var inv = new Invoice();
            inv.setCustomer(customer);
            inv.setSubscription(current);
            inv.setIssueDate(LocalDate.now());
            inv.setStatus("DRAFT");
            inv.setPeriodStart(today);
            inv.setPeriodEnd(today.plusMonths(1));
            inv.setDueDate(inv.getPeriodEnd());

            var item = new InvoiceItem();
            item.setInvoice(inv);
            item.setDescription("RDP Subscription (" + account.getUsername() + ")");
            item.setQuantity(BigDecimal.ONE);
            item.setUnitPrice(account.getMonthlyPrice());
            item.setLineTotal(account.getMonthlyPrice());

            inv.getItems().add(item);
            inv.setTotal(account.getMonthlyPrice());

            return invoices.save(inv);
        } else {
            return invoices.findAll().stream()
                    .filter(x -> x.getSubscription() != null
                            && x.getSubscription().getId().equals(current.getId())
                            && today.equals(x.getPeriodStart()))
                    .findFirst()
                    .orElseThrow();
        }
    }
}
