package cloud.bytetech.invoice.api.jobs;

import cloud.bytetech.invoice.api.service.RecurringInvoiceService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class InvoiceScheduler {

    private final RecurringInvoiceService service;

    public InvoiceScheduler(RecurringInvoiceService service) {
        this.service = service;
    }

    // Runs every day at 00:15 America/Chicago
    @Scheduled(cron = "0 15 0 * * *", zone = "America/Chicago")
    public void generateDailyInvoices() {
        service.generateDueInvoicesForToday();
    }
}