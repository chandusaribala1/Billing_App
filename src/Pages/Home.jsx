import React from "react";
import Navbar from "../Component/Navbar.jsx";
import "./Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="promo-box">
          <img src="/logo.png" alt="App Logo" className="promo-logo" />
          <h1>Welcome to AccuBilliify</h1>
          <p>Manage invoices, payments, and users with role-based dashboards.</p>
        </div>
      </div>
    </>
  );
};

export default Home;