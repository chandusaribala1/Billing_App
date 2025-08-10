import React from "react";
import Sidebar from "../../Component/Sidebar.jsx";;
import { Routes, Route } from "react-router-dom";
import UsersPage from "./UsersPage.jsx";
import ReportsPage from "./ReportsPage.jsx";
import SettingsPage from "./SettingsPage.jsx";

const AdminDashboard = () => {
  const links = [
    { name: "Manage Users", path: "users" },
    { name: "Reports", path: "reports" },
    { name: "Settings", path: "settings" }
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={links} />
      <div style={{ padding: "20px", flex: 1 }}>
        <Routes>
          <Route path="users" element={<UsersPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;