import StatCard from "@/components/StatCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Customers" value="12" hint="+2 this month" />
        <StatCard title="Active Subscriptions" value="9" hint="RDP seats billed" />
        <StatCard title="Pending Invoices" value="3" hint="Awaiting payment" />
        <StatCard title="MRR" value="$19,800" hint="~ from subscriptions" />
      </div>
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-6 md:p-8 shadow-md dark:shadow-lg transition-all duration-200">
        <div className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Welcome</div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Use the sidebar to manage invoices, subscriptions, and RDP accounts.
        </p>
      </div>
    </div>
  );
}