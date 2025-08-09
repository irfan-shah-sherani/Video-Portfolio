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
import Service from './pages/Service'
import Price from './pages/Pricing'
import NotFound from './pages/NotFoundPage'
import Burger from './components/Burger'
import Menu from './pages/Menu';
import About from './pages/About';

// Auth and Portal
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Portal from './pages/Portal.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout/>}>
        <Route path="" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/price" element={<Price />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/portal"
          element={
            <ProtectedRoute>
              <Portal />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path='/burger' element={<Menu/>}>
        <Route path="" element={<Burger/>} />
      </Route>

      <Route path='*' element={<NotFound/>} />
    </>
)
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);