import React, { useState } from 'react';
import { Package, Plus, Download, Search } from 'lucide-react';

const ProductsPage = () => {
  const styles = `
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #f3f4f6;
      min-height: 100vh;
      padding: 24px;
    }
    h2 {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: #374151;
    }
    h2 svg {
      margin-right: 8px;
      color: #6b7280;
    }
    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .search-container {
      position: relative;
    }
    .search-container input {
      padding: 8px 8px 8px 32px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      width: 240px;
      font-size: 0.9rem;
    }
    .search-container svg {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
    }
    .btn {
      background-color: #2563eb;
      color: white;
      font-weight: 500;
      padding: 8px 12px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 0.85rem;
      transition: background 0.2s ease-in-out;
    }
    .btn:hover {
      background-color: #1e40af;
    }
    .btn svg {
      margin-right: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }
    thead {
      background-color: #f9fafb;
    }
    th, td {
      padding: 12px 16px;
      text-align: left;
      font-size: 0.875rem;
    }
    th {
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    tr {
      border-bottom: 1px solid #e5e7eb;
    }
    tr:hover {
      background-color: #f3f4f6;
    }
    .action-btn {
      background: none;
      border: none;
      color: #2563eb;
      cursor: pointer;
    }
    .message {
      padding: 8px;
      background-color: #dbeafe;
      color: #1e40af;
      text-align: center;
      border-radius: 6px;
      font-size: 0.9rem;
      margin-bottom: 16px;
    }
  `;

  const initialProducts = [
    { id: 'PROD-001', name: 'Laptop', category: 'Electronics', price: 75000, stock: 12 },
    { id: 'PROD-002', name: 'Smartphone', category: 'Electronics', price: 30000, stock: 20 },
    { id: 'PROD-003', name: 'Office Chair', category: 'Furniture', price: 4500, stock: 8 },
    { id: 'PROD-004', name: 'Desk Lamp', category: 'Furniture', price: 1200, stock: 15 },
    { id: 'PROD-005', name: 'Headphones', category: 'Electronics', price: 2000, stock: 30 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewProduct = () => {
    setMessage("Simulating 'Add New Product' action...");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDownload = (productId) => {
    setMessage(`Downloading product report for: ${productId}`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <h2>
            <Package size={24} /> Products
          </h2>
          <div className="actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} />
            </div>
            <button onClick={handleAddNewProduct} className="btn">
              <Plus size={16} /> Add New Product
            </button>
          </div>
        </div>

        {message && <div className="message">{message}</div>}

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (₹)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button onClick={() => handleDownload(product.id)} className="action-btn">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#6b7280', padding: '12px' }}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
