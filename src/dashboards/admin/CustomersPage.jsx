import React, { useState } from "react";

// The corrected CustomersPage component
const CustomersPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "9876543210", company: "ABC Corp", invoices: 5, balance: 200, status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876500012", company: "XYZ Ltd", invoices: 2, balance: 0, status: "Inactive" },
    { id: 3, name: "Mark Wilson", email: "mark@example.com", phone: "9000088888", company: "Tech Solutions", invoices: 3, balance: 100, status: "Active" }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", invoices: 0, balance: 0, status: "Active" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [customerToView, setCustomerToView] = useState(null);
  const [message, setMessage] = useState(null);

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(c =>
    (statusFilter === "All" || c.status === statusFilter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search))
  );

  const handleAddCustomer = () => {
    // Show a message if required fields are missing
    if (!formData.name || !formData.email) {
      setMessage("Name and Email are required to add a customer.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    const newCustomer = { id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1, ...formData };
    setCustomers([...customers, newCustomer]);
    setFormData({ name: "", email: "", phone: "", company: "", invoices: 0, balance: 0, status: "Active" });
    setShowAddForm(false);
    setMessage("New customer added successfully!");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDelete = (id) => {
    // Show a custom modal for confirmation
    const customer = customers.find(c => c.id === id);
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter(c => c.id !== customerToDelete.id));
    setShowDeleteModal(false);
    setCustomerToDelete(null);
    setMessage(`Customer ${customerToDelete.name} deleted successfully.`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleView = (customer) => {
    // Show a custom modal for viewing customer details
    setCustomerToView(customer);
    setShowViewModal(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Management</h1>

      {/* Analytics Cards */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md flex-1 text-center min-w-[200px]">
          <div className="text-sm font-semibold text-gray-500">Total Customers</div>
          <strong className="block text-3xl font-bold text-gray-900 mt-2">{customers.length}</strong>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex-1 text-center min-w-[200px]">
          <div className="text-sm font-semibold text-gray-500">Active</div>
          <strong className="block text-3xl font-bold text-green-600 mt-2">{customers.filter(c => c.status === "Active").length}</strong>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex-1 text-center min-w-[200px]">
          <div className="text-sm font-semibold text-gray-500">Inactive</div>
          <strong className="block text-3xl font-bold text-red-600 mt-2">{customers.filter(c => c.status === "Inactive").length}</strong>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by name, email, phone..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[250px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button 
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors" 
          onClick={() => setShowAddForm(true)}
        >
          + Add Customer
        </button>
      </div>

      {/* Message Box */}
      {message && <div className="bg-green-100 text-green-800 p-4 rounded-lg text-center mb-6">{message}</div>}

      {/* Customer Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoices</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.invoices}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${c.balance}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button onClick={() => handleView(c)} className="text-indigo-600 hover:text-indigo-900">View</button>
                      <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Customer</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="text" placeholder="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="number" placeholder="Invoices" value={formData.invoices} onChange={e => setFormData({...formData, invoices: Number(e.target.value)})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="number" placeholder="Balance" value={formData.balance} onChange={e => setFormData({...formData, balance: Number(e.target.value)})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowAddForm(false)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              <button onClick={handleAddCustomer} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-700">Are you sure you want to delete <strong>{customerToDelete?.name}</strong>?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* View Customer Details Modal */}
      {showViewModal && customerToView && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="relative bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Customer Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {customerToView.name}</p>
              <p><strong>Email:</strong> {customerToView.email}</p>
              <p><strong>Phone:</strong> {customerToView.phone}</p>
              <p><strong>Company:</strong> {customerToView.company}</p>
              <p><strong>Invoices:</strong> {customerToView.invoices}</p>
              <p><strong>Balance:</strong> ${customerToView.balance}</p>
              <p><strong>Status:</strong> <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${customerToView.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{customerToView.status}</span></p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowViewModal(false)} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// A placeholder for the main dashboard content
const DashboardPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <div className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-600">Welcome to the dashboard! Use the sidebar to navigate.</p>
            </div>
        </div>
    );
};

// The main App component that handles the routing
const App = () => {
    const [activePage, setActivePage] = useState("dashboard"); // 'dashboard' or 'customers'

    // The main layout with sidebar and content area
    return (
        <div className="flex bg-gray-100 min-h-screen font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-xl flex flex-col p-6 space-y-4 rounded-r-3xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin</h2>
                <nav className="flex flex-col space-y-2">
                    <button 
                        onClick={() => setActivePage("dashboard")} 
                        className={`text-left p-3 rounded-lg font-medium transition-colors ${activePage === "dashboard" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        Dashboard
                    </button>
                    <button 
                        onClick={() => setActivePage("customers")} 
                        className={`text-left p-3 rounded-lg font-medium transition-colors ${activePage === "customers" ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                        Customers
                    </button>
                    <button 
                        className="text-left p-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
                        disabled
                    >
                        Products / Services
                    </button>
                    <button 
                        className="text-left p-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
                        disabled
                    >
                        Invoices
                    </button>
                    <button 
                        className="text-left p-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
                        disabled
                    >
                        Payments
                    </button>
                    <button 
                        className="text-left p-3 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
                        disabled
                    >
                        Reports
                    </button>
                </nav>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 p-8">
                {activePage === "dashboard" && <DashboardPage />}
                {activePage === "customers" && <CustomersPage />}
            </div>
        </div>
    );
};

export default App;
