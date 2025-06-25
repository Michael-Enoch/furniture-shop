import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/RegisterForm";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartPage } from "./pages/CartPage";
import SearchPage from "./pages/SearchPage";
import { CartProvider } from "./context/CartContext";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";
import Ticker from "./components/ScrollingTicker";
import FaqPage from "./pages/FAQPage";
import DebugBar from "./components/DebugBar";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetailPage";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/checkOut";




function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
          {/* <DebugBar /> */}
        <Footer/>
        <Ticker />
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
