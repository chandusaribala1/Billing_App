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

// ================= Main Page =================
const InvoicesPage = () => {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [invoice, setInvoice] = useState(null);
  const [savedInvoices, setSavedInvoices] = useState([]);

  // Load saved invoices
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/invoices/me");
      setSavedInvoices(res.data);
    } catch (err) {
      console.error("Error fetching invoices", err);
    }
  };

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
