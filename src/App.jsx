<<<<<<< HEAD
import { Toaster } from 'react-hot-toast'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Register from './pages/RegisterForm'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import { gsap } from "gsap";
=======
import { Toaster } from 'react-hot-toast';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/RegisterForm';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

>>>>>>> 204969fb06a2e3dd1a329a75b44cb237a50de2d3
function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
