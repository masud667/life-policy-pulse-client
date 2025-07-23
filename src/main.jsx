import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import mainRoute from './Routes/MainRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={mainRoute}></RouterProvider>
  </StrictMode>,
)
