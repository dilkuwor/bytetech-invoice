import DataTable from "@/components/DataTable";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type Row = {
  id: number;
  customer: string;
  rdpUsername: string;
  startDate: string;
  nextInvoice: string;
  status: "ACTIVE" | "ENDED";
};

const mock: Row[] = [
  { id: 1, customer: "Acme LLC", rdpUsername: "acme-rdp-01", startDate: "2025-08-17", nextInvoice: "2025-09-17", status: "ACTIVE" },
  { id: 2, customer: "Globex", rdpUsername: "globex-01", startDate: "2025-08-01", nextInvoice: "2025-09-01", status: "ACTIVE" },
  { id: 3, customer: "Initech", rdpUsername: "ini-01", startDate: "2025-07-01", nextInvoice: "—", status: "ENDED" },
];

export default function Subscriptions() {
  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Subscriptions</h1>
        <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
          New Subscription
        </button>
      </div>
      <DataTable<Row>
        columns={[
          { key: "customer", header: "Customer" },
          { key: "rdpUsername", header: "RDP Account" },
          { key: "startDate", header: "Start Date" },
          { key: "nextInvoice", header: "Next Invoice" },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${row.status === "ACTIVE"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"}`}
              >
                {row.status}
              </span>
            ),
          },
          {
            key: "id", // ✅ use a real key; just render actions
            header: "Actions",
            render: (row) => (
              <div className="flex space-x-2">
                <button
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                  aria-label={`Edit subscription for ${row.customer}`}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                  aria-label={`Delete subscription for ${row.customer}`}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ),
          },
        ]}
        data={mock}
      />
    </div>
  );
}