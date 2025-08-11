import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";

// ---------------- Sidebar Component ----------------
const Sidebar = ({ links }) => {
  const location = useLocation();

  return (
    <div
      style={{
        width: "200px",
        background: "#222",
        color: "#fff",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <h2>Accountant</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link) => (
          <li key={link.path} style={{ margin: "10px 0" }}>
            <Link
              to={link.path}
              style={{
                color: location.pathname.includes(link.path) ? "#4CAF50" : "#fff",
                textDecoration: "none"
              }}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ---------------- Pages ----------------
const InvoicesPage = () => (
  <div>
    <h1>Invoices</h1>
    <p>List of all invoices will appear here.</p>
  </div>
);

const PaymentsPage = () => (
  <div>
    <h1>Payments</h1>
    <p>List of all payments will appear here.</p>
  </div>
);

const ReportsPage = () => (
  <div>
    <h1>Reports</h1>
    <p>Reports and analytics will appear here.</p>
  </div>
);

// ---------------- Accountant Dashboard ----------------
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

// ---------------- Main App ----------------
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/accountant/invoices" />} />
        <Route path="/accountant/*" element={<AccountantDashboard />} />
      </Routes>
    </Router>
  );
}
