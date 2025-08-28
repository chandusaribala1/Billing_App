import React from "react";

const CustomerProfile = () => {
  return (
    <div className="profile-page">
      <style>{`
        .profile-page {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .profile-page h2 {
          margin-bottom: 20px;
          color: #2c3e50;
        }
        .profile-page p {
          margin: 8px 0;
          font-size: 16px;
        }
      `}</style>

      <h2>👤 My Profile</h2>
      <p><strong>Name:</strong> Demo User</p>
      <p><strong>Email:</strong> demo@example.com</p>
      <p><strong>Customer ID:</strong> 1</p>
    </div>
  );
};

export default CustomerProfile;
