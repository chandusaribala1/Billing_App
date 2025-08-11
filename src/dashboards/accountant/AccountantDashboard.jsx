import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

// ---------------- Navbar Component ----------------
const Navbar = () => {
  return (
    <div
      style={{
        height: "60px",
        background: "#4CAF50",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <h2>Accountant Dashboard</h2>
      <div>
        <button
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

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
        minHeight: "calc(100vh - 60px)" // 60px for navbar
      }}
    >
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map((link) => (
          <li key={link.path} style={{ margin: "10px 0" }}>
            <Link
              to={link.path}
              style={{
                color: location.pathname.includes(link.path) ? "#4CAF50" : "#fff",
                textDecoration: "none",
                fontWeight: location.pathname.includes(link.path) ? "bold" : "normal"
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
    <div>
      {/* Navbar at the top */}
      <Navbar />

      {/* Sidebar + Main Content */}
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
    </div>
  );
};

export default AccountantDashboard;
