import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CustomerDashboard from './CustomerDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomerDashboard></CustomerDashboard>
  </StrictMode>,
)
