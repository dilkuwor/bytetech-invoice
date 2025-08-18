import type { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
};

export default function StatCard({ title, value, hint, icon }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">
          {title}
        </div>
        {icon && <div className="text-primary-600 dark:text-primary-400">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">{value}</div>
      {hint && <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{hint}</div>}
    </div>
  );
}