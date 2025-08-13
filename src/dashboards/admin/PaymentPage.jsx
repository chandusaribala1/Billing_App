import React, { useState } from "react";
import {
  Search,
  CreditCard,
  Clock,
  AlertCircle,
  RotateCcw,
  Download,
  Send,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

const PaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const payments = [
    { id: 1, invoice: "#INV001", client: "John Doe", amount: 5000, date: "2025-08-01", status: "Paid", method: "Credit Card", transactionId: "TXN12345" },
    { id: 2, invoice: "#INV002", client: "Jane Smith", amount: 2500, date: "2025-08-03", status: "Pending", method: "UPI", transactionId: "TXN12346" },
    { id: 3, invoice: "#INV003", client: "Raj Kumar", amount: 4500, date: "2025-07-28", status: "Overdue", method: "Bank Transfer", transactionId: "TXN12347" },
    { id: 4, invoice: "#INV004", client: "Maria Lopez", amount: 1200, date: "2025-08-05", status: "Refunded", method: "Cash", transactionId: "TXN12348" }
  ];

  const summaryData = {
    totalPaid: payments.filter(p => p.status === "Paid").reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === "Pending").length,
    overdue: payments.filter(p => p.status === "Overdue").length,
    refunds: payments.filter(p => p.status === "Refunded").length
  };

  const filteredPayments = payments.filter(payment =>
    (statusFilter === "All" || payment.status === statusFilter) &&
    (payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoice.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const chartData = [
    { name: "Jan", value: 3000 },
    { name: "Feb", value: 4500 },
    { name: "Mar", value: 2000 },
    { name: "Apr", value: 6000 },
    { name: "May", value: 3500 },
    { name: "Jun", value: 5000 }
  ];

  const pieData = [
    { name: "Credit Card", value: 2 },
    { name: "UPI", value: 1 },
    { name: "Bank Transfer", value: 1 },
    { name: "Cash", value: 1 }
  ];

  const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0"];

  const styles = {
    paymentsContainer: { padding: 20, fontFamily: "Arial, sans-serif" },
    h1: { marginBottom: 20 },
    summaryCards: { display: "flex", gap: 15, marginBottom: 20 },
    card: {
      background: "#f4f4f4",
      padding: 15,
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontWeight: "bold"
    },
    filters: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 15
    },
    searchBox: {
      display: "flex",
      alignItems: "center",
      border: "1px solid #ccc",
      padding: "5px 10px",
      borderRadius: 5
    },
    searchInput: { border: "none", outline: "none", marginLeft: 5 },
    table: { width: "100%", borderCollapse: "collapse", marginBottom: 20 },
    thTd: { padding: 10, border: "1px solid #ddd", verticalAlign: "middle" },
    statusText: { fontWeight: "normal" }, // Normal font for status
    actionsButton: {
      margin: "0 3px",
      padding: 5,
      border: "none",
      cursor: "pointer",
      borderRadius: 4,
      background: "transparent",
      fontSize: 16,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30
    },
    charts: { display: "flex", gap: 20 },
    chart: {
      flex: 1,
      background: "#fff",
      padding: 15,
      borderRadius: 8,
      border: "1px solid #ddd"
    }
  };

  return (
    <div style={styles.paymentsContainer}>
      <h1 style={styles.h1}>Payments Dashboard</h1>

      {/* Summary Cards */}
      <div style={styles.summaryCards}>
        <div style={styles.card}>
          <CreditCard /> <span>Total Paid: ₹{summaryData.totalPaid}</span>
        </div>
        <div style={styles.card}>
          <Clock /> <span>Pending: {summaryData.pending}</span>
        </div>
        <div style={styles.card}>
          <AlertCircle /> <span>Overdue: {summaryData.overdue}</span>
        </div>
        <div style={styles.card}>
          <RotateCcw /> <span>Refunds: {summaryData.refunds}</span>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by client or invoice..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
          <option>Refunded</option>
        </select>
      </div>

      {/* Payments Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thTd}>Invoice</th>
            <th style={styles.thTd}>Client</th>
            <th style={styles.thTd}>Amount</th>
            <th style={styles.thTd}>Date</th>
            <th style={styles.thTd}>Status</th>
            <th style={styles.thTd}>Method</th>
            <th style={styles.thTd}>Transaction ID</th>
            <th style={styles.thTd}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(payment => (
            <tr key={payment.id}>
              <td style={styles.thTd}>{payment.invoice}</td>
              <td style={styles.thTd}>{payment.client}</td>
              <td style={styles.thTd}>₹{payment.amount}</td>
              <td style={styles.thTd}>{payment.date}</td>
              <td style={{ ...styles.thTd, ...styles.statusText }}>{payment.status}</td>
              <td style={styles.thTd}>{payment.method}</td>
              <td style={styles.thTd}>{payment.transactionId}</td>
              <td style={styles.thTd}>
                <button style={{ ...styles.actionsButton, color: "green" }}>
                  <Download size={18} />
                </button>
                <button style={{ ...styles.actionsButton, color: "green" }}>
                  <Send size={18} />
                </button>
                <button style={{ ...styles.actionsButton, color: "green" }}>
                  <CheckCircle size={18} />
                </button>
                <button style={{ ...styles.actionsButton, color: "red" }}>
                  <XCircle size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Charts */}
      <div style={styles.charts}>
        <div style={styles.chart}>
          <h3>Payments Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={styles.chart}>
          <h3>Payment Methods</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
