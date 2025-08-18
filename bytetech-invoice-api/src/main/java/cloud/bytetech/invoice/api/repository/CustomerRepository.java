package cloud.bytetech.invoice.api.repository;

import cloud.bytetech.invoice.api.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {}
