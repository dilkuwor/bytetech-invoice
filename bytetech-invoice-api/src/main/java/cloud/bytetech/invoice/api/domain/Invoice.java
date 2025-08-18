package cloud.bytetech.invoice.api.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
        name = "invoices",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_invoice_sub_period", columnNames = {"subscription_id", "periodStart"})
        },
        indexes = {
                @Index(name = "idx_invoice_customer", columnList = "customer_id"),
                @Index(name = "idx_invoice_subscription", columnList = "subscription_id"),
                @Index(name = "idx_invoice_status", columnList = "status")
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // Which subscription this invoice belongs to (RDP account + customer over time)
    @ManyToOne
    @JoinColumn(name = "subscription_id")
    private Subscription subscription;

    // Billing period for idempotency and reporting
    private LocalDate periodStart;   // inclusive
    private LocalDate periodEnd;     // exclusive

    @Column(unique = true, length = 50)
    private String number;                 // set when finalized (e.g. INV-000001)

    @Column(length = 20, nullable = false)
    @Builder.Default
    private String status = "DRAFT";       // DRAFT | SENT | PAID | etc.

    private LocalDate issueDate;           // set on finalize
    private LocalDate dueDate;

    @Column(precision = 12, scale = 2, nullable = false)
    @Builder.Default
    private BigDecimal total = BigDecimal.ZERO;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<InvoiceItem> items = new ArrayList<>();

    // Convenience helper for building the aggregate
    public void addItem(InvoiceItem item) {
        if (item == null) return;
        item.setInvoice(this);
        this.items.add(item);
    }
}