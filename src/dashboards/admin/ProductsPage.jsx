import React, { useState } from 'react';
import { Briefcase, Plus, Edit, Trash2 } from 'lucide-react';

const ProductsPage = () => {
  // CSS styles inside the same file (no Tailwind)
  const styles = `
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f3f4f6;
      margin: 0;
    }
    .page-container {
      background-color: #f3f4f6;
      min-height: 100vh;
      padding: 24px;
    }
    .header-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }
    @media (min-width: 768px) {
      .header-container {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
    .title {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: #374151;
    }
    .title svg {
      margin-right: 8px;
      color: #6b7280;
    }
    .search-add-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
    @media (min-width: 768px) {
      .search-add-container {
        flex-direction: row;
        width: auto;
      }
    }
    .search-input {
      padding: 8px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      outline: none;
      width: 100%;
      max-width: 260px;
    }
    .search-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59,130,246,0.3);
    }
    .btn-primary {
      background-color: #2563eb;
      color: white;
      font-weight: 500;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: background-color 0.2s;
    }
    .btn-primary:hover {
      background-color: #1d4ed8;
    }
    .btn-icon {
      margin-right: 6px;
    }
    .table-container {
      overflow-x: auto;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      background-color: white;
    }
    table {
      min-width: 100%;
      border-collapse: collapse;
    }
    thead {
      background-color: #f9fafb;
    }
    th {
      padding: 12px 16px;
      text-align: left;
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
    }
    td {
      padding: 12px 16px;
      font-size: 0.875rem;
      color: #4b5563;
      white-space: nowrap;
    }
    tbody tr {
      border-top: 1px solid #e5e7eb;
    }
    .action-buttons {
      display: flex;
      gap: 8px;
    }
    .btn-edit {
      color: #059669;
      cursor: pointer;
      border: none;
      background: none;
    }
    .btn-edit:hover {
      color: #047857;
    }
    .btn-delete {
      color: #dc2626;
      cursor: pointer;
      border: none;
      background: none;
    }
    .btn-delete:hover {
      color: #b91c1c;
    }
    .no-data {
      text-align: center;
      padding: 16px;
      color: #6b7280;
    }
    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      max-width: 400px;
      width: 90%;
      text-align: center;
    }
    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .modal-text {
      color: #4b5563;
      margin-bottom: 20px;
    }
    .modal-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
    }
    .btn-cancel {
      background-color: #d1d5db;
      color: #1f2937;
      font-weight: 500;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .btn-cancel:hover {
      background-color: #9ca3af;
    }
    .btn-danger {
      background-color: #dc2626;
      color: white;
      font-weight: 500;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .btn-danger:hover {
      background-color: #b91c1c;
    }
  `;

  // Mock data
  const initialProducts = [
    { id: 'PROD-001', name: 'Web Hosting Service (Basic)', category: 'Service', price: 50.00, stock: null },
    { id: 'PROD-002', name: 'Domain Registration', category: 'Service', price: 15.00, stock: null },
    { id: 'PROD-003', name: 'Custom Website Design', category: 'Service', price: 1500.00, stock: null },
    { id: 'PROD-004', name: 'Office 365 License', category: 'Software', price: 10.00, stock: 500 },
    { id: 'PROD-005', name: 'Server Maintenance Plan', category: 'Service', price: 200.00, stock: null },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page-container">
        <div className="header-container">
          <h2 className="title">
            <Briefcase size={24} /> Products / Services
          </h2>
          <div className="search-add-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="btn-primary">
              <Plus size={16} className="btn-icon" /> New Product
            </button>
          </div>
        </div>

        <div className="table-container">
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
                    <td>{product.stock !== null ? product.stock : 'N/A'}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDeleteClick(product)} className="btn-delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4 className="modal-title">Confirm Deletion</h4>
            <p className="modal-text">
              Are you sure you want to delete the product <strong>{productToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="btn-cancel">Cancel</button>
              <button onClick={confirmDelete} className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
