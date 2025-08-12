import React, { useState } from "react";

const InvoicePage = () => {
  const [search, setSearch] = useState("");
  const [invoices, setInvoices] = useState([
    { id: "INV001", customer: "John Doe", date: "2025-08-01", due: "2025-08-10", amount: 250, status: "Paid" },
    { id: "INV002", customer: "Jane Smith", date: "2025-08-02", due: "2025-08-12", amount: 450, status: "Pending" },
    { id: "INV003", customer: "Michael Brown", date: "2025-08-03", due: "2025-08-14", amount: 150, status: "Overdue" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    id: "",
    customer: "",
    date: "",
    due: "",
    amount: "",
    status: "Pending",
  });

  // Filtered invoices
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.customer.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase())
  );

  // Handle form input changes
  const handleChange = (e) => {
    setNewInvoice({ ...newInvoice, [e.target.name]: e.target.value });
  };

  // Add new invoice
  const handleAddInvoice = () => {
    if (!newInvoice.id || !newInvoice.customer || !newInvoice.date || !newInvoice.due || !newInvoice.amount) {
      alert("Please fill in all fields.");
      return;
    }
    setInvoices([...invoices, newInvoice]);
    setNewInvoice({ id: "", customer: "", date: "", due: "", amount: "", status: "Pending" });
    setShowModal(false);
  };

  // Delete invoice
  const handleDelete = (id) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  return (
    <div className="invoice-page">
      <h2>Invoices</h2>
      <div className="actions">
        <input
          type="text"
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="add-btn" onClick={() => setShowModal(true)}>+ Add Invoice</button>
      </div>

      <table className="invoice-table">
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
          {filteredInvoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.customer}</td>
              <td>{inv.date}</td>
              <td>{inv.due}</td>
              <td>{inv.amount}</td>
              <td>
                <span className={`status ${inv.status.toLowerCase()}`}>
                  {inv.status}
                </span>
              </td>
              <td>
                <button className="view-btn">View</button>
                <button className="edit-btn">Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(inv.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding invoice */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Invoice</h3>
            <input name="id" placeholder="Invoice ID" value={newInvoice.id} onChange={handleChange} />
            <input name="customer" placeholder="Customer Name" value={newInvoice.customer} onChange={handleChange} />
            <input type="date" name="date" value={newInvoice.date} onChange={handleChange} />
            <input type="date" name="due" value={newInvoice.due} onChange={handleChange} />
            <input type="number" name="amount" placeholder="Amount" value={newInvoice.amount} onChange={handleChange} />
            <select name="status" value={newInvoice.status} onChange={handleChange}>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleAddInvoice}>Save</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS */}
      <style>{`
        .invoice-page { padding: 20px; font-family: Arial, sans-serif; }
        h2 { margin-bottom: 15px; color: #333; }
        .actions { display: flex; justify-content: space-between; margin-bottom: 15px; }
        .search-input { padding: 8px; width: 250px; border: 1px solid #ccc; border-radius: 5px; }
        .add-btn { background: green; color: white; padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; }
        .invoice-table { width: 100%; border-collapse: collapse; }
        .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 10px; }
        .invoice-table th { background: #f4f4f4; }
        .status { padding: 5px 10px; border-radius: 4px; color: white; font-size: 0.9em; }
        .status.paid { background: green; }
        .status.pending { background: orange; }
        .status.overdue { background: red; }
        button { margin-right: 5px; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
        .view-btn { background: #007bff; color: white; }
        .edit-btn { background: #ffc107; color: black; }
        .delete-btn { background: #dc3545; color: white; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
        .modal { background: white; padding: 20px; border-radius: 8px; width: 300px; display: flex; flex-direction: column; gap: 10px; }
        .modal input, .modal select { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
        .save-btn { background: green; color: white; }
        .cancel-btn { background: gray; color: white; }
      `}</style>
    </div>
  );
};

export default InvoicePage;
