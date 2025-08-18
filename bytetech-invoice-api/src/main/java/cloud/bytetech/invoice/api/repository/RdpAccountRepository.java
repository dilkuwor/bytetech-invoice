package cloud.bytetech.invoice.api.repository;

import cloud.bytetech.invoice.api.domain.RdpAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RdpAccountRepository extends JpaRepository<RdpAccount, Long> {
    List<RdpAccount> findByStatus(String status);
    Optional<RdpAccount> findByUsername(String username);
}
