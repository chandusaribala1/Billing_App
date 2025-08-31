import React, { useState, useEffect } from "react";
import { User, Box, FileText, CreditCard, BarChart2, LogOut, UserCircle2, Menu } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import InvoicesPage from "./InvoicesPage.jsx";
import PaymentsPage from "./PaymentsPage.jsx";
import ReportsPage from "./ReportsPage.jsx";
import CustomersPage from "./CustomerPage.jsx";
import ProductsPage from "./ProductPage.jsx";

const AccountantDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [accountantName, setAccountantName] = useState("Profile");

  // Fetch the user's name from the JWT
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setAccountantName(decoded.sub || decoded.username || "Profile");
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  // Conditional rendering for the main content area
  const renderPage = () => {
    switch (activePage) {
      case "customers":
        return <CustomersPage />;
      case "products":
        return <ProductsPage />;
      case "invoices":
        return <InvoicesPage />;
      case "payments":
        return <PaymentsPage />;
      case "reports":
        return <ReportsPage />;
      default:
        // You can add a default dashboard view here if needed.
        // For now, it will just show the CustomerPage.
        return <CustomersPage />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login"; // Redirects to the login page
  };

  return (
    <>
      <style>{`
        /* Import all the CSS from the AdminDashboard */
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100vw;
          font-family: Arial, sans-serif;
        }
        .dashboard-wrapper {
          width: 100vw;
          display: flex;
          height: 100vh;
          overflow: hidden;
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
          font-size: 1.5rem;
          text-align: center; 
          border-bottom: 1px solid #3e4e5e; 
          user-select:none; 
        }
        .sidebar-menu { 
          flex-grow: 1; 
          padding: 10px 0; 
        }
        .sidebar-menu-item {
          padding: 12px 20px; 
          display: flex; 
          align-items: center; 
          gap: 12px; cursor: pointer; 
          color: #cfd8dc;
          font-weight: 500; 
          transition: background-color 0.2s; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis;
          user-select:none;
        }
        .sidebar-menu-item:hover, .sidebar-menu-item.active {
          background: #1c2733; 
          color: #fff;
        }
        .sidebar-menu-item svg { min-width: 20px; min-height: 20px; }
        .sidebar.collapsed .sidebar-menu-item span { display: none; }
        .main-content {
          flex-grow: 1;
          transition: margin-left 0.3s;
          background: #f4f6f8;
          overflow-y: auto;
          height: 100vh;
        }
        .main-content.collapsed { margin-left: 12px; }
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
        .sidebar-toggle-btn {
          background: fixed; 
          border: none; 
          cursor: pointer; 
          padding: 5px; 
          color: #f8f2f2ff;
          margin-right:12px;
        }
        .navbar-right {
          display: flex; 
          align-items: center; 
          gap: 15px; 
          font-weight: 600; 
          color: #555;
        }
        .navbar-right button {
          background: none; 
          border: none; 
          cursor: pointer; 
          color: #555; 
          display: flex; 
          align-items: center; 
          gap: 6px; 
          font-size: 1rem;
          padding: 6px 12px; 
          border-radius: 6px; 
          transition: background-color 0.2s;
          user-select:none;
        }
        .navbar-right button:hover { 
          background-color: #eee; 
        }
        .search-bar {
          display: flex;
          justify-content: center;
          margin: 20px 25px 30px;
        }
        .search-bar input {
          width: 300px;
          padding: 10px 15px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 25px;
          outline: none;
          transition: border-color 0.3s;
        }
        .search-bar input:focus {
          border-color: #4caf50;
        }
        .search-bar svg {
          position: relative;
          left: -30px;
          top: 10px;
          color: #888;
          pointer-events: none;
        }
        /* Tables, KPI, and Chart styles can also be copied here if you want a dashboard page for the accountant. */
      `}</style>
      <div className="dashboard-wrapper">
        <nav className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
          {!sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden"
              onClick={() => setSidebarOpen(true)}
            ></div>
          )}
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
            <div
              className={`sidebar-menu-item ${activePage === "customers" ? "active" : ""}`}
              onClick={() => setActivePage("customers")}
            >
              <User size={20} />
              <span>Customers</span>
            </div>
            <div
              className={`sidebar-menu-item ${activePage === "products" ? "active" : ""}`}
              onClick={() => setActivePage("products")}
            >
              <Box size={20} />
              <span>Products / Services</span>
            </div>
            <div
              className={`sidebar-menu-item ${activePage === "invoices" ? "active" : ""}`}
              onClick={() => setActivePage("invoices")}
            >
              <FileText size={20} />
              <span>Invoices</span>
            </div>
            <div
              className={`sidebar-menu-item ${activePage === "payments" ? "active" : ""}`}
              onClick={() => setActivePage("payments")}
            >
              <CreditCard size={20} />
              <span>Payments</span>
            </div>
            <div
              className={`sidebar-menu-item ${activePage === "reports" ? "active" : ""}`}
              onClick={() => setActivePage("reports")}
            >
              <BarChart2 size={20} />
              <span>Reports</span>
            </div>
            <div className={`sidebar-menu-item`}>
              <UserCircle2 size={18} />
              <span>{accountantName}</span>
            </div>
          </div>
        </nav>

        <main className={`main-content ${sidebarOpen ? "" : "collapsed"}`}>
          <header className="navbar">
            <div className="navbar-left">Accountant Dashboard</div>
            <div className="navbar-right">
              <button onClick={() => setActivePage("dashboard")}>
                <BarChart2 size={18} />
                Home
              </button>
              <button onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </header>

          <div className="page-content">
            {renderPage()}
          </div>
        </main>
      </div>
    </>
  );
};

export default AccountantDashboard;