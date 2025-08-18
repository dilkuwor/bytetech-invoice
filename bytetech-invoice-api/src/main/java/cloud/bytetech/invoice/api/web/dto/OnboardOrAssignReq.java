package cloud.bytetech.invoice.api.web.dto;

public record OnboardOrAssignReq(
        String customerName,
        String customerEmail,
        String rdpUsername
) {}