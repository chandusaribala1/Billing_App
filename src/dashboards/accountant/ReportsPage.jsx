import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
});

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [financialSummary, setFinancialSummary] = useState({
    profit: 0,
    expenses: 0,
    cashFlow: 0,
  });

  // 🎯 Fetch invoices & expenses from backend
  const fetchReports = async () => {
    try {
      const [invoiceRes, expenseRes] = await Promise.all([
        api.get("/invoices"),
        api.get("/expenses"), // <-- make sure you have this endpoint
      ]);

      const invoicesData = invoiceRes.data;
      const expensesData = expenseRes.data || [];

      setInvoices(invoicesData);
      setExpenses(expensesData);

      // 💰 Calculate summary
      const totalSales = invoicesData.reduce(
        (sum, inv) => sum + (inv.totalAmount || 0),
        0
      );
      const totalExpenses = expensesData.reduce(
        (sum, exp) => sum + (exp.amount || 0),
        0
      );

      setFinancialSummary({
        profit: totalSales - totalExpenses,
        expenses: totalExpenses,
        cashFlow: totalSales - totalExpenses, // simple cashflow
      });
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 📊 Monthly Sales (grouped by month)
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

  // 🧾 Expense breakdown for PieChart
  const expenseData = expenses.map((exp) => ({
    name: exp.category || "Other",
    value: exp.amount,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
          <h3>Profit</h3>
          <p>₹{financialSummary.profit.toLocaleString()}</p>
        </div>
        <div className="card expenses">
          <h3>Expenses</h3>
          <p>₹{financialSummary.expenses.toLocaleString()}</p>
        </div>
        <div className="card cashflow">
          <h3>Cash Flow</h3>
          <p>₹{financialSummary.cashFlow.toLocaleString()}</p>
        </div>
      </div>

      {/* Sales Report Table */}
      <div className="sales-report">
        <h2>Sales Report</h2>
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

        <div className="chart-box">
          <h3>Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {expenseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
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
