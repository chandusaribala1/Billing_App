import React, { useState } from "react";

const InvoicesPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [invoices, setInvoices] = useState([
    { id: "INV001", customer: "John Doe", issueDate: "2025-08-01", dueDate: "2025-08-10", amount: 500, status: "Paid" },
    { id: "INV002", customer: "Jane Smith", issueDate: "2025-08-02", dueDate: "2025-08-12", amount: 300, status: "Pending" },
    { id: "INV003", customer: "Mark Wilson", issueDate: "2025-08-03", dueDate: "2025-08-13", amount: 800, status: "Overdue" }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: "", customer: "", issueDate: "", dueDate: "", amount: 0, status: "Pending" });

  const filteredInvoices = invoices.filter(inv =>
    (statusFilter === "All" || inv.status === statusFilter) &&
    (inv.id.toLowerCase().includes(search.toLowerCase()) ||
    inv.customer.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddInvoice = () => {
    if (!formData.id || !formData.customer) return alert("Invoice ID and Customer Name are required");
    setInvoices([...invoices, formData]);
    setFormData({ id: "", customer: "", issueDate: "", dueDate: "", amount: 0, status: "Pending" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  return (
    <>
      <style>{`
        .invoices-page { padding: 20px; background: #f1f5f9; min-height: 100vh; }
        h2 { margin-bottom: 15px; }
        .filters { display: flex; gap: 10px; margin-bottom: 15px; }
        input, select { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 8px 12px; border: none; border-radius: 4px; background: #2563eb; color: white; cursor: pointer; }
        button:hover { background: #1e40af; }
        table { width: 100%; border-collapse: collapse; background: white; }
        th, td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
        th { background: #e2e8f0; }
        .status-paid { color: green; font-weight: bold; }
        .status-pending { color: orange; font-weight: bold; }
        .status-overdue { color: red; font-weight: bold; }
        .actions button { margin-right: 5px; padding: 5px 8px; font-size: 12px; }
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); display: flex; justify-content: center; align-items: center; }
        .modal-content { background: white; padding: 20px; border-radius: 8px; width: 400px; }
        .modal-content input, .modal-content select { width: 100%; margin-bottom: 10px; }
      `}</style>

      <div className="invoices-page">
        <h2>Invoice Management</h2>

        {/* Filters */}
        <div className="filters">
          <input type="text" placeholder="Search by ID or customer" value={search} onChange={e => setSearch(e.target.value)} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
          <button onClick={() => setShowForm(true)}>+ Add Invoice</button>
        </div>

        {/* Invoice Table */}
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(inv => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.customer}</td>
                <td>{inv.issueDate}</td>
                <td>{inv.dueDate}</td>
                <td>{inv.amount}</td>
                <td className={`status-${inv.status.toLowerCase()}`}>{inv.status}</td>
                <td className="actions">
                  <button onClick={() => alert(JSON.stringify(inv, null, 2))}>View</button>
                  <button onClick={() => alert("Edit feature coming soon")}>Edit</button>
                  <button onClick={() => handleDelete(inv.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Invoice Modal */}
        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add New Invoice</h3>
              <input type="text" placeholder="Invoice ID" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
              <input type="text" placeholder="Customer Name" value={formData.customer} onChange={e => setFormData({...formData, customer: e.target.value})} />
              <input type="date" placeholder="Issue Date" value={formData.issueDate} onChange={e => setFormData({...formData, issueDate: e.target.value})} />
              <input type="date" placeholder="Due Date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
              <input type="number" placeholder="Amount" value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} />
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
              <div style={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                <button onClick={() => setShowForm(false)} style={{background: "#6b7280"}}>Cancel</button>
                <button onClick={handleAddInvoice}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InvoicesPage;
