package cloud.bytetech.invoice.api.controller;

import cloud.bytetech.invoice.api.service.OnboardService;
import cloud.bytetech.invoice.api.domain.Invoice;
import cloud.bytetech.invoice.api.web.dto.OnboardOrAssignReq;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class OnboardController {
    private final OnboardService svc;

    public OnboardController(OnboardService svc) {
        this.svc = svc;
    }

    @PostMapping("/onboard")
    public Invoice onboard(@RequestBody OnboardOrAssignReq req) {
        return svc.onboardOrAssignAndCreateDraft(req);
    }
}