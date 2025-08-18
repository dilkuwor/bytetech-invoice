import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Subscriptions from "./pages/Subscriptions";
import RdpAccounts from "./pages/RdpAccounts";
import Customers from "./pages/Customers";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/rdp-accounts" element={<RdpAccounts />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="*" element={<div className="p-6">Not found</div>} />
      </Routes>
    </Layout>
  );
}