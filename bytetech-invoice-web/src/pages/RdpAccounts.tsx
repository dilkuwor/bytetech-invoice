import DataTable from "@/components/DataTable";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type Row = {
  id: number;
  username: string;
  password: string;
  monthlyPrice: string;
  assignedTo?: string;
  status: "ACTIVE" | "PAUSED" | "CANCELED";
};

const mock: Row[] = [
  { id: 1, username: "acme-rdp-01", password: "a1B2c3D", monthlyPrice: "2200.00", assignedTo: "Acme LLC", status: "ACTIVE" },
  { id: 2, username: "globex-01", password: "xY7z122", monthlyPrice: "2200.00", assignedTo: "Globex", status: "ACTIVE" },
];

export default function RdpAccounts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">RDP Accounts</h1>
        <button className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
          New RDP Account
        </button>
      </div>
      <DataTable<Row>
        columns={[
          { key: "username", header: "Username" },
          {
            key: "password",
            header: "Password",
            render: (row) => (
              <span className="font-mono text-neutral-600 dark:text-neutral-400">{row.password}</span>
            ),
          },
          {
            key: "monthlyPrice",
            header: "Monthly Price",
            render: (row) => `$${parseFloat(row.monthlyPrice).toFixed(2)}`,
          },
          { key: "assignedTo", header: "Assigned To" },
          {
            key: "status",
            header: "Status",
            render: (row) => (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium
                  ${row.status === "ACTIVE" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" :
                    row.status === "PAUSED" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" :
                    "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"}`}
              >
                {row.status}
              </span>
            ),
          },
          {
            key: "id", // ✅ use a real key, just to satisfy TS
            header: "Actions",
            render: (row) => (
              <div className="flex space-x-2">
                <button
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200"
                  aria-label={`Edit RDP account ${row.username}`}
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                  aria-label={`Delete RDP account ${row.username}`}
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