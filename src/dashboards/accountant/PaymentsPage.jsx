import React, { useState,useEffect } from "react";
import axios from "axios";
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
  const [payments, setPayments] = useState([]);
  
  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);
  // Download invoice PDF
const handleDownload = async (invoiceId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:8080/api/invoices/${invoiceId}/download`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "blob" // important for files
    });
    // Create a link to download
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_${invoiceId}.pdf`);
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    console.error("Download failed:", err);
  }
};

// Update payment status
// const handleUpdateStatus = async (paymentId, newStatus) => {
//   try {
//     const token = localStorage.getItem("token");
//     await axios.patch(`http://localhost:8080/api/payments/${paymentId}`, 
//       { status: newStatus },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     fetchPayments(); // Refresh data
//   } catch (err) {
//     console.error("Update failed:", err);
//   }
// };

// Delete payment
const handleDelete = async (paymentId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/api/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchPayments(); // Refresh data
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  // Filtered payments for table
  const filteredPayments = payments.filter(payment =>
    (statusFilter === "All" || payment.status === statusFilter) &&
    (payment.invoice?.id.toString().includes(searchTerm) ||
    payment.invoice?.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Summary cards
  const summaryData = {
    totalPaid: payments
      .filter(p => p.status === "PAID")
      .reduce((sum, p) => sum + Number(p.amount), 0),
    pending: payments.filter(p => p.status === "PENDING").length,
    overdue: payments.filter(p => p.status === "OVERDUE").length,
    refunds: payments.filter(p => p.status === "REFUNDED").length,
  };

  // Chart data: Payments over time (by month)
  const chartData = payments.reduce((acc, p) => {
    const month = new Date(p.paymentDate).toLocaleString("default", { month: "short" });
    const existing = acc.find(c => c.name === month);
    if (existing) existing.value += Number(p.amount);
    else acc.push({ name: month, value: Number(p.amount) });
    return acc;
  }, []);

  // Pie chart: Payment methods count
  const pieData = Object.entries(
    payments.reduce((acc, p) => {
      acc[p.method] = (acc[p.method] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

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
      <h1 style={styles.h3}>Payments </h1>

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
              <td style={styles.thTd}>{payment.invoice?.id}</td>
              <td style={styles.thTd}>{payment.invoice?.customer?.name || "N/A"}</td>
              <td style={styles.thTd}>₹{payment.amount || payment.invoice?.totalAmount}</td>
              <td style={styles.thTd}>{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : "N/A"}</td>
              <td style={{ ...styles.thTd, ...styles.statusText }}>{payment.status}</td>
              <td style={styles.thTd}>{payment.method}</td>
              <td style={styles.thTd}>{payment.transactionId}</td>
              <td style={styles.thTd}>
                <button  style={{ ...styles.actionsButton, color: "blue" }}
    onClick={() => {
      if (payment.invoice?.id) {
        handleDownload(payment.invoice.id);
      } else {
        console.error("No invoice ID found for payment", payment);
      }
    }}
  >
                  <Download size={18} />
                </button>
                {/* <button style={{ ...styles.actionsButton, color: "green" }}
                onClick={() => handleUpdateStatus(payment.id, "PAID")}>
                  <Send size={18} />
                </button> */}
                <button style={{ ...styles.actionsButton, color: "red" }}
                onClick={() => handleDelete(payment.id)}>
                  <CheckCircle size={18} />
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
