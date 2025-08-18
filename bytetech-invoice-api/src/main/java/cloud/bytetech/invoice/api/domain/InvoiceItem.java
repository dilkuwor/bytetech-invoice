package cloud.bytetech.invoice.api.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity @Table(name = "invoice_items")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class InvoiceItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false) @JoinColumn(name = "invoice_id")
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Invoice invoice;

    @Column(nullable = false) private String description;
    @Column(precision = 12, scale = 2, nullable = false) @Builder.Default
    private BigDecimal quantity = BigDecimal.ONE;
    @Column(precision = 12, scale = 2, nullable = false) @Builder.Default
    private BigDecimal unitPrice = BigDecimal.ZERO;

    @Column(precision = 12, scale = 2, nullable = false) @Builder.Default
    private BigDecimal lineTotal = BigDecimal.ZERO; // quantity * unitPrice (no tax for MVP)
}