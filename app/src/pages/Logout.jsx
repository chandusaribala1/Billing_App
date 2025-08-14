import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    console.log("Logging out...");
    setTimeout(() => {
      navigate("/"); // Redirect to dashboard
    }, 1000);
  }, [navigate]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Logging out...</h1>
    </div>
  );
}
