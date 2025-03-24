import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
// import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Import Bootstrap CSS globally
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ For Bootstrap JS components

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={router} />
  </StrictMode>,
)
