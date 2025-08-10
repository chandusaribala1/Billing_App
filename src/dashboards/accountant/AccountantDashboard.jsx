import React from "react";
import Sidebar from "../../Component/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import InvoicesPage from "./InvoicesPage.jsx";
import PaymentsPage from "./PaymentsPage.jsx";
import ReportsPage from "./ReportsPage.jsx";

const AccountantDashboard = () => {
  const links = [
    { name: "Invoices", path: "invoices" },
    { name: "Payments", path: "payments" },
    { name: "Reports", path: "reports" }
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={links} />
      <div style={{ padding: "20px", flex: 1 }}>
        <Routes>
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AccountantDashboard;