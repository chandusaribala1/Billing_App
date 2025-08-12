import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
import AccountantDashboard from './dashboards/accountant/AccountantDashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AccountantDashboard/>
    </BrowserRouter>

=======

// import AccountantDashboard from './dashboards/accountant/AccountantDashboard';
// import AdminDashboard from './dashboards/admin/AdminDashboard';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <App/>
>>>>>>> 638017e63d6d6437cd11c7e1944657f223853c0d
  </StrictMode>,
)
