import React, { useState } from "react";
import {
  User,
  Calendar,
  CreditCard,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  DollarSign,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerPage = () => {
  const navigate = useNavigate();

  const styles = `
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .page-container {
      padding: 20px;
      min-height: 100vh;
      background: #f3f4f6;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 20px;
      align-items: center;
    }
    .page-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }
    .search-input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      width: 250px;
      outline: none;
    }
    .btn {
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .btn-blue { background: #2563eb; color: #fff; }
    .btn-blue:hover { background: #1d4ed8; }
    .btn-green { background: #059669; color: #fff; }
    .btn-green:hover { background: #047857; }
    .btn-red { background: #dc2626; color: #fff; }
    .btn-red:hover { background: #b91c1c; }
    .btn-gray { background: #9ca3af; color: #fff; }
    .btn-gray:hover { background: #6b7280; }
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }
    th, td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      text-align: left;
      font-size: 0.9rem;
    }
    th {
      background: #f9fafb;
      color: #555;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    tr:hover { background: #f3f4f6; }
    .badge {
      padding: 4px 8px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: bold;
    }
    .badge-green { background: #d1fae5; color: #065f46; }
    .badge-yellow { background: #fef3c7; color: #92400e; }
    .profile-card {
      background: #fff;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .profile-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 10px;
    }
    .avatar {
      width: 60px;
      height: 60px;
      background: #bfdbfe;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /* Icon button styles */
    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      position: relative;
    }
    .icon-btn:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 125%;
      left: 50%;
      transform: translateX(-50%);
      background: #333;
      color: #fff;
      font-size: 0.75rem;
      padding: 3px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }
    /* Modal styles */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 400px;
    }
    .form-group {
      margin-bottom: 12px;
    }
    .form-group label {
      display: block;
      margin-bottom: 4px;
      font-weight: bold;
    }
    .form-group input, .form-group select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  `;

  const initialCustomers = [
    {
      id: "CUST-001",
      name: "John Doe",
      email: "john@example.com",
      joined: "2023-01-15",
      outstandingBalance: 1200.5,
      status: "Active",
    },
  ];

  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState("add"); // add or edit
  const [formData, setFormData] = useState({ id: "", name: "", email: "", joined: "", outstandingBalance: 0, status: "Active" });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleDelete = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
    setShowDeleteModal(false);
  };

  const openForm = (mode, customer = null) => {
    setFormMode(mode);
    if (mode === "edit" && customer) {
      setFormData(customer);
    } else {
      setFormData({ id: "", name: "", email: "", joined: "", outstandingBalance: 0, status: "Active" });
    }
    setShowFormModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formMode === "add") {
      setCustomers([...customers, { ...formData, id: `CUST-${String(customers.length + 1).padStart(3, "0")}` }]);
    } else {
      setCustomers(customers.map(c => (c.id === formData.id ? formData : c)));
    }
    setShowFormModal(false);
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{styles}</style>
      <div className="page-container">
        <div className="header-row">
          <h2 className="page-title">Customers</h2>
          <div>
            <button className="btn btn-gray" onClick={() => navigate("/admin")}>
              <Home size={16} /> Home
            </button>
            <input
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginLeft: "8px" }}
            />
            <button className="btn btn-blue" style={{ marginLeft: "8px" }} onClick={() => openForm("add")}>
              <Plus size={16} /> Add Customer
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Outstanding</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>₹{c.outstandingBalance}</td>
                <td>
                  <span className={`badge ${c.status === "Active" ? "badge-green" : "badge-yellow"}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <button className="icon-btn" data-tooltip="Edit" onClick={() => openForm("edit", c)}>
                    <Edit size={18} />
                  </button>
                  <button className="icon-btn" data-tooltip="Delete" onClick={() => handleDelete(c)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Customer Modal */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{formMode === "add" ? "Add Customer" : "Edit Customer"}</h4>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Joined Date</label>
                <input type="date" value={formData.joined} onChange={(e) => setFormData({ ...formData, joined: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Outstanding Balance</label>
                <input type="number" value={formData.outstandingBalance} onChange={(e) => setFormData({ ...formData, outstandingBalance: parseFloat(e.target.value) })} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <button type="submit" className="btn btn-blue">{formMode === "add" ? "Add" : "Update"}</button>
              <button type="button" className="btn btn-gray" style={{ marginLeft: "8px" }} onClick={() => setShowFormModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Confirm Delete</h4>
            <p>Are you sure you want to delete <strong>{selectedCustomer?.name}</strong>?</p>
            <button className="btn btn-red" onClick={confirmDelete}>Delete</button>
            <button className="btn btn-gray" style={{ marginLeft: "5px" }} onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerPage;
