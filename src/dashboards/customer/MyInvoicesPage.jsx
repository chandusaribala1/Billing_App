import React, { useState } from "react";

// Removed UserCircle2, LogOut as navbar is removed
// Removed useNavigate as navigation links are no longer present

import jsPDF from "jspdf";
import "jspdf-autotable";

// Function to generate the invoice PDF with dynamic data
const generateInvoicePDF = (invoice) => {
  console.log("Download function triggered ✅ for invoice:", invoice.id);

  const doc = new jsPDF();

  // 🏢 Company Details (Static for now, but could be dynamic from a 'companyInfo' prop/context)
  doc.setFontSize(22);
  doc.setTextColor("#aa1bed");
  doc.text("INVOICE", 14, 20);

  doc.setFontSize(14);
  doc.setTextColor("#000");
  doc.text("AccuBillify", 14, 30);
  doc.setFontSize(11);
  doc.text("Bangalore, India", 14, 36);
  doc.text("Mobile: 0000000000", 14, 42);
  doc.text("Email: info@accubillify.com", 14, 48);

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
  doc.text(`${subtotal.toFixed(2)}, 180, finalY, { align: "right" }`);
  doc.text("Total", 145, finalY + 6);
  doc.text(`${subtotal.toFixed(2)}, 180, finalY + 6, { align: "right" }`);
  doc.text("Paid (As of " + (invoice.paidDate || "N/A") + ")", 145, finalY + 12); // Dynamic paid date
  doc.text(`${totalPaid.toFixed(2)}, 180, finalY + 12, { align: "right" }`);

  doc.setTextColor("#d2277e");
  doc.text("Balance Due", 145, finalY + 18);
  doc.text(`${balanceDue.toFixed(2)}, 180, finalY + 18, { align: "right" }`);
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
      </div>
    </>
  );
};

export default MyInvoicesPage;