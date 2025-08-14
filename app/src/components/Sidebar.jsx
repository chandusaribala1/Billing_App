import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const activeClass = "bg-blue-500 text-white";
  const linkClass = "block px-4 py-2 hover:bg-gray-200";

  return (
    <div className="bg-gray-900 text-white w-60 h-screen flex flex-col">
      <h2 className="text-2xl font-bold p-4">AccuBillify</h2>
      <nav className="flex-1">
        <Link to="/" className={`${linkClass} ${location.pathname === "/" ? activeClass : ""}`}>
          Dashboard
        </Link>
        <Link to="/invoices" className={`${linkClass} ${location.pathname === "/invoices" ? activeClass : ""}`}>
          Invoices
        </Link>
        <Link to="/payments" className={`${linkClass} ${location.pathname === "/payments" ? activeClass : ""}`}>
          Payments
        </Link>
        <Link to="/make-payment" className={`${linkClass} ${location.pathname === "/make-payment" ? activeClass : ""}`}>
          Make Payment
        </Link>
        <Link to="/reports" className={`${linkClass} ${location.pathname === "/reports" ? activeClass : ""}`}>
          Reports
        </Link>
        <Link to="/settings" className={`${linkClass} ${location.pathname === "/settings" ? activeClass : ""}`}>
          Settings
        </Link>
        <Link to="/about" className={`${linkClass} ${location.pathname === "/about" ? activeClass : ""}`}>
          About
        </Link>
      </nav>
    </div>
  );
}
