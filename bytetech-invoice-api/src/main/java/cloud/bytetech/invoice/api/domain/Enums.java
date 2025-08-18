package cloud.bytetech.invoice.api.domain;

public class Enums {
    public enum InvoiceStatus { DRAFT, SENT, PARTIALLY_PAID, PAID, VOID }
    public enum PaymentMethod { CASH, CARD, BANK_TRANSFER, OTHER }
    public enum PaymentStatus { SUCCEEDED, FAILED, PENDING }
}