import DataTable from "@/components/DataTable";

type Invoice = {
  id: number;
  number: string;
  customer: string;
  period: string;
  status: "DRAFT" | "SENT" | "PAID";
  total: string;
  dueDate: string;
};

const mock: Invoice[] = [
  { id: 1, number: "INV-000001", customer: "Acme LLC", period: "Aug 17–Sep 17", status: "DRAFT", total: "2200.00", dueDate: "2025-09-17" },
  { id: 2, number: "INV-000002", customer: "Globex", period: "Aug 01–Sep 01", status: "SENT", total: "2200.00", dueDate: "2025-09-01" },
  { id: 3, number: "INV-000003", customer: "Initech", period: "Aug 01–Sep 01", status: "PAID", total: "2200.00", dueDate: "2025-09-01" },
];

export default function Invoices() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Invoices</h1>
        <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
          New Invoice
        </button>
      </div>
      <DataTable
        columns={[
          { key: "number", header: "Invoice #" },
          { key: "customer", header: "Customer" },
          { key: "period", header: "Period" },
          {
            key: "status",
            header: "Status",
            render: (r: Invoice) => (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${r.status === "PAID" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                    r.status === "SENT" ? "bg-secondary-100 text-secondary-700 dark:bg-secondary-900 dark:text-secondary-300" :
                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"}`}
              >
                {r.status}
              </span>
            ),
          },
          {
            key: "total",
            header: "Total",
            render: (r: Invoice) => `$${parseFloat(r.total).toFixed(2)}`,
          },
          { key: "dueDate", header: "Due" },
        ]}
        data={mock}
      />
    </div>
  );
}