<<<<<<< HEAD
import React, { useState } from "react";
// Removed UserCircle2, LogOut as navbar is removed
// Removed useNavigate as navigation links are no longer present

import jsPDF from "jspdf";
import "jspdf-autotable";

// Function to generate the invoice PDF with dynamic data
const generateInvoicePDF = (invoice) => {
  console.log("Download function triggered ✅ for invoice:", invoice.id);
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";

// ================= PDF Styles =================
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10, fontWeight: "bold" },
  text: { fontSize: 12, marginBottom: 4 },
});

// ================= PDF Component =================
const InvoiceDocument = ({ invoice }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Invoice</Text>
        <Text style={styles.text}>Customer: {invoice.customerName}</Text>
        <Text style={styles.text}>Date: {invoice.date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Items</Text>
        {invoice.items.map((item, i) => (
          <Text key={i} style={styles.text}>
            {item.name} - {item.quantity} × {item.price} = ₹
            {item.quantity * item.price}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>
          Total: ₹
          {invoice.items.reduce(
            (sum, i) => sum + i.quantity * i.price,
            0
          )}
        </Text>
      </View>
    </Page>
  </Document>
);
>>>>>>> 9f5c087768bd9dfb788a3a999f8200639ae3e43d

// ================= Main Page =================
const InvoicesPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [invoice, setInvoice] = useState(null);
  const [savedInvoices, setSavedInvoices] = useState([]);

<<<<<<< HEAD
  // 🏢 Company Details (Static for now, but could be dynamic from a 'companyInfo' prop/context)
  doc.setFontSize(22);
  doc.setTextColor("#aa1bed");
  doc.text("INVOICE", 14, 20);
=======
  // Load saved invoices
  useEffect(() => {
    fetchInvoices();
  }, []);
>>>>>>> 9f5c087768bd9dfb788a3a999f8200639ae3e43d

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/invoices/me");
      setSavedInvoices(res.data);
    } catch (err) {
      console.error("Error fetching invoices", err);
    }
  };

<<<<<<< HEAD
  // 📄 Invoice Info - Dynamically pulled from the 'invoice' object
  doc.setTextColor("#d2277e");
  doc.text("Bill To:", 14, 60);
  // Dynamically setting customer details
  doc.text(invoice.customer.name, 14, 66);
  doc.text(invoice.customer.addressLine1, 14, 72);
  doc.text(invoice.customer.addressLine2, 14, 78);
  doc.text(invoice.customer.city + ", " + invoice.customer.country, 14, 84);

  doc.setFontSize(11);
  doc.text("Invoice No :", 145, 75);
  doc.text(invoice.id, 180, 75, { align: "right" }); // Using dynamic invoice ID
  doc.text("Invoice Date :", 145, 81);
  doc.text(invoice.paidDate || "N/A", 180, 81, { align: "right" }); // Using dynamic paidDate
  doc.text("Due Date :", 145, 87);
  doc.text(invoice.dueDate, 180, 87, { align: "right" }); // Using dynamic dueDate

  // === Invoice Items Table ===
  // Dynamically populate 'body' with data from 'invoice.items'
  const tableBody = invoice.items.map((item, index) => [
    index + 1,
    item.description,
    item.quantity,
    `$${item.unitPrice.toFixed(2)}`,
    `$${(item.quantity * item.unitPrice).toFixed(2)}`,
  ]);

  doc.autoTable({
    startY: 95,
    head: [["Sl.", "Description", "Qty", "Rate", "Amount"]],
    body: tableBody, // Use the dynamically generated table body
    theme: 'grid',
    headStyles: {
      fillColor: "#d2277e",
      textColor: "#ffffff",
      fontStyle: 'bold',
      halign: 'center',
    },
    styles: {
      halign: 'center',
      cellPadding: 4,
    },
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  // --- Calculate Totals Dynamically ---
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const totalPaid = invoice.payments ? invoice.payments.reduce((sum, payment) => sum + payment.amount, 0) : 0;
  const balanceDue = subtotal - totalPaid;

  // === Totals Section ===
  doc.setFontSize(11);
  doc.text("Subtotal", 145, finalY);
  doc.text(`$${subtotal.toFixed(2)}, 180, finalY, { align: "right" }`);
  doc.text("Total", 145, finalY + 6);
  doc.text(`$${subtotal.toFixed(2)}, 180, finalY + 6, { align: "right" }`);
  doc.text("Paid (As of " + (invoice.paidDate || "N/A") + ")", 145, finalY + 12); // Dynamic paid date
  doc.text(`$${totalPaid.toFixed(2)}, 180, finalY + 12, { align: "right" }`);

  doc.setTextColor("#d2277e");
  doc.text("Balance Due", 145, finalY + 18);
  doc.text(`$${balanceDue.toFixed(2)}, 180, finalY + 18, { align: "right" }`);
  doc.setTextColor("#000000");

  // === Payment Instructions === (Static for now)
  doc.setFontSize(11);
  doc.setTextColor("#d2277e");
  doc.text("Payment Instructions", 14, finalY + 30);
  doc.setTextColor("#000");
  doc.text("Pay Cheque to", 14, finalY + 36);
  doc.text("John Doe", 14, finalY + 42);

  // === Footer Signature === (Static for now)
  doc.text("Authorized Signatory", 150, 280);

  // === Save as PDF ===
  doc.save(`${invoice.id}_AccuBillify_Invoice.pdf`);
};

// --- Mock Invoices Data (more detailed for dynamic PDF generation) ---
// In a real application, this data would be fetched from your backend API.
const invoices = [
  {
    id: "INV-001",
    status: "Paid",
    dueDate: "2023-10-25",
    paidDate: "2023-10-26",
    customer: {
      name: "Green1 Materials LLC",
      addressLine1: "#34, Car Street",
      addressLine2: "City Park",
      city: "Hong Kong",
      country: "China",
    },
    items: [
      { description: "Desktop furniture", quantity: 1, unitPrice: 232.00 },
      { description: "Plumbing and electrical services", quantity: 2, unitPrice: 514.00 },
      { description: "Water tank repair works", quantity: 2, unitPrice: 152.00 },
    ],
    payments: [{ amount: 1564.00, date: "2023-10-26" }], // Simulate full payment
  },
  {
    id: "INV-002",
    status: "Pending",
    dueDate: "2023-11-15",
    paidDate: null,
    customer: {
      name: "Blue Sky Corp",
      addressLine1: "123 Ocean View",
      addressLine2: "Coastal Road",
      city: "Malibu",
      country: "USA",
    },
    items: [
      { description: "Consulting services", quantity: 10, unitPrice: 100.00 },
      { description: "Software license", quantity: 1, unitPrice: 500.00 },
    ],
    payments: [], // No payments yet
  },
  {
    id: "INV-003",
    status: "Partially Paid",
    dueDate: "2023-09-01",
    paidDate: "2023-08-28", // Last payment date
    customer: {
      name: "Red Earth Traders",
      addressLine1: "789 Mountain Peak",
      addressLine2: "Highlands",
      city: "Denver",
      country: "USA",
    },
    items: [
      { description: "Raw materials", quantity: 500, unitPrice: 1.50 },
      { description: "Shipping fees", quantity: 1, unitPrice: 150.00 },
    ],
    payments: [{ amount: 500.00, date: "2023-08-28" }], // Partial payment
  },
];

// --- React Component ---
const MyInvoicesPage = () => {
  // Removed useNavigate as there are no navigation elements
  // No need for isSidebarCollapsed state as sidebar is removed.

  // Using the mock 'invoices' for display in this example.
  // In a real application, you would fetch this data from your backend.
  const displayInvoices = invoices; 

  return (
    <>
      <style>{`
        body, html, #root { 
          margin: 0; 
          padding: 0; 
          height: 100%; 
          width: 100vw; 
          font-family: Arial, sans-serif;
          color: black; /* Main font color for the body */
          background-color: #f8f9fa; /* Light background for the entire page */
        }

        /* Top Left Heading for the Page */
        .page-title {
          font-weight: 700;
          font-size: 2rem; /* Larger font size for prominence */
          color: #222;
          padding: 20px; /* Padding around the title */
          margin-bottom: 20px;
          text-align: left; /* Align to top-left */
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          box-sizing: border-box;
        }
        
        /* Page Content Styles */
        .page-content { 
          width: 100%; 
          max-width: 1200px; 
          padding: 0 20px 20px; /* Adjusted padding, removed top padding */
          margin: 0 auto; /* Center the content */
          box-sizing: border-box;
        }

        .bg-white {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          padding: 20px;
        }

        .invoice-table { 
          width: 100%; 
          border-collapse: collapse; 
          font-size: 0.95rem; 
          margin-top: 20px; 
        }
        .invoice-table thead { 
          background: linear-gradient(125deg, #d2277e, #aa1bed); 
          color: white; 
          text-align: left; 
        }
        .invoice-table th, .invoice-table td { 
          padding: 14px 18px; 
          text-align: center; 
          border-bottom: 1px solid #f0f0f0; 
        }
        .invoice-table tbody tr:last-child td { 
          border-bottom: none; 
        }
        .invoice-table tbody tr:hover { 
          background: #fdf2f8; 
        }
        .status-paid { 
          background: #d1fae5; 
          color: #065f46; 
          font-weight: 600; 
          padding: 6px 12px; 
          border-radius: 20px; 
          display: inline-block; 
          min-width: 80px; 
        }
        .status-pending { 
          background: #fef3c7; 
          color: #92400e; 
          font-weight: 600; 
          padding: 6px 12px; 
          border-radius: 20px; 
          display: inline-block; 
          min-width: 80px; 
        }
        .download-button { 
          background: none; 
          color: #6c63ff; 
          font-weight: 600; 
          border: none; 
          cursor: pointer; 
          padding: 8px 12px; 
          border-radius: 8px; 
          transition: background-color 0.2s, color 0.2s; 
        }
        .download-button:hover { 
          background-color: #e0e7ff; 
          color: #4f46e5; 
        }
        .not-available-text { 
          color: #aaa; 
          font-style: italic; 
          padding: 8px 12px; 
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .page-title {
            font-size: 1.5rem;
            padding: 15px;
          }
          .invoice-table th, .invoice-table td {
            padding: 8px 10px;
            font-size: 0.85rem;
          }
        }
      `}</style>

      {/* Main Content wrapper */}
      <div className="main-content-wrapper">
        <h1 className="page-title">My Invoices</h1> {/* Added page title here */}
        
        <div className="page-content">
          <div className="bg-white">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Paid Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayInvoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>{inv.id}</td>
                    <td>{inv.paidDate || "N/A"}</td>
                    <td>{inv.dueDate}</td>
                    <td>
                      {inv.status === "Paid" ? (
                        <span className="status-paid">Paid</span>
                      ) : inv.status === "Partially Paid" ? (
                        <span className="status-pending">Partially Paid</span>
                      ) : (
                        <span className="status-pending">Pending</span>
                      )}
                    </td>
                    <td>
                      {inv.status !== "Pending" ? (
                        <button
                          onClick={() => generateInvoicePDF(inv)}
                          className="download-button"
                        >
                          Download
                        </button>
                      ) : (
                        <span className="not-available-text">
                          Not Available
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
=======
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] =
      field === "name"
        ? { ...updated[index], [field]: String(value) }
        : { ...updated[index], [field]: Number(value) };
    setItems(updated);
    setInvoice({ customerName, date, items: updated });
  };

  const addItem = () =>
    setItems([...items, { name: "", quantity: 1, price: 0 }]);

  const handleSave = async () => {
    const invoiceData = { customerName, date, items };
    try {
      await axios.post("http://localhost:8080/api/invoices/me", invoiceData);
      alert("Invoice saved!");
      fetchInvoices();
    } catch (err) {
      alert("Failed to save invoice");
      console.error(err);
    }
  };

  const handleDownload = async () => {
    if (!invoice) return;
    const blob = await pdf(<InvoiceDocument invoice={invoice} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice-${invoice.customerName}.pdf`;
    link.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top: Form + Preview */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Form */}
        <div>
          <h2 className="text-xl font-bold mb-4">Create Invoice</h2>

          <input
            className="border p-2 rounded w-full mb-3"
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              setInvoice({ customerName: e.target.value, date, items });
            }}
          />

          <input
            className="border p-2 rounded w-full mb-3"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setInvoice({ customerName, date: e.target.value, items });
            }}
          />

          {items.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded flex-1"
                type="text"
                placeholder="Item"
                value={item.name}
                onChange={(e) => handleItemChange(i, "name", e.target.value)}
              />
              <input
                className="border p-2 rounded w-20"
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => handleItemChange(i, "quantity", e.target.value)}
              />
              <input
                className="border p-2 rounded w-24"
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(i, "price", e.target.value)}
              />
            </div>
          ))}

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              + Add Item
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save Invoice
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div>
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {invoice ? (
            <div className="space-y-4">
              <PDFViewer width="100%" height="400">
                <InvoiceDocument invoice={invoice} />
              </PDFViewer>
              <button
                onClick={handleDownload}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Download PDF
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Fill form to preview invoice</p>
          )}
        </div>
>>>>>>> 9f5c087768bd9dfb788a3a999f8200639ae3e43d
      </div>

      {/* Bottom: Saved Invoices */}
      <div>
        <h2 className="text-xl font-bold mt-8 mb-4">Saved Invoices</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {savedInvoices.map((inv) => (
              <tr key={inv.id}>
                <td className="border p-2">{inv.id}</td>
                <td className="border p-2">{inv.customerName}</td>
                <td className="border p-2">{inv.date}</td>
                <td className="border p-2">{inv.items?.length || 0} items</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
