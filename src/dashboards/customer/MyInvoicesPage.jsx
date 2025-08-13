import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { nanoid } from 'nanoid';

const InvoiceGenerator = () => {
  const [productName, setProductName] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [invoice, setInvoice] = useState(null);

  const gstRate = 0.18;

  const generateInvoiceNumber = () => {
    return `INV-${nanoid(8).toUpperCase()}`;
  };

  const generateInvoice = () => {
    const invoiceNumber = generateInvoiceNumber();
    const numericAmount = parseFloat(amount);
    const gstAmount = numericAmount * gstRate;
    const totalAmount = numericAmount + gstAmount;

    setInvoice({
      invoiceNumber,
      productName,
      amount: numericAmount,
      gstAmount,
      totalAmount,
      paymentStatus,
      date: new Date().toLocaleDateString(),
    });
  };

  const downloadInvoice = () => {
    if (!invoice) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('Company Name Pvt Ltd', 14, 20);
    doc.setFontSize(16);
    doc.text('Invoice / Bill Statement', 14, 30);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 14, 45);
    doc.text(`Date: ${invoice.date}`, 140, 45);
    doc.line(14, 50, 196, 50);
    doc.setFontSize(14);
    doc.text('Description', 14, 60);
    doc.text('Amount (₹)', 150, 60, null, null, 'right');
    doc.setFontSize(12);
    doc.text(invoice.productName, 14, 70);
    doc.text(invoice.amount.toFixed(2), 150, 70, null, null, 'right');
    doc.text('GST (18%)', 14, 80);
    doc.text(invoice.gstAmount.toFixed(2), 150, 80, null, null, 'right');
    doc.setFont(undefined, 'bold');
    doc.text('Total Amount', 14, 90);
    doc.text(invoice.totalAmount.toFixed(2), 150, 90, null, null, 'right');
    doc.setFont(undefined, 'normal');
    doc.text(`Payment Status: ${invoice.paymentStatus}`, 14, 110);
    doc.line(14, 115, 196, 115);
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 14, 125);

    doc.save(`${invoice.invoiceNumber}.pdf`);
  };

  const isFormValid =
    productName.trim() !== '' &&
    amount !== '' &&
    !isNaN(amount) &&
    parseFloat(amount) > 0 &&
    paymentStatus !== '';

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Invoice Generator</h2>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: '600' }}>
          Product Name
        </label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: 15 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: '600' }}>
          Amount (₹)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', marginBottom: 5, fontWeight: '600' }}>
          Payment Status
        </label>
        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px',
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid #ccc',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="">Select payment status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <button
        onClick={generateInvoice}
        disabled={!isFormValid}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: isFormValid ? '#4CAF50' : '#9E9E9E',
          color: 'white',
          fontWeight: '700',
          border: 'none',
          borderRadius: 4,
          cursor: isFormValid ? 'pointer' : 'not-allowed',
          fontSize: 16,
        }}
      >
        Generate Invoice
      </button>

      {invoice && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 6,
            boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3 style={{ marginBottom: 15, borderBottom: '1px solid #ddd', paddingBottom: 5 }}>
            Invoice Preview
          </h3>

          <p>
            <strong>Invoice Number:</strong> {invoice.invoiceNumber}
          </p>
          <p>
            <strong>Product Name:</strong> {invoice.productName}
          </p>
          <p>
            <strong>Amount:</strong> ₹{invoice.amount.toFixed(2)}
          </p>
          <p>
            <strong>GST (18%):</strong> ₹{invoice.gstAmount.toFixed(2)}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{invoice.totalAmount.toFixed(2)}
          </p>
          <p>
            <strong>Payment Status:</strong> {invoice.paymentStatus}
          </p>

          <button
            onClick={downloadInvoice}
            style={{
              marginTop: 15,
              width: '100%',
              padding: '10px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: 16,
            }}
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceGenerator;
