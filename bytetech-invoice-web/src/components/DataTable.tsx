// src/components/DataTable.tsx
import type { ReactNode } from "react";

type Column<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => ReactNode;
};

type Props<T extends { id?: string | number }> = {
  columns: Column<T>[];
  data: T[];
};

export default function DataTable<T extends { id?: string | number }>({
  columns,
  data,
}: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-md dark:shadow-lg">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-200">
          <tr>
            {columns.map((c) => (
              <th
                key={String(c.key)}
                className="text-left px-4 py-3 font-medium uppercase tracking-wide"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={(row as any).id ?? i}
              className="border-t border-neutral-200 dark:border-neutral-700 hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors duration-200 odd:bg-white dark:odd:bg-neutral-800 even:bg-neutral-50 dark:even:bg-neutral-900"
            >
              {columns.map((c) => (
                <td key={String(c.key)} className="px-4 py-3 text-neutral-900 dark:text-neutral-100">
                  {c.render ? c.render(row) : String(row[c.key])}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td className="p-6 text-neutral-500 dark:text-neutral-400 text-center" colSpan={columns.length}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}