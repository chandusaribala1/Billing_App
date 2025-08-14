import { useState } from "react";

export default function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    { id: "#001", dateIssued: "2024-04-01", dueDate: "2024-04-15", amount: 400, status: "Paid", description: "Website Design Service" },
    { id: "#002", dateIssued: "2024-03-15", dueDate: "2024-04-01", amount: 800, status: "Unpaid", description: "SEO Optimization" },
    { id: "#003", dateIssued: "2024-02-20", dueDate: "2024-03-05", amount: 800, status: "Paid", description: "Hosting Package" },
    { id: "#004", dateIssued: "2024-01-10", dueDate: "2024-01-25", amount: 250, status: "Partially Paid", description: "Domain Registration" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-700 px-2 py-1 rounded";
      case "Unpaid": return "bg-red-100 text-red-700 px-2 py-1 rounded";
      case "Partially Paid": return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
      default: return "";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Invoices</h2>
      <table className="w-full bg-white border border-gray-200 rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Invoice #</th>
            <th className="p-3 border">Date Issued</th>
            <th className="p-3 border">Due Date</th>
            <th className="p-3 border">Amount</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="text-center">
              <td className="p-3 border">{inv.id}</td>
              <td className="p-3 border">{inv.dateIssued}</td>
              <td className="p-3 border">{inv.dueDate}</td>
              <td className="p-3 border">${inv.amount}</td>
              <td className="p-3 border">
                <span className={getStatusClass(inv.status)}>{inv.status}</span>
              </td>
              <td className="p-3 border">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => setSelectedInvoice(inv)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-3">Invoice Details</h3>
            <p><strong>ID:</strong> {selectedInvoice.id}</p>
            <p><strong>Date Issued:</strong> {selectedInvoice.dateIssued}</p>
            <p><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
            <p><strong>Amount:</strong> ${selectedInvoice.amount}</p>
            <p><strong>Status:</strong> {selectedInvoice.status}</p>
            <p><strong>Description:</strong> {selectedInvoice.description}</p>
            <button
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => setSelectedInvoice(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
