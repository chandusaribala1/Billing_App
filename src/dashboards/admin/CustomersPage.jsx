import React, { useState } from "react";

const initialCustomers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Cityville",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-123-4567",
    address: "456 Oak Ave, Townsville",
    status: "Inactive",
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", address: "", status: "Active" });
    setEditingCustomer(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (customer) => {
    setFormData({ ...customer });
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required.");
      return;
    }

    if (editingCustomer) {
      // Update existing customer
      setCustomers(
        customers.map((c) =>
          c.id === editingCustomer.id ? { ...editingCustomer, ...formData } : c
        )
      );
    } else {
      // Add new customer
      const newCustomer = {
        id: customers.length ? Math.max(...customers.map((c) => c.id)) + 1 : 1,
        ...formData,
      };
      setCustomers([...customers, newCustomer]);
    }

    setShowForm(false);
    resetForm();
  };

  return (
    <>
      <style>{`
        .customers-container {
          max-width: 1000px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
          padding: 0 15px;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .top-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .top-bar input[type="search"] {
          flex-grow: 1;
          min-width: 220px;
          padding: 8px 12px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
        .top-bar button {
          background-color: #4caf50;
          border: none;
          color: white;
          padding: 10px 18px;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          white-space: nowrap;
        }
        .top-bar button:hover {
          background-color: #45a049;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 0 8px rgba(0,0,0,0.1);
          border-radius: 6px;
          overflow: hidden;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
          color: #555;
        }
        th {
          background-color: #f4f4f4;
          font-weight: 600;
        }
        tr:hover {
          background-color: #f9f9f9;
        }
        .actions button {
          margin-right: 8px;
          background-color: #2196f3;
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.3s;
        }
        .actions button.delete {
          background-color: #f44336;
        }
        .actions button:hover {
          opacity: 0.85;
        }
        /* Form Modal */
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .modal {
          background: white;
          padding: 25px 30px;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 0 12px rgba(0,0,0,0.2);
          position: relative;
        }
        .modal h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: #333;
        }
        .modal form label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #444;
        }
        .modal form input, 
        .modal form select, 
        .modal form textarea {
          width: 100%;
          padding: 8px 12px;
          margin-bottom: 15px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
          resize: vertical;
        }
        .modal form textarea {
          min-height: 60px;
        }
        .modal-buttons {
          text-align: right;
        }
        .modal-buttons button {
          background-color: #4caf50;
          border: none;
          color: white;
          padding: 10px 18px;
          font-size: 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-left: 10px;
        }
        .modal-buttons button.cancel {
          background-color: #999;
        }
        .modal-buttons button:hover {
          opacity: 0.9;
        }
        @media (max-width: 600px) {
          .actions button {
            padding: 6px 8px;
            font-size: 0.85rem;
          }
        }
      `}</style>

      <div className="customers-container">
        <h1>Customers Management</h1>

        <div className="top-bar">
          <input
            type="search"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={openAddForm}>+ Add Customer</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th style={{ minWidth: "130px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", color: "#888" }}>
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.status}</td>
                  <td className="actions">
                    <button onClick={() => openEditForm(customer)}>Edit</button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Add/Edit Modal */}
        {showForm && (
          <div className="modal-backdrop" onClick={() => setShowForm(false)}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()} // prevent closing modal on inner click
            >
              <h2>{editingCustomer ? "Edit Customer" : "Add Customer"}</h2>
              <form onSubmit={handleSubmit}>
                <label>Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />

                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />

                <label>Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <label>Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                ></textarea>

                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

                <div className="modal-buttons">
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit">{editingCustomer ? "Update" : "Add"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Customers;
