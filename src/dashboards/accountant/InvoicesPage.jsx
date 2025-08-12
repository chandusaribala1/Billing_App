import React, { useState } from "react";

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, customer: "John Doe", date: "2025-08-01", amount: 250.0, status: "Paid" },
    { id: 2, customer: "Jane Smith", date: "2025-08-05", amount: 120.5, status: "Pending" },
    { id: 3, customer: "Acme Corp", date: "2025-08-08", amount: 980.75, status: "Overdue" }
  ]);
  const [message, setMessage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [newStatus, setNewStatus] = useState("Pending");
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [deletingInvoiceId, setDeletingInvoiceId] = useState(null);

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleSaveAdd = () => {
    if (newCustomer && !isNaN(newAmount)) {
      const newInvoice = {
        id: invoices.length > 0 ? Math.max(...invoices.map(i => i.id)) + 1 : 1,
        customer: newCustomer,
        date: newDate,
        amount: parseFloat(newAmount),
        status: newStatus
      };
      setInvoices([...invoices, newInvoice]);
      setMessage("New invoice added successfully.");
      setNewCustomer("");
      setNewAmount("");
      setNewDate(new Date().toISOString().slice(0, 10));
      setNewStatus("Pending");
      setShowAddForm(false);
    } else {
      setMessage("Invalid data. Please enter a customer name and a valid amount.");
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (id) => {
    const invoiceToEdit = invoices.find(invoice => invoice.id === id);
    setEditingInvoice(invoiceToEdit);
    setEditedCustomer(invoiceToEdit.customer);
    setEditedAmount(invoiceToEdit.amount);
    setEditedDate(invoiceToEdit.date);
    setEditedStatus(invoiceToEdit.status);
  };

  const handleSaveEdit = () => {
    setInvoices(invoices.map(invoice =>
      invoice.id === editingInvoice.id
        ? { ...invoice, customer: editedCustomer, amount: parseFloat(editedAmount), date: editedDate, status: editedStatus }
        : invoice
    ));
    setMessage(`Invoice #${editingInvoice.id} updated successfully.`);
    setEditingInvoice(null);
    setTimeout(() => setMessage(null), 3000);
  };
  
  const handleDelete = (id) => {
    setDeletingInvoiceId(id);
  };

  const confirmDelete = () => {
    setInvoices(invoices.filter(invoice => invoice.id !== deletingInvoiceId));
    setMessage(`Invoice #${deletingInvoiceId} deleted successfully.`);
    setDeletingInvoiceId(null);
    setTimeout(() => setMessage(null), 3000);
  };
  
  const handleDownload = (id) => {
    setMessage(`Downloading invoice #${id}...`);
    setTimeout(() => {
      setMessage(`Invoice #${id} download complete.`);
      setTimeout(() => setMessage(null), 3000);
    }, 2000);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "status-paid";
      case "Pending":
        return "status-pending";
      case "Overdue":
        return "status-overdue";
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1 className="title">Invoices</h1>
        <button className="add-button" onClick={handleAdd}>Add Invoice</button>
      </div>
      
      {message && <div className="message-box">{message}</div>}

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Invoice</h3>
            <input
              type="text"
              placeholder="Customer Name"
              value={newCustomer}
              onChange={(e) => setNewCustomer(e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Amount ($)"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="input-field"
            />
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="input-field"
            />
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="input-field"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            <div className="button-group">
              <button className="save-button" onClick={handleSaveAdd}>Save</button>
              <button className="cancel-button" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {editingInvoice && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Invoice #{editingInvoice.id}</h3>
            <input
              type="text"
              placeholder="Customer Name"
              value={editedCustomer}
              onChange={(e) => setEditedCustomer(e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Amount ($)"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              className="input-field"
            />
            <input
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
              className="input-field"
            />
            <select
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className="input-field"
            >
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
            <div className="button-group">
              <button className="save-button" onClick={handleSaveEdit}>Save</button>
              <button className="cancel-button" onClick={() => setEditingInvoice(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deletingInvoiceId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete invoice #{deletingInvoiceId}?</p>
            <div className="button-group">
              <button className="delete-button" onClick={confirmDelete}>Delete</button>
              <button className="cancel-button" onClick={() => setDeletingInvoiceId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th className="th">Invoice ID</th>
            <th className="th">Customer</th>
            <th className="th">Date</th>
            <th className="th">Amount ($)</th>
            <th className="th">Status</th>
            <th className="th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="td">{invoice.id}</td>
              <td className="td">{invoice.customer}</td>
              <td className="td">{invoice.date}</td>
              <td className="td">{invoice.amount.toFixed(2)}</td>
              <td className={`td ${getStatusClass(invoice.status)}`}>
                {invoice.status}
              </td>
              <td className="td action-buttons">
                <button className="edit-button" onClick={() => handleEdit(invoice.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(invoice.id)}>Delete</button>
                <button className="download-button" onClick={() => handleDownload(invoice.id)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`
        .container {
          font-family: 'Inter', sans-serif;
          background-color: #ffffff;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          max-width: 75rem;
          margin: 20px auto;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          
        }
        
        .title {
          color: #1f2937;
          font-size: 1.875rem;
          font-weight: 700;
        }
        
        .message-box {
            padding: 10px;
            margin-bottom: 20px;
            background-color: #d1fae5;
            color: #065f46;
            border-radius: 0.5rem;
            text-align: center;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 150%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: #ffffff;
          padding: 2rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 300px;
        }
        
        .add-form h3, .modal-content h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #1f2937;
        }
        
        .input-field {
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          width: 100%;
          box-sizing: border-box;
        }
        
        .button-group {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        
        .save-button, .cancel-button {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-weight: 500;
        }
        
        .save-button {
          background-color: #3b82f6;
          color: white;
        }
        
        .save-button:hover {
            background-color: #2563eb;
        }
        
        .cancel-button {
          background-color: #ef4444;
          color: white;
        }

        .cancel-button:hover {
            background-color: #dc2626;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        .th {
          background-color: #312e81;
          color: #f9fafb;
          padding: 1rem 1.5rem;
          text-align: left;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e5e7eb;
        }

        .td {
          padding: 1rem 1.5rem;
          white-space: nowrap;
          font-size: 0.875rem;
          color: #4b5563;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .table tbody tr:hover {
          background-color: #f3f4f6;
        }

        .table tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }

        .status-paid {
          color: #22c55e;
          font-weight: bold;
        }
        
        .status-pending {
          color: #f97316;
          font-weight: bold;
        }
        
        .status-overdue {
          color: #ef4444;
          font-weight: bold;
        }
        
        .add-button {
            background-color: #3b82f6;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
            font-weight: 500;
        }
        
        .add-button:hover {
            background-color: #2563eb;
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
        }
        
        .edit-button, .delete-button, .download-button {
            padding: 0.25rem 0.25rem;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
            font-weight: 500;
            
        }
        
        .edit-button {
            background-color: #facc15;
            color: #422006;
        }
        
        .edit-button:hover {
            background-color: #eab308;
        }
        
        .delete-button {
            background-color: #ef4444;
            color: white;
        }
        
        .delete-button:hover {
            background-color: #dc2626;
        }
        
        .download-button {
            background-color: #10b981;
            color: white;
        }
        
        .download-button:hover {
            background-color: #059669;
        }
      `}</style>
    </div>
  );
};

export default InvoicesPage;
