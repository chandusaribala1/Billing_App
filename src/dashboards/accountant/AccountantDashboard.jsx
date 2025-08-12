
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import InvoicesPage from "./InvoicesPage.jsx";
import PaymentsPage from "./PaymentsPage.jsx";
import ReportsPage from "./ReportsPage.jsx";

const AccountantDashboard = () => {
  const links = [
    { name: "Invoices", path: "invoices" },
    { name: "Payments", path: "payments" },
    { name: "Reports", path: "reports" },
  ];

  return (
    <div className="dashboard-container">
     
      <nav className="navbar">
        <h2 className="navbar-title">Accountant Dashboard</h2>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="main-content">
       
        <aside className="sidebar">
          {links.map((link, index) => (
            <Link key={index} to={link.path} className="sidebar-link">
              {link.name}
            </Link>
          ))}
        </aside>

        <div className="page-content">
          <Routes>
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Routes>
        </div>
      </div>
      <style>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width:100vw;
          font-family: Arial, sans-serif;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #2c3e50;
          color: white;
        }
        .navbar-title {
          margin: 0;
        }
        .navbar-links a {
          margin-left: 20px;
          color: white;
          text-decoration: none;
        }
        .navbar-links a:hover {
          text-decoration: underline;
        }
        .main-content {
          display: flex;
          flex: 1;
        }
        .sidebar {
          width: 200px;
          background-color: #34495e;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
        }
        .sidebar-link {
          padding: 12px 20px;
          color: white;
          text-decoration: none;
        }
        .sidebar-link:hover {
          background-color: #3d566e;
        }
        .page-content {
          flex: 1;
          padding: 20px;
          background-color: #ecf0f1;
        }
      `}</style>
    </div>
  );
};

export default AccountantDashboard;
