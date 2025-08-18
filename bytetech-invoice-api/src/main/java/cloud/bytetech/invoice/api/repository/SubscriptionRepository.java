package cloud.bytetech.invoice.api.repository;

import cloud.bytetech.invoice.api.domain.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    // Find the active subscription for a specific RDP account
    Optional<Subscription> findFirstByRdpAccountIdAndStatus(Long accountId, String status);

    // Find all subscriptions by status (e.g. "ACTIVE")
    List<Subscription> findByStatus(String status);
}