import React from "react";

export default function Dashboard() {
  const invoices = [
    { id: "#001", issued: "2024-04-01", due: "2024-04-15", amount: "$400", status: "Paid" },
    { id: "#002", issued: "2024-03-15", due: "2024-04-01", amount: "$800", status: "Unpaid" },
    { id: "#003", issued: "2024-02-20", due: "2024-03-05", amount: "$800", status: "Paid" },
    { id: "#004", issued: "2024-01-10", due: "2024-01-25", amount: "$250", status: "Partially Paid" },
  ];

  const payments = [
    { date: "2024-03-01", invoice: "#002", amount: "$800", method: "Credit Card", status: "Completed" },
    { date: "2024-02-28", invoice: "#003", amount: "$800", method: "Bank Transfer", status: "Completed" },
    { date: "2024-01-25", invoice: "#001", amount: "$400", method: "PayPal", status: "Completed" },
  ];

  const customers = [
    { name: "John Doe", email: "john@example.com", status: "Active", lastLogin: "2025-08-10" },
    { name: "Jane Smith", email: "jane@example.com", status: "Pending", lastLogin: "2025-08-09" },
    { name: "Michael Brown", email: "michael@example.com", status: "Inactive", lastLogin: "2025-08-08" },
  ];

  const statusClasses = {
    Paid: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
    "Partially Paid": "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Inactive: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Outstanding Balance</p>
          <h2 className="text-2xl font-bold">$1,850</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Total Paid</p>
          <h2 className="text-2xl font-bold">$12,450</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Invoices Due Soon</p>
          <h2 className="text-2xl font-bold">3</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Recent Transactions</p>
          <h2 className="text-2xl font-bold">$340</h2>
        </div>
      </div>

      {/* Invoices + Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices Table */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Invoices</h2>
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="p-2">Invoice #</th>
                <th className="p-2">Date Issued</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{inv.id}</td>
                  <td className="p-2">{inv.issued}</td>
                  <td className="p-2">{inv.due}</td>
                  <td className="p-2">{inv.amount}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[inv.status]}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Billing History & Reports */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Billing History & Reports</h2>
          <ul className="space-y-2">
            <li className="text-blue-600 cursor-pointer hover:underline">Monthly Spending</li>
            <li className="text-blue-600 cursor-pointer hover:underline">Payment Trends</li>
          </ul>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Payments</h2>
          <button className="border px-3 py-1 rounded text-sm">Filters</button>
        </div>
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Invoice ID</th>
              <th className="p-2">Amount Paid</th>
              <th className="p-2">Payment Method</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{pay.date}</td>
                <td className="p-2">{pay.invoice}</td>
                <td className="p-2">{pay.amount}</td>
                <td className="p-2">{pay.method}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[pay.status]}`}>
                    {pay.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Customers</h2>
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-gray-600 border-b">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Status</th>
              <th className="p-2">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-2">{c.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
