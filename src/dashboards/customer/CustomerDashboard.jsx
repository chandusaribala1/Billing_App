import React, { useState } from "react";
import { Menu, UserCircle2, LogOut, FileText, DollarSign } from "lucide-react";
import MyInvoicesPage from "./MyInvoicesPage.jsx";
import MyPaymentsPage from "./MyPaymentsPage.jsx";
import CustomerProfile from "./CustomerProfile.jsx";

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // Use state to manage the active page, just like in AdminDashboard
  const [activePage, setActivePage] = useState("profile"); // Set a default page

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens)
    console.log("Logging out...");
    // navigate("/login"); // No need for navigate if we redirect
    window.location.href = "/login";
  };

  const links = [
    { name: "Invoices", id: "invoices", icon: FileText },
    { name: "Payments", id: "payments", icon: DollarSign },
  ];

  // Render the component for the active page
  const renderPage = () => {
    switch (activePage) {
      case "invoices":
        return <MyInvoicesPage />;
      case "payments":
        return <MyPaymentsPage />;
      case "profile":
        return <CustomerProfile />;
      default:
        return <CustomerProfile />; // Fallback to profile page
    }
  };

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
          {sidebarOpen && <div>AccuBillify</div>}
        </div>
        <div className="sidebar-menu">
          {links.map((link, index) => (
            // Use a div with an onClick handler to change the activePage state
            <div
              key={index}
              className={`sidebar-menu-item ${activePage === link.id ? "active" : ""}`}
              onClick={() => setActivePage(link.id)}
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </div>
          ))}
        </div>
        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            className="sidebar-menu-item"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`main-content ${sidebarOpen ? "" : "collapsed"}`}>
        <header className="navbar">
          <div className="navbar-left">Customer Dashboard</div>
          <div className="navbar-right">
            {/* Use div for profile link as well to handle state change */}
            <div
              className={`navbar-profile-link ${activePage === "profile" ? "active" : ""}`}
              onClick={() => setActivePage("profile")}
            >
              <UserCircle2 size={18} />
              Profile
            </div>
            <button onClick={handleLogout} className="navbar-logout-link">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>
        <div className="page-content">
          {/* Render the selected page component */}
          {renderPage()}
        </div>
      </main>
      <style>{`
        /* Your CSS styles here */
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%; 
        }
        .dashboard-wrapper {
          width: 100vw;
          display: flex;
          height: 100vh;
          font-family: Arial, sans-serif;
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
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: ${sidebarOpen ? 'space-between' : 'center'};
        }
        .sidebar-header div {
          margin-left: ${sidebarOpen ? '10px' : '0'};
          font-weight: bold;
          font-size: 1.2rem;
          opacity: ${sidebarOpen ? '1' : '0'};
          transition: opacity 0.3s ease;
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
        .sidebar-menu-item:hover,
        .sidebar-menu-item.active {
          background: rgba(0,0,0,0.2);
        }
        .sidebar.collapsed .sidebar-menu-item span {
          display: none;
        }

        .main-content {
          width:100%;
          background: #f4f6f8;
          overflow-y: auto;
          height: 100vh;
        }

        .navbar {
          background: white;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          box-sizing: border-box;
        }
        .navbar-left {
          font-weight: 700;
          font-size: 1.5rem;
          color: #222;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .navbar-right {
            display: flex;
            align-items: center;
            gap: 15px;
            flex-shrink: 0;
        }
        .navbar-right a, .navbar-right div { /* Apply styles to both links and divs */
          color: #555;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 6px;
          transition: background-color 0.2s;
          cursor: pointer;
        }
        .navbar-right a:hover, .navbar-right div:hover {
          background-color: #eee;
        }
        .navbar-right a.active, .navbar-right div.active {
          background-color: #eee;
          color: #000;
        }
        .navbar-logout-link {
            color: #ef4444;
        }
        .navbar-logout-link:hover {
            background-color: #fee2e2;
            color: #dc2626;
        }

        .page-content {
          box-sizing: border-box;
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
          .sidebar.collapsed {
            transform: translateX(-100%);
            width: 0;
          }
          .sidebar-header {
            justify-content: center;
          }
          .sidebar-header div {
            opacity: 0;
            width: 0;
            overflow: hidden;
          }
          .sidebar-toggle-btn {
            margin: 0;
          }
          .main-content {
            margin-left: 0 !important;
          }
          .navbar-right {
            flex-wrap: wrap;
            justify-content: flex-end;
          }
          .navbar-right a, .navbar-right div {
            margin: 5px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerDashboard;