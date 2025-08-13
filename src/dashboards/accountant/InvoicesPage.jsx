import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Download } from "lucide-react"; // outline icons
import { FaEdit } from "react-icons/fa";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, customer: "John Doe", date: "2025-08-01", dueDate: "2025-08-10", amount: 250.0, status: "Paid" },
    { id: 2, customer: "Jane Smith", date: "2025-08-05", dueDate: "2025-08-12", amount: 120.5, status: "Pending" },
    { id: 3, customer: "Acme Corp", date: "2025-08-08", dueDate: "2025-08-15", amount: 980.75, status: "Pending" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    customer: "",
    date: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10),
    amount: "",
    status: "Pending"
  });

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setInvoices(prev =>
      prev.map(inv =>
        inv.status !== "Paid" && inv.dueDate < today
          ? { ...inv, status: "Overdue" }
          : inv
      )
    );
  }, []);

  const filteredInvoices = invoices.filter(inv =>
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.date.includes(searchTerm) ||
    inv.dueDate.includes(searchTerm) ||
    inv.amount.toString().includes(searchTerm)
  );

  const handleAddInvoice = () => {
    setShowForm(true);
    setEditingInvoice(null);
    setFormData({
      customer: "",
      date: new Date().toISOString().slice(0, 10),
      dueDate: new Date().toISOString().slice(0, 10),
      amount: "",
      status: "Pending"
    });
  };

  const handleSave = () => {
    if (!formData.customer || isNaN(formData.amount) || formData.amount <= 0) {
      setMessage("Please enter valid customer name and amount.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    if (editingInvoice) {
      setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? { ...formData, id: inv.id, amount: parseFloat(formData.amount) } : inv));
      setMessage(`Invoice #${editingInvoice.id} updated successfully.`);
    } else {
      const newId = invoices.length ? Math.max(...invoices.map(i => i.id)) + 1 : 1;
      setInvoices([...invoices, { ...formData, id: newId, amount: parseFloat(formData.amount) }]);
      setMessage("New invoice added successfully.");
    }
    setShowForm(false);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setFormData({ ...invoice });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setInvoices(invoices.filter(inv => inv.id !== id));
    setMessage(`Invoice #${id} deleted successfully.`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDownload = (id) => {
    setMessage(`Downloading invoice #${id}...`);
    setTimeout(() => {
      setMessage(`Invoice #${id} download complete.`);
      setTimeout(() => setMessage(null), 3000);
    }, 1500);
  };

  const exportCSV = () => {
    const headers = ["ID,Customer,Date,Due Date,Amount,Status"];
    const rows = invoices.map(inv => `${inv.id},${inv.customer},${inv.date},${inv.dueDate},${inv.amount},${inv.status}`);
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices_report.csv";
    a.click();
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1>Invoices</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-button" onClick={handleAddInvoice}>Add Invoice</button>
          <button className="export-button" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      {message && <div className="message-box">{message}</div>}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingInvoice ? `Edit Invoice #${editingInvoice.id}` : "Add New Invoice"}</h3>
            <input type="text" placeholder="Customer Name" value={formData.customer} onChange={(e) => setFormData({ ...formData, customer: e.target.value })} />
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
            <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="Paid">Paid</option>
              <option value="Partially Paid">Partially Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            <div className="button-group">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Amount</th>
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
              <td>{inv.dueDate}</td>
              <td>₹{inv.amount.toFixed(2)}</td>
              <td className="status-text">{inv.status}</td>
              <td>
                <FaEdit title="Edit Invoice" className="icon edit-icon" onClick={() => handleEdit(inv)} />
                <Trash2 title="Delete Invoice" className="icon delete-icon" onClick={() => handleDelete(inv.id)} />
                <Download title="Download Invoice" className="icon download-icon" onClick={() => handleDownload(inv.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .container { font-family: Arial, sans-serif; background: white; padding: 20px; border-radius: 8px; }
        .header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .header-actions { display: flex; gap: 10px; }
        .search-input { padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
        .add-button, .export-button { padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; }
        .add-button { background: #3498db; color: white; }
        .export-button { background: #2ecc71; color: white; }
        .message-box { padding: 8px; background: #d1fae5; color: #065f46; border-radius: 4px; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
        .status-text { color: black; font-weight: bold; }
        .icon { margin-right: 8px; cursor: pointer; font-size: 18px; vertical-align: middle; }
        .edit-icon { background-color: white; color: #28a745; } /* green outline */
        .delete-icon { backgorund-color: white; color: #dc3545; } /* red outline */
        .download-icon { background-color: color: black; } /* plain black */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
        .modal-content { background: white; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; gap: 10px; }
        .button-group { display: flex; justify-content: flex-end; gap: 10px; }
        .save-button { background: #3498db; color: white; padding: 5px 10px; border: none; border-radius: 4px; }
        .cancel-button { background: #e74c3c; color: white; padding: 5px 10px; border: none; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default InvoicesPage;
