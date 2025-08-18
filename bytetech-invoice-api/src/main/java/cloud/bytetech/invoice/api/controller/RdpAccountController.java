package cloud.bytetech.invoice.api.controller;

import cloud.bytetech.invoice.api.domain.RdpAccount;
import cloud.bytetech.invoice.api.repository.RdpAccountRepository;
import cloud.bytetech.invoice.api.util.PasswordHelper;
import cloud.bytetech.invoice.api.web.dto.CreateRdpAccountReq;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/rdp-accounts")
public class RdpAccountController {

    private final RdpAccountRepository accounts;

    public RdpAccountController(RdpAccountRepository accounts) {
        this.accounts = accounts;
    }

    @PostMapping
    public ResponseEntity<RdpAccount> create(@RequestBody CreateRdpAccountReq req) {
        var account = RdpAccount.builder()
                .username(req.username())
                .password((req.password() == null || req.password().isBlank())
                        ? PasswordHelper.generate(7)
                        : req.password())
                .monthlyPrice(req.monthlyPrice() != null ? req.monthlyPrice() : new BigDecimal("2200.00"))
                .status("ACTIVE")
                .build(); // id stays null
        return ResponseEntity.ok(accounts.save(account)); // INSERT
    }
}