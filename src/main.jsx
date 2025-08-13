import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
// import AdminDashboard from './dashboards/admin/AdminDashboard'
// import AccountantDashboard from './dashboards/accountant/AccountantDashboard'
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    {/* <AdminDashboard/> */}
    {/* <AccountantDashboard/> */}
    <App/>
    {/* </BrowserRouter> */}
=======

// import AdminDashboard from './dashboards/admin/AdminDashboard';
// import AccountantDashboard from './dashboards/accountant/AccountantDashboard';
// import App from './App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App/>
     {/* <AccountantDashboard/> */}
    {/* <AdminDashboard/> */}
</BrowserRouter>
>>>>>>> 2a3e9a4563e76c007fb05b5ee028f83c0b32ba7c
  </StrictMode>,
)
