import React, { useState,useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Icons
import api from "../../Services/axios";
const InvoicePage = () => {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    customerId: "",
    due: "",
    amount: "",
    status: "UNPAID",
  });
  useEffect(() => {
  const fetchInvoices = async () => {
    try {
      const res = await api.get("/invoices");
      console.log("Fetched invoices:", res.data);
      setInvoices(res.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchInvoices();
}, []);

  // const filteredInvoices = invoices.filter(
  //   (inv) =>
  //     inv.customer.toLowerCase().includes(search.toLowerCase()) ||
  //     inv.id.toLowerCase().includes(search.toLowerCase())
  // );

  const handleChange = (e) => {
    setNewInvoice({ ...newInvoice, [e.target.name]: e.target.value });
  };
const handleSaveInvoice = async () => {
  try {
    if (editingId) {
      // update existing invoice
      const res = await api.put(`/invoices/${editingId}`, {
        customerId: newInvoice.customerId,
        dueDate: newInvoice.due,
        status: newInvoice.status,
        items: [
          {
            productId: 1, // 👈 adjust if your backend expects real products
            quantity: 1,
            unitPrice: newInvoice.amount,
          },
        ],
      });
      setInvoices(invoices.map(inv => inv.id === editingId ? res.data : inv));
    } else {
      // create new invoice
      const res = await api.post("/invoices", {
        customerId: newInvoice.customerId,
        dueDate: newInvoice.due,
        status: newInvoice.status,
        items: [
          {
            productId: 1,
            quantity: 1,
            unitPrice: newInvoice.amount,
          },
        ],
      });
      setInvoices([...invoices, res.data]);
    }

    setShowModal(false);
    setEditingId(null);
    setNewInvoice({ customerId: "", due: "", amount: "", status: "Pending" });
  } catch (err) {
    console.error("Error saving invoice:", err.response?.data || err.message);
  }
};


const handleEdit = async (id) => {
  try {
    const res = await api.put(`/invoices/${id}`, {
      customerId: newInvoice.customerId,
      dueDate: newInvoice.due,
      status: newInvoice.status,
      items: [
        {
          productId: 1,
          quantity: 1,
          unitPrice: newInvoice.amount,
        },
      ],
    });

    setInvoices(invoices.map((inv) => (inv.id === id ? res.data : inv)));
    setShowModal(false);
  } catch (err) {
    console.error("Error updating invoice:", err.response?.data || err.message);
  }
};

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this invoice?")) {
    try {
      await api.delete(`/invoices/${id}`);
      setInvoices(invoices.filter((inv) => inv.id !== id));
    } catch (err) {
      console.error("Error deleting invoice:", err);
    }
  }
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
            <th>Created Date</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : invoices.length > 0 ? (
            invoices
              .filter(
                (inv) =>
                  inv.customer?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  inv.id.toString().includes(search)
              )
              .map((inv) => (
                <tr key={inv.id}>
                  <td>{`INV${inv.id.toString().padStart(3, "0")}`}</td>
                  <td>{inv.customer?.name || "N/A"}</td>
                  <td>{inv.createdDate}</td>
                  <td>{inv.dueDate}</td>
                  <td>{Number(inv.totalAmount).toFixed(2)}</td>
                  <td>
                    <span className={`status ${inv.status?.toLowerCase()}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="icon-btn view-btn"
                      data-tooltip="View Invoice"
                    >
                      <FaEye />
                    </button>
                    <button
  className="icon-btn edit-btn"
  data-tooltip="Edit Invoice"
  onClick={() => {
    setNewInvoice({
      customerId: inv.customer?.id || "",
      due: inv.dueDate?.split("T")[0] || "",
      amount: inv.totalAmount,
      status: inv.status,
    });
    setShowModal(true);
    setEditingId(inv.id); // 👈 store which invoice we are editing
  }}
>
  <FaEdit />
</button>

                    <button
                      className="icon-btn delete-btn"
                      data-tooltip="Delete Invoice"
                      onClick={() => handleDelete(inv.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No invoices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>


      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Invoice</h3>
            <input
              name="customerId"
              placeholder="Customer ID"
              value={newInvoice.customerId}
              onChange={handleChange}
            />
            <input
              type="date"
              name="due"
              value={newInvoice.due}
              onChange={handleChange}
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newInvoice.amount}
              onChange={handleChange}
            />
            <select
              name="status"
              value={newInvoice.status}
              onChange={handleChange}
            >
            <option value="UNPAID">Unpaid</option>
            <option value="PARTIALLY_PAID">Partially Paid</option>
            <option value="PAID">Paid</option>
            </select>
            <div className="modal-actions">
              <button className="save-btn" onClick={handleSaveInvoice}>
              {editingId ? "Update" : "Save"}
            </button>

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    
  

      <style>{`
        .invoice-page {
        padding: 20px;
        font-family: Arial, sans-serif;
        }
        h2 {
        margin-bottom: 15px;
        color: #333;
        }
        .actions {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
        }
        .search-input {
        padding: 8px;
        width: 250px;
        border: 1px solid #ccc;
        border-radius: 5px;
        }
        .add-btn {
        background:blue;
        color: white;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        }
        .invoice-table {
        width: 100%;
        border-collapse: collapse;
        }
        .invoice-table th, .invoice-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: center;
        }
        .invoice-table th {
        background: #f4f4f4;
        }
        .status {
        padding: 5px 10px;
        border-radius: 4px;
        color: white;
        font-size: 0.9em;
        }
        .status.paid {
        background: none;
        color:black; 
        }
        .status.pending { 
        background: none;
        color:black; 
        }
        .status.overdue { 
        background: none;
        color:black;  
        }
        .icon-btn { 
        position: relative; 
        border: none; 
        border-radius: 4px; 
        padding: 6px; 
        cursor: pointer; 
        font-size: 16px; 
        }
        .icon-btn svg { 
        pointer-events: none; 
        }
        .icon-btn::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: white;
          font-size: 0.75em;
          padding: 4px 6px;
          border-radius: 4px;
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          transition: opacity 0.2s ease-in-out;
        }
        .icon-btn:hover::after { 
        opacity: 1; 
        }
        .view-btn { 
        background: white; 
        color:blue; 
        }
        .edit-btn { 
        background: white; 
        color: green; 
        }
        .delete-btn { 
        background: white; 
        color: red; 
        }
        .modal-overlay { 
        position: fixed; 
        top: 0; 
        left: 0; 
        right: 0; 
        bottom: 0; 
        background: rgba(0,0,0,0.5); 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        }
        .modal { 
        background: white; 
        padding: 20px; 
        border-radius: 8px; 
        width: 300px; 
        display: flex; 
        flex-direction: column; 
        gap: 10px; 
        }
        .modal input, .modal select { 
        padding: 8px; 
        border: 1px solid #ccc; 
        border-radius: 4px; 
        }
        .modal-actions { 
        display: flex; 
        justify-content: flex-end; 
        gap: 10px; 
        }
        .save-btn { 
        background: green; 
        color: white; 
        }
        .cancel-btn { 
        background: gray; 
        color: white; 
        }
      `}</style>
    </div>
  );
};

export default InvoicePage;
