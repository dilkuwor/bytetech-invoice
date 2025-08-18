import DataTable from "@/components/DataTable";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type Row = {
  id: number;
  name: string;
  email?: string;
  rdpUsername?: string;
  activeSince?: string;
};

const mock: Row[] = [
  { id: 1, name: "Acme LLC", email: "billing@acme.com", rdpUsername: "acme-rdp-01", activeSince: "2025-08-17" },
  { id: 2, name: "Globex", email: "ap@globex.com", rdpUsername: "globex-01", activeSince: "2025-08-01" },
];

export default function Customers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">Customers</h1>
        <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
          New Customer
        </button>
      </div>
      <DataTable<Row>
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "rdpUsername", header: "RDP Account" },
          { key: "activeSince", header: "Active Since" },
          {
            key: "id", // ✅ use a real key; just ignore value and render actions
            header: "Actions",
            render: (row) => (
              <div className="flex space-x-2">
                <button
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                  aria-label={`Edit customer ${row.name}`}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                  aria-label={`Delete customer ${row.name}`}
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