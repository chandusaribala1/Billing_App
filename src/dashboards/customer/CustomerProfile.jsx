<<<<<<< HEAD
import React, { useState } from "react";

const CustomerProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@email.com",
    phone: "+91 9876543210",
    dob: "1995-06-15",
    gender: "Male",
    address: "123, MG Road, Bengaluru",
    company: "AccuBillify Pvt Ltd",
    role: "Customer",
    country: "India",
    username: "johndoe123",
    billingAddress: "456, Residency Road, Bengaluru",
    subscription: "Pro",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    twoFactorAuth: false,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name.includes("notifications")) {
      const notifType = name.split(".")[1];
      setProfile({
        ...profile,
        notifications: { ...profile.notifications, [notifType]: checked },
      });
    } else if (name === "twoFactorAuth") {
      setProfile({ ...profile, twoFactorAuth: checked });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSave = () => {
    if (profile.password && profile.password !== profile.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Profile Updated Successfully!");
    console.log("Updated Profile:", profile);
  };

  const handleCancel = () => {
    window.location.reload();
  };
=======
import React from "react";
>>>>>>> 9f5c087768bd9dfb788a3a999f8200639ae3e43d

const CustomerProfile = () => {
  return (
    <div className="profile-page">
      <style>{`
<<<<<<< HEAD
      
        .profile-container {
          
          display: flex;
          justify-content: center;
          padding: 40px;
          background: #f3f4f6;
          min-height: 100vh;
=======
        .profile-page {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
>>>>>>> 9f5c087768bd9dfb788a3a999f8200639ae3e43d
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

<<<<<<< HEAD
export default CustomerProfile;
=======
export default CustomerProfile;
>>>>>>> 9f5c087768bd9dfb788a3a999f8200639ae3e43d
