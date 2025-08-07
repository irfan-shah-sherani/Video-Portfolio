import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import Home from './pages/Home'
import Contact from './pages/Contact'
import Layout from './pages/Layout'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<Layout/>}> 
        <Route path="" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
)
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);