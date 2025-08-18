package cloud.bytetech.invoice.api.web.dto;

public record CreateRdpAccountReq(String username, String password, java.math.BigDecimal monthlyPrice) {}