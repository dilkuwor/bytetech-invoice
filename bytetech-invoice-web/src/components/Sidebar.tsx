import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ChartBarIcon, DocumentTextIcon, KeyIcon, ComputerDesktopIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const link = "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-neutral-700 transition-colors duration-200 text-neutral-700 dark:text-neutral-200";
const active = "bg-primary-100 dark:bg-primary-900 font-semibold text-primary-600 dark:text-primary-300";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 h-screen sticky top-0 hidden md:flex flex-col transition-all duration-300 ease-in-out shadow-sm`}
    >
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <div className="text-xl font-bold text-primary-600 dark:text-primary-400">ByteTech Invoice</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Admin</div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
          )}
        </button>
      </div>
      <nav className="p-3 space-y-1 flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          title={isCollapsed ? "Dashboard" : ""}
        >
          <ChartBarIcon className="w-5 h-5" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink
          to="/invoices"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          title={isCollapsed ? "Invoices" : ""}
        >
          <DocumentTextIcon className="w-5 h-5" />
          {!isCollapsed && <span>Invoices</span>}
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          title={isCollapsed ? "Subscriptions" : ""}
        >
          <KeyIcon className="w-5 h-5" />
          {!isCollapsed && <span>Subscriptions</span>}
        </NavLink>
        <NavLink
          to="/rdp-accounts"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          title={isCollapsed ? "RDP Accounts" : ""}
        >
          <ComputerDesktopIcon className="w-5 h-5" />
          {!isCollapsed && <span>RDP Accounts</span>}
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) => `${link} ${isActive ? active : ""}`}
          title={isCollapsed ? "Customers" : ""}
        >
          <UsersIcon className="w-5 h-5" />
          {!isCollapsed && <span>Customers</span>}
        </NavLink>
      </nav>
    </aside>
  );
}