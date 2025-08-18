package cloud.bytetech.invoice.api.repository;

import cloud.bytetech.invoice.api.domain.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    boolean existsBySubscriptionIdAndPeriodStart(Long subscriptionId, LocalDate periodStart);
}
