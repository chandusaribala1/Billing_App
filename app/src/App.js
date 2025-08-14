import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import MakePayment from "./pages/MakePayment";
import Reports from "./pages/Reports";
import Settings from "./pages/Setting";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex-1 bg-gray-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/make-payment" element={<MakePayment />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
