import React, { useState } from "react";
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

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const financialSummary = {
    profit: 45000,
    expenses: 22000,
    cashFlow: 18000,
  };
  const salesData = [
    { id: 1, client: "John Doe", amount: 5000, date: "2025-01-15" },
    { id: 2, client: "Jane Smith", amount: 7000, date: "2025-02-12" },
    { id: 3, client: "Raj Kumar", amount: 4000, date: "2025-03-20" },
    { id: 4, client: "Maria Lopez", amount: 8000, date: "2025-04-25" },
    { id: 5, client: "Tim Lee", amount: 6000, date: "2025-05-10" },
  ];
  const monthlySales = [
    { month: "Jan", sales: 5000 },
    { month: "Feb", sales: 7000 },
    { month: "Mar", sales: 4000 },
    { month: "Apr", sales: 8000 },
    { month: "May", sales: 6000 },
  ];

  
  const expenseData = [
    { name: "Rent", value: 7000 },
    { name: "Salaries", value: 10000 },
    { name: "Utilities", value: 3000 },
    { name: "Supplies", value: 2000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


  const filteredSales = salesData.filter(sale =>
    sale.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="reports-container">
      <h1>Accountant Reports</h1>

  
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

 
      <div className="sales-report">
        <h2>Sales Report</h2>
        <input
          type="text"
          placeholder="Search by client name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
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
              filteredSales.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.client}</td>
                  <td>{sale.amount.toLocaleString()}</td>
                  <td>{sale.date}</td>
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
      <div className="charts">
        <div className="chart-box">
          <h3>Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlySales} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
