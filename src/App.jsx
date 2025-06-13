
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/RegisterForm";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartPage } from "./pages/CartPage";
import SearchPage from "./pages/SearchPage";

import { CartProvider } from "./context/CartContext";
import AboutUs from "./pages/AboutUs";


function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/aboutus" element={<AboutUs/>} />
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
