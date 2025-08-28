import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import MyInvoicesPage from "./MyInvoicesPage.jsx";
import MyPaymentsPage from "./MyPaymentsPage.jsx";
import CustomerProfile from "./CustomerProfile.jsx";

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const links = [
    { name: "My Invoices", path: "invoices" },
    { name: "My Payments", path: "payments" },
    { name: "Profile", path: "profile" },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <nav className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-header">
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>
        </div>
        <div className="sidebar-menu">
          {links.map((link, index) => (
            <Link key={index} to={`/customer/${link.path}`} className="sidebar-menu-item">
  <span>{link.name}</span>
</Link>

          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? "" : "collapsed"}`}>
        <header className="navbar">
          <div className="navbar-left">Customer Dashboard</div>
          <div className="navbar-right">
            <Link to="/">Home</Link>
            <Link to="/login">Logout</Link>
          </div>
        </header>

        <div className="page-content">
          <Routes>
            <Route index element={<MyInvoicesPage />} />
            <Route path="invoices" element={<MyInvoicesPage />} />
            <Route path="payments" element={<MyPaymentsPage />} />
            <Route path="profile" element={<CustomerProfile />} />
          </Routes>
        </div>
      </main>

      {/* Styles */}
      <style>{`
        .dashboard-wrapper {
          width:100vw;
          display: flex;
          height: 100vh;
          font-family: Arial, sans-serif;
        }

        .sidebar {
          background: linear-gradient(125deg, #e374f4, #aa1bed, #844582, #a6dff4);
          color: white;
          width: 240px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
        }
        .sidebar.collapsed {
          width: 60px;
        }
        .sidebar-header {
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .sidebar-toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: white;
        }
        .sidebar-menu {
          flex-grow: 1;
        }
        .sidebar-menu-item {
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #f1f1f1;
          text-decoration: none;
          transition: background-color 0.2s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-menu-item:hover {
          background: rgba(0,0,0,0.2);
        }
        .sidebar.collapsed .sidebar-menu-item span {
          display: none;
        }

        .main-content {
          flex-grow: 1;
          background: #f4f6f8;
          overflow-y: auto;
          height: 100vh;
          transition: margin-left 0.3s;
        }
        .main-content.collapsed {
          margin-left: 12px;
        }

        .navbar {
          background: white;
          padding: 15px 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-left {
          font-weight: 700;
          font-size: 1.5rem;
          color: #222;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .navbar-right a {
          margin-left: 20px;
          color: #555;
          text-decoration: none;
          font-weight: 600;
        }
        .navbar-right a:hover {
          background-color: #eee;
          padding: 6px 10px;
          border-radius: 6px;
        }

        .page-content {
          padding: 20px;
        }

        @media (max-width: 900px) {
          .sidebar {
            position: fixed;
            z-index: 1000;
            height: 100%;
            left: 0;
            top: 0;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-content {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerDashboard;
