import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// import AdminDashboard from './dashboards/admin/AdminDashboard';
// import App from './App';
import AccountantDashboard from './dashboards/accountant/AccountantDashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AccountantDashboard/>
    </BrowserRouter>
  </StrictMode>,
)
