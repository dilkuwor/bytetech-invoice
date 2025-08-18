package cloud.bytetech.invoice.api.service;

import cloud.bytetech.invoice.api.domain.Invoice;
import cloud.bytetech.invoice.api.domain.InvoiceItem;
import cloud.bytetech.invoice.api.repository.InvoiceRepository;
import cloud.bytetech.invoice.api.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class RecurringInvoiceService {

    private final SubscriptionRepository subs;
    private final InvoiceRepository invoices;

    public RecurringInvoiceService(SubscriptionRepository subs, InvoiceRepository invoices) {
        this.subs = subs;
        this.invoices = invoices;
    }

    @Transactional
    public void generateDueInvoicesForToday() {
        LocalDate today = LocalDate.now();

        subs.findByStatus("ACTIVE").forEach(sub -> {
            // If nextInvoiceDate is null, initialize it to the subscription start
            if (sub.getNextInvoiceDate() == null) {
                sub.setNextInvoiceDate(sub.getStartDate());
            }

            while (!sub.getNextInvoiceDate().isAfter(today)
                    && (sub.getEndDate() == null || !sub.getNextInvoiceDate().isAfter(sub.getEndDate()))) {

                LocalDate start = sub.getNextInvoiceDate();
                LocalDate end = start.plusMonths(1);

                // Idempotency: 1 invoice per (subscription, periodStart)
                if (!invoices.existsBySubscriptionIdAndPeriodStart(sub.getId(), start)) {
                    Invoice inv = new Invoice();
                    inv.setCustomer(sub.getCustomer());
                    inv.setSubscription(sub);
                    inv.setStatus("DRAFT");
                    inv.setPeriodStart(start);
                    inv.setPeriodEnd(end);
                    inv.setDueDate(end);

                    InvoiceItem item = new InvoiceItem();
                    item.setInvoice(inv);
                    item.setDescription("RDP Subscription (" + sub.getRdpAccount().getUsername() + ")");
                    item.setQuantity(BigDecimal.ONE);
                    item.setUnitPrice(sub.getMonthlyPrice());
                    item.setLineTotal(sub.getMonthlyPrice());

                    inv.getItems().add(item);
                    inv.setTotal(sub.getMonthlyPrice());

                    invoices.save(inv);
                }

                // Advance to next cycle
                sub.setNextInvoiceDate(end);
            }
        });
    }
}