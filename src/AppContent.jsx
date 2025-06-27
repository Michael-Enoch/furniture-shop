import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Nav";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetailPage";
import SearchPage from "./pages/SearchPage";
import Register from "./pages/RegisterForm";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FAQPage";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/checkOut";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import AdminUsers from "./pages/admin/UsersManagement";
import AdminProducts from "./pages/admin/ProductsManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";
import { Wishlist } from "./pages/wishlist";
import { CartPage } from "./pages/CartPage";
import Footer from "./components/Footer";
import Ticker from "./components/ScrollingTicker";
import { Toaster } from "sonner";
import { useEffect } from "react";
import ThankYou from "./pages/ThankYou";
import Sitemap from "./pages/Sitemap";
import AllReviews from "./pages/AllReviews";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isThankYouRoute = location.pathname.startsWith("/thank-you");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Toaster position="bottom-center" richColors expand={true} />

      {!isAdminRoute && !isThankYouRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/site-map" element={<Sitemap />} />
         <Route path="/reviews" element={<AllReviews />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Protected Routes for admin */}
        <Route element={<RoleProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<OrdersManagement />} />
          </Route>
        </Route>

        {/* Protected Routes for customers/admin */}
        <Route
          element={<RoleProtectedRoute allowedRoles={["customer", "admin"]} />}
        >
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>

      {!isAdminRoute && !isThankYouRoute && (
        <>
          <Footer />
          <Ticker />
        </>
      )}
    </>
  );
}

export default AppContent;
