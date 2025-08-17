import { useState } from "react";

export default function Payments() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const payments = [
    { id: "P-1001", date: "2024-04-05", invoiceId: "#001", amount: 400, method: "Credit Card", status: "Successful" },
    { id: "P-1002", date: "2024-03-20", invoiceId: "#003", amount: 800, method: "UPI", status: "Successful" },
    { id: "P-1003", date: "2024-03-01", invoiceId: "#002", amount: 300, method: "Net Banking", status: "Failed" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <table className="w-full bg-white border border-gray-200 rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Payment ID</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Invoice #</th>
            <th className="p-3 border">Amount</th>
            <th className="p-3 border">Method</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="p-3 border">{p.id}</td>
              <td className="p-3 border">{p.date}</td>
              <td className="p-3 border">{p.invoiceId}</td>
              <td className="p-3 border">${p.amount}</td>
              <td className="p-3 border">{p.method}</td>
              <td className="p-3 border">{p.status}</td>
              <td className="p-3 border">
                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setSelectedPayment(p)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Payment Details</h3>
            <p><strong>ID:</strong> {selectedPayment.id}</p>
            <p><strong>Date:</strong> {selectedPayment.date}</p>
            <p><strong>Invoice #:</strong> {selectedPayment.invoiceId}</p>
            <p><strong>Amount:</strong> ${selectedPayment.amount}</p>
            <p><strong>Method:</strong> {selectedPayment.method}</p>
            <p><strong>Status:</strong> {selectedPayment.status}</p>
            <button className="mt-4 bg-red-500 text-white px-3 py-1 rounded" onClick={() => setSelectedPayment(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
