import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import AdminDashboard from './dashboards/admin/AdminDashboard';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AdminDashboard/>
    </BrowserRouter>
  </StrictMode>,
)
