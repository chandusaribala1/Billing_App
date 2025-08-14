import React, { useState } from 'react';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    username: 'CUST-001',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: '',
    address: '123 Business Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });

  const [avatar, setAvatar] = useState('JD');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const requiredFields = ['fullName', 'username', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    if (missingFields.length > 0) {
      alert('Please fill in all required fields.');
      return;
    }
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      setFormData({
        fullName: 'John Doe',
        username: 'CUST-001',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1985-06-15',
        gender: '',
        address: '123 Business Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States'
      });
    }
  };

  const handleFileUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Selected file: ${file.name}`);
        setAvatar(file.name.charAt(0).toUpperCase());
      }
    };
    fileInput.click();
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Customer Profile Dashboard</h1>
        <p className="dashboard-subtitle">Manage your basic profile information and account settings</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Profile Completion</div>
          <div className="stat-value">85%</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Account Status</div>
          <div className="stat-value">Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Member Since</div>
          <div className="stat-value">Jan 2023</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Last Updated</div>
          <div className="stat-value">Today</div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="profile-section">
        <h2 className="section-title">1. Basic Profile Information</h2>

        <div className="profile-avatar-section">
          <div className="avatar-placeholder">{avatar}</div>
          <div className="avatar-upload">
            <div className="avatar-title">Profile Picture / Avatar</div>
            <div className="avatar-description">Upload a profile picture or choose an avatar (optional)</div>
            <button type="button" className="upload-btn" onClick={handleFileUpload}>Choose File</button>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Full Name <span className="required">*</span></label>
            <input type="text" name="fullName" className="form-input" value={formData.fullName} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Username or Customer ID <span className="required">*</span></label>
            <input type="text" name="username" className="form-input" value={formData.username} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address <span className="required">*</span></label>
            <input type="email" name="email" className="form-input" value={formData.email} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number <span className="required">*</span></label>
            <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input type="date" name="dateOfBirth" className="form-input" value={formData.dateOfBirth} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <select name="gender" className="form-select" value={formData.gender} onChange={handleInputChange}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Street Address</label>
            <input type="text" name="address" className="form-input" value={formData.address} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label className="form-label">City</label>
            <input type="text" name="city" className="form-input" value={formData.city} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label className="form-label">State/Province</label>
            <input type="text" name="state" className="form-input" value={formData.state} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label className="form-label">ZIP/Postal Code</label>
            <input type="text" name="zipCode" className="form-input" value={formData.zipCode} onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Country</label>
            <input type="text" name="country" className="form-input" value={formData.country} onChange={handleInputChange} />
          </div>
        </form>

        <div className="action-buttons">
          <button type="button" className="btn-secondary" onClick={handleCancel}>Cancel</button>
          <button type="button" className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <ul className="activity-list">
          <li className="activity-item">
            <span className="activity-description">Profile picture updated</span>
            <span className="activity-date">2 hours ago</span>
          </li>
          <li className="activity-item">
            <span className="activity-description">Address information updated</span>
            <span className="activity-date">1 day ago</span>
          </li>
          <li className="activity-item">
            <span className="activity-description">Email address verified</span>
            <span className="activity-date">2 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerDashboard;
