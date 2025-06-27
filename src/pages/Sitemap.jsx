import { Link } from "react-router-dom";
import { Home, ShoppingCart, Heart, User, Info, Phone, Search, FileQuestion, Settings, LayoutDashboard, Package, Users, Star } from "lucide-react";
import { useEffect } from "react";
import Breadcrumbs from "../components/BreadCrumbs";
import AOS from "aos";
import "aos/dist/aos.css";

const Sitemap = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-[#F3EFEB] min-h-screen px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <BreadCrumbs/>
        <h1
          data-aos="fade-down"
          className="text-4xl font-bold mb-8"
        >
          Sitemap
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Pages */}
          <div
            data-aos="fade-up"
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-[#A65A2E] font-poppins text-2xl mb-4 flex items-center gap-2">
              <Home size={22} /> Main Pages
            </h2>
            <ul className="space-y-3 text-[#2D2D2D]">
              <li><Link to="/" className="flex items-center gap-2 hover:underline"><Home size={18}/> Home</Link></li>
              <li><Link to="/about" className="flex items-center gap-2 hover:underline"><Info size={18}/> About Us</Link></li>
              <li><Link to="/contact" className="flex items-center gap-2 hover:underline"><Phone size={18}/> Contact</Link></li>
              <li><Link to="/faq" className="flex items-center gap-2 hover:underline"><FileQuestion size={18}/> FAQ</Link></li>
              <li><Link to="/search" className="flex items-center gap-2 hover:underline"><Search size={18}/> Search</Link></li>
              <li><Link to="/wishlist" className="flex items-center gap-2 hover:underline"><Heart size={18}/> Wishlist</Link></li>
              <li><Link to="/cart" className="flex items-center gap-2 hover:underline"><ShoppingCart size={18}/> Cart</Link></li>
              <li><Link to="/checkout" className="flex items-center gap-2 hover:underline"><Package size={18}/> Checkout</Link></li>
              <li><Link to="/orders" className="flex items-center gap-2 hover:underline"><Package size={18}/> My Orders</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-[#A65A2E] font-poppins text-2xl mb-4 flex items-center gap-2">
              <ShoppingCart size={22}/> Shop
            </h2>
            <ul className="space-y-3 text-[#2D2D2D]">
              <li><Link to="/products" className="flex items-center gap-2 hover:underline"><Package size={18}/> All Products</Link></li>
              <li><Link to="/search" className="flex items-center gap-2 hover:underline"><Search size={18}/> Search Products</Link></li>
            </ul>
          </div>

          {/* Account & Admin */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-[#A65A2E] font-poppins text-2xl mb-4 flex items-center gap-2">
              <Settings size={22}/> Account & Admin
            </h2>
            <ul className="space-y-3 text-[#2D2D2D]">
              <li><Link to="/login" className="flex items-center gap-2 hover:underline"><User size={18}/> Login</Link></li>
              <li><Link to="/register" className="flex items-center gap-2 hover:underline"><User size={18}/> Register</Link></li>
              <li><Link to="/profile" className="flex items-center gap-2 hover:underline"><User size={18}/> My Profile</Link></li>
              <li><Link to="/admin/dashboard" className="flex items-center gap-2 hover:underline"><LayoutDashboard size={18}/> Admin Dashboard</Link></li>
              <li><Link to="/admin/products" className="flex items-center gap-2 hover:underline"><Package size={18}/> Manage Products</Link></li>
              <li><Link to="/admin/orders" className="flex items-center gap-2 hover:underline"><Package size={18}/> Manage Orders</Link></li>
              <li><Link to="/admin/users" className="flex items-center gap-2 hover:underline"><Users size={18}/> Manage Users</Link></li>
              <li><Link to="/admin/reviews" className="flex items-center gap-2 hover:underline"><Star size={18}/> Manage Reviews</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
