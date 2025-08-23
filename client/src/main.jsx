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

// Redux store
// Redux store
import { Provider } from 'react-redux';
import store from './redux/store';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/Signup.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout/>}>
        <Route path="" element={<Home />} />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route path="/service" element={<Service />} />
        <Route path="/price" element={<Price />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route path='/burger' element={<Menu/>}>
        <Route path="" element={<Burger/>} />

      </Route>
      <Route path='*' element={<NotFound/>} />
    </>
  )
);


// We create a small wrapper component separate for refresh logic
import React from 'react';
import { refreshMe } from './redux/authSlice.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const AppInitializer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshMe());
  }, [dispatch]);
  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  </StrictMode>
);