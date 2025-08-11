import React, { useState } from 'react';

// Main App component that renders the full dashboard
export default function App() {
  return (
    // This is the new dashboard layout component
    <DashboardLayout>
      <InvoicesPage />
    </DashboardLayout>
  );
}

// A new component to create the full dashboard layout from the user's image.
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen font-inter">
      {/* Header */}
      <header className="bg-purple-700 text-white flex justify-between items-center p-4 shadow-md">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-green-500 rounded-md py-1 px-3">Accountant Dashboard</h1>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-4 rounded-md transition-colors duration-200">
          Logout
        </button>
      </header>

      {/* Main content area with sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="bg-gray-900 text-gray-200 w-64 p-4 flex flex-col shadow-lg">
          <h2 className="text-lg font-bold mb-4">Menu</h2>
          <nav>
            <ul>
              <li className="mb-2">
                <a href="#" className="block p-2 rounded-md bg-green-500 text-gray-900 font-bold">
                  Invoices
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  Payments
                </a>
              </li>
              <li>
                <a href="#" className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  Reports
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

// Invoice data type for clarity and consistency
interface Invoice {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

// Main InvoicesPage component
const InvoicesPage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV-1001",
      customer: "John Doe",
      date: "2025-08-01",
      amount: 250.0,
      status: "Paid"
    },
    {
      id: "INV-1002",
      customer: "Jane Smith",
      date: "2025-08-05",
      amount: 150.0,
      status: "Pending"
    },
    {
      id: "INV-1003",
      customer: "Michael Brown",
      date: "2025-08-07",
      amount: 320.0,
      status: "Overdue"
    }
  ]);
  const [message, setMessage] = useState<string | null>(null);

  // Replaced alert with a state-based message
  const handleDownload = (invoiceId: string) => {
    setMessage(`Downloading Invoice: ${invoiceId}`);
    // Simulate a download process
    setTimeout(() => setMessage(null), 3000);
  };

  // Replaced alert with a state-based message
  const handleCreateInvoice = () => {
    setMessage("Redirecting to invoice creation form...");
    // Simulate navigation
    setTimeout(() => setMessage(null), 3000);
  };

  // Helper function to get status colors
  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case "Paid":
        return "text-green-600";
      case "Pending":
        return "text-orange-500";
      case "Overdue":
        return "text-red-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-4xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
        <button
          onClick={handleCreateInvoice}
          className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Invoice
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded-md text-sm text-center font-medium">
          {message}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{invoice.amount.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDownload(invoice.id)}
                    className="text-blue-600 hover:text-blue-900 font-medium transition-colors duration-200"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
