import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// 🎯 Moved the axios instance creation to a proper scope
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

// 🎯 Use an interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [financialSummary, setFinancialSummary] = useState({
    totalSales: 0,
    cashFlow: 0,
  });

  // 🎯 Fetch invoices for the current month from backend
  const fetchReports = async () => {
    try {
      const today = new Date();
      // Month is 0-indexed in JS, but backend expects 1-indexed month, so add 1
      const month = today.getFullYear() + "-" + (today.getMonth() + 1);

      // The backend returns a list of invoices, not a map
      const invoiceRes = await api.get(`/invoices/reports/monthly?month=${month}`);
      const invoicesData = invoiceRes.data;

      // Calculate total sales and cash flow from the fetched data
      const totalSales = invoicesData.reduce((sum, inv) => sum + inv.totalAmount, 0);

      setInvoices(invoicesData);
      setFinancialSummary({
        totalSales: totalSales,
        cashFlow: totalSales, // Assuming cash flow is equal to total sales for this report
      });
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 📊 Monthly Sales (grouped by month)
  // This logic is now redundant since the backend already sends monthly data
  // But we'll keep it for the BarChart to show grouped data
  const monthlySales = invoices.reduce((acc, inv) => {
    const month = new Date(inv.dueDate).toLocaleString("default", {
      month: "short",
    });
    const existing = acc.find((m) => m.month === month);
    if (existing) {
      existing.sales += inv.totalAmount;
    } else {
      acc.push({ month, sales: inv.totalAmount });
    }
    return acc;
  }, []);

  // 🔎 Filter sales by customer name
  const filteredSales = invoices.filter((inv) =>
    inv.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="reports-container">
      <h1>Accountant Reports</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card profit">
          <h3>Total Sales (This Month)</h3>
          <p>₹{financialSummary.totalSales.toLocaleString()}</p>
        </div>
        <div className="card cashflow">
          <h3>Cash Flow (This Month)</h3>
          <p>₹{financialSummary.cashFlow.toLocaleString()}</p>
        </div>
      </div>

      {/* Sales Report Table */}
      <div className="sales-report">
        <h2>Sales Report (This Month)</h2>
        <input
          type="text"
          placeholder="Search by client name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Amount (₹)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.length > 0 ? (
              filteredSales.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.customer?.name}</td>
                  <td>{inv.totalAmount.toLocaleString()}</td>
                  <td>{inv.dueDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No sales found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart-box">
          <h3>Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={monthlySales}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <style>{`
        .reports-container {
          font-family: Arial, sans-serif;
          padding: 20px;
          max-width: 1100px;
          margin: auto;
        }
        h1 {
          margin-bottom: 30px;
          text-align: center;
          color: #222;
        }
        .summary-cards {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .card {
          flex: 1 1 30%;
          background: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 2px 6px rgb(0 0 0 / 0.1);
        }
        .card h3 {
          margin-bottom: 10px;
          color: #555;
        }
        .card p {
          font-size: 1.8rem;
          font-weight: bold;
          color: #111;
        }
        .card.profit { border-top: 5px solid #4caf50; }
        .card.expenses { border-top: 5px solid #f44336; }
        .card.cashflow { border-top: 5px solid #2196f3; }

        .sales-report h2 {
          margin-bottom: 15px;
          color: #333;
        }
        .search-input {
          padding: 8px 12px;
          font-size: 1rem;
          margin-bottom: 15px;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 100%;
          max-width: 300px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 40px;
        }
        th, td {
          text-align: left;
          padding: 12px 15px;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f0f0f0;
        }

        .charts {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .chart-box {
          flex: 1 1 45%;
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
          min-width: 300px;
        }
        .chart-box h3 {
          margin-bottom: 20px;
          text-align: center;
          color: #444;
        }

        @media (max-width: 768px) {
          .summary-cards {
            flex-direction: column;
            gap: 15px;
          }
          .charts {
            flex-direction: column;
            gap: 30px;
          }
          .chart-box {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportsPage;