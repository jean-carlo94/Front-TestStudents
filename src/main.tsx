import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Classes, Home, Students, Teachers } from './views'

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/students", element: <Students /> },
  { path: "/teachers", element: <Teachers /> },
  { path: "/classes", element: <Classes /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
