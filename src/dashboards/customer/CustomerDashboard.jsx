import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Menu, UserCircle2, LogOut } from "lucide-react"; // Added UserCircle2, LogOut for navbar
import MyInvoicesPage from "./MyInvoicesPage.jsx";
import MyPaymentsPage from "./MyPaymentsPage.jsx";
import CustomerProfile from "./CustomerProfile.jsx";

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const links = [
    { name: "Invoices", path: "/" }, // Invoices remains the default route in sidebar
    { name: "Payments", path: "payments" },
    // Removed "Profile" from here, it's moving to the navbar
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
          {sidebarOpen && <div>AccuBillify</div>} {/* Show name only when sidebar is open */}
        </div>
        <div className="sidebar-menu">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="sidebar-menu-item"
            >
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
            {/* Removed "Invoices" link from navbar */}
            {/* Added "Profile" to navbar */}
            <Link to="profile" className="navbar-profile-link">
                <UserCircle2 size={18} />
                Profile
            </Link>
            <Link to="/login" className="navbar-logout-link"> {/* Added class for consistency */}
                <LogOut size={18} />
                Logout
            </Link>
          </div>
        </header>

        <div className="page-content">
          <Routes>
            <Route path="/" element={<MyInvoicesPage />} />
            <Route path="payments" element={<MyPaymentsPage />} />
            <Route path="profile" element={<CustomerProfile />} />
          </Routes>
        </div>
      </main>

      {/* Styles */}
      <style>{`
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%; /* Ensure html/body take full width */
          overflow-x: hidden; /* Prevent horizontal scroll from external elements */
        }
        .dashboard-wrapper {
          width: 100vw;
          display: flex;
          height: 100vh;
          font-family: Arial, sans-serif;
          overflow: hidden; /* Prevent scroll on wrapper, let main-content handle it */
        }

        /* Sidebar styling like AdminDashboard */
        .sidebar {
          background: linear-gradient(125deg, #e374f4, #aa1bed, #844582, #a6dff4);
          color: white;
          width: 240px;
          flex-shrink: 0; /* Prevents sidebar from shrinking */
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
          justify-content: ${sidebarOpen ? 'space-between' : 'center'}; /* Adjust alignment */
        }
        .sidebar-header div { /* For AccuBillify text */
            margin-left: ${sidebarOpen ? '10px' : '0'};
            font-weight: bold;
            font-size: 1.2rem;
            opacity: ${sidebarOpen ? '1' : '0'}; /* Fade text when collapsed */
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
        .sidebar-menu-item.active { /* Added active state for sidebar items */
          background: rgba(0,0,0,0.2);
        }
        .sidebar.collapsed .sidebar-menu-item span {
          display: none;
        }

        /* Main Content */
        .main-content {
          flex-grow: 1;
          background: #f4f6f8;
          overflow-y: auto;
          height: 100vh;
        }
        /* Removed .main-content.collapsed rule */

        /* Navbar styling like AdminDashboard */
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
          width: 100%; /* Relative to main-content */
          box-sizing: border-box; /* Include padding in width */
        }
        .navbar-left {
          font-weight: 700;
          font-size: 1.5rem;
          color: #222;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 1;   /* Allows this element to shrink if needed */
          min-width: 0;     /* Ensures content can shrink below its intrinsic size */
          white-space: nowrap; /* Prevent text from wrapping */
          overflow: hidden;    /* Hide overflowing text */
          text-overflow: ellipsis; /* Add ellipsis for hidden text */
        }
        .navbar-right {
            display: flex;
            align-items: center;
            gap: 15px; /* Space between navbar links/buttons */
            flex-shrink: 0; /* Prevents this element from shrinking */
        }
        .navbar-right a {
          color: #555;
          text-decoration: none;
          font-weight: 600;
          display: flex; /* Allow icons in link */
          align-items: center;
          gap: 6px;
          padding: 6px 10px; /* Add padding for clickable area */
          border-radius: 6px;
          transition: background-color 0.2s;
        }
        .navbar-right a:hover {
          background-color: #eee;
        }
        .navbar-logout-link { /* Specific style for logout link */
            color: #ef4444;
        }
        .navbar-logout-link:hover {
            background-color: #fee2e2;
            color: #dc2626;
        }

        /* Page Content */
        .page-content {
          padding: 20px;
          box-sizing: border-box; /* Crucial for preventing overflow with padding */
        }

        /* Responsive behavior */
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
          .sidebar.collapsed { /* When sidebar is collapsed on mobile, it should hide completely */
            transform: translateX(-100%);
            width: 0;
          }
          .sidebar-header {
            justify-content: center;
          }
          .sidebar-header div { /* Hide AccuBillify text on mobile collapsed */
            opacity: 0;
            width: 0;
            overflow: hidden;
          }
          .sidebar-toggle-btn { /* Make toggle visible on mobile */
            margin: 0;
          }
          .main-content {
            margin-left: 0 !important; /* Always zero on mobile */
          }
          .navbar-right { /* Adjust navbar links on mobile */
            flex-wrap: wrap;
            justify-content: flex-end;
          }
          .navbar-right a {
            margin: 5px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CustomerDashboard;