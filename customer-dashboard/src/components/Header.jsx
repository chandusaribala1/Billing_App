import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white h-16 shadow-md px-6 flex justify-between items-center">
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
        Customer Dashboard
      </h1>

      {/* Right Side - Profile + Logout */}
      <div className="flex items-center gap-4">
        <Link
          to="/profile"
          className="text-gray-700 hover:text-blue-500 transition"
        >
          Profile
        </Link>
        <Link
          to="/logout"
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
        >
          Logout
        </Link>
      </div>
    </header>
  );
}
