import React from "react";
import Sidebar from "../../Component/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import MyInvoicesPage from "./MyInvoicesPage.jsx";
import MyPaymentsPage from "./MyPaymentsPage.jsx";
import ProfilePage from "./ProfilePage.jsx";

const CustomerDashboard = () => {
  const links = [
    { name: "My Invoices", path: "invoices" },
    { name: "My Payments", path: "payments" },
    { name: "Profile", path: "profile" }
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={links} />
      <div style={{ padding: "20px", flex: 1 }}>
        <Routes>
          <Route path="invoices" element={<MyInvoicesPage />} />
          <Route path="payments" element={<MyPaymentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerDashboard;