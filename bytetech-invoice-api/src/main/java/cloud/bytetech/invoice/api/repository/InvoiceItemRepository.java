package cloud.bytetech.invoice.api.repository;

import cloud.bytetech.invoice.api.domain.InvoiceItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Long> {}
