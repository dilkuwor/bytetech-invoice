package cloud.bytetech.invoice.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity @Table(name="subscriptions",
        indexes = {
                @Index(name="idx_sub_account", columnList="rdp_account_id"),
                @Index(name="idx_sub_customer", columnList="customer_id")
        }
)
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Subscription {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional=false) @JoinColumn(name="rdp_account_id")
    private RdpAccount rdpAccount;

    @ManyToOne(optional=false) @JoinColumn(name="customer_id")
    private Customer customer;

    @Column(precision=12, scale=2, nullable=false)
    private BigDecimal monthlyPrice;

    @Column(nullable=false) private LocalDate startDate;
    private LocalDate endDate; // closed immediately when reassigned

    @Column(nullable=false) private LocalDate nextInvoiceDate;

    @Builder.Default private String status = "ACTIVE"; // ACTIVE | ENDED
}
