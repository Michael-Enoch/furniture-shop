feature/contact-page
import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/RegisterForm'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import ContactPage from './pages/ContactPage'


main

import { gsap } from "gsap";

import { Toaster } from 'react-hot-toast';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/RegisterForm';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {CartPage } from './pages/CartPage';
import SearchPage from './pages/SearchPage';
import Breadcrumbs from './components/BreadCrumbs';


function App() {
  return (
    <AuthProvider>
feature/contact-page
    <Toaster position='top-right' reverseOrder={false}/>
    <Navbar/>
    <Homepage/>
    <ContactPage/>
      {/* <Register/>
      <Login/> */}
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
main
    </AuthProvider>
  );
}

export default App;
