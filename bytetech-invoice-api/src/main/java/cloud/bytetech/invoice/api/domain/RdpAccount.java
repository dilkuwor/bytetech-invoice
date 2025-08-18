package cloud.bytetech.invoice.api.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(
        name = "rdp_accounts",
        indexes = @Index(name = "uk_rdp_username", columnList = "username", unique = true)
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RdpAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false, length = 100)
    private String password;  // NEW field for storing password

    @Column(precision = 12, scale = 2, nullable = false)
    @Builder.Default
    private BigDecimal monthlyPrice = new BigDecimal("2200.00"); // default, adjust as needed

    @Builder.Default
    private String status = "ACTIVE"; // ACTIVE | PAUSED | CANCELED
}