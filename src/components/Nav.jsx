/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { getDatabase, onValue, ref, runTransaction } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/images/hudson.png";
import theme from "../context/Theme.jsx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import app from "../../Firebase/firebase";
import {
  ShoppingCart,
  Search,
  Heart,
  Menu,
  X,
  Users,
  ChevronDown,
  Sofa,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  Settings,
  History
} from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

// Utility function to get initials
const getInitials = (name = '', email = '') => {
  if (name && name.trim().length > 0) {
    const nameParts = name.trim().split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  }
  
  if (email) {
    const emailParts = email.split('@')[0];
    if (emailParts.includes('.')) {
      const emailNameParts = emailParts.split('.');
      return `${emailNameParts[0][0]}${emailNameParts[1][0]}`.toUpperCase();
    }
    return emailParts[0].toUpperCase();
  }
  
  return 'U';
};

// Avatar component
const Avatar = ({ user, size = 32 }) => {
  const initials = getInitials(user?.displayName, user?.email);
  
  return (
    <div 
      className="rounded-full overflow-hidden border-2 flex items-center justify-center"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderColor: theme.colors.accent.DEFAULT,
        backgroundColor: theme.colors.category.living,
        color: theme.colors.primary.contrast,
        fontSize: `${size * 0.4}px`,
        fontWeight: 'bold'
      }}
    >
      {user?.photoURL ? (
        <img 
          src={user.photoURL} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [visitorCount, setVisitorCount] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { cartCount } = useCart();

  // Refs for click outside detection
  const moreRef = useRef(null);
  const profileRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      setMobileMenuOpen(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleIconClick = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const toggleMoreDropdown = () => setMoreOpen((prev) => !prev);
  const toggleProfileDropdown = () => setProfileOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleMobileMore = () => setMobileMoreOpen((prev) => !prev);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Track visitor count
  useEffect(() => {
    const db = getDatabase(app);
    const countRef = ref(db, "visitorCount");
    runTransaction(countRef, (current) => (current || 0) + 1).catch((err) =>
      console.error("Transaction failed:", err)
    );
    const unsubscribe = onValue(countRef, (snapshot) => {
      setVisitorCount(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setProfileOpen(false);
      setMobileMenuOpen(false);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const moreLinks = [
    { name: "About Us", to: "/about" },
    { name: "Contact Us", to: "/contact" },
    { name: "Reviews", to: "/reviews" },
    { name: "Blog", to: "/blog" },
    { name: "Support", to: "/support" }
  ];

  const profileLinks = [
    { name: "Dashboard", to: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Orders", to: "/orders", icon: <History size={18} /> },
    { name: "Settings", to: "/settings", icon: <Settings size={18} /> },
    { name: "Logout", action: handleLogout, icon: <LogOut size={18} /> }
  ];

  const utilityLinks = [
    { name: "Cart", to: "/cart", icon: <ShoppingCart size={18} /> },
    { name: "Wishlist", to: "/wishlist", icon: <Heart size={18} /> }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div
        className="w-full text-xs font-semibold sm:text-sm max-w-11xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-3 gap-2 sm:gap-0 text-center sm:text-left"
        style={{
          fontFamily: theme.fonts.ui,
          backgroundColor: theme.colors.accent.DEFAULT,
          color: theme.colors.primary.contrast,
        }}
      >
        <div className="flex items-center gap-1 sm:gap-2">
          <p>Call Us</p>:
          <a href="tel:+1234567890" className="underline">
            +1 (234) 567-890
          </a>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 animate-pulse">
          <p>Shop now and get a Discount on all orders</p>
          <Link to="/register" className="underline">
            Sign up Now
          </Link>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Users size={14} className="text-primary-contrast" />
          <span>
            {visitorCount ? `${visitorCount} Visitors` : "Loading..."}
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.div
        className={`flex justify-between items-center py-2 w-full max-w-8xl sticky top-0 left-0 mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 z-50`}
        style={{
          backgroundColor: theme.colors.primary.DEFAULT,
        }}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Logo Section */}
        <motion.div
          className="flex-shrink-0 cursor-pointer font-bold select-none flex items-center"
          tabIndex={0}
          aria-label="Homepage"
          style={{
            color: theme.colors.primary.contrast,
            fontFamily: theme.fonts.header,
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/")}
        >
          <img
            src={Logo}
            alt="Hudson Logo"
            className="w-6 h-6 sm:w-8 sm:h-8 mr-3 rounded-full"
          />
          <div className="flex flex-col">
            <span
              className="text-xl sm:text-2xl tracking-wide leading-none"
              style={{ color: theme.colors.accent.DEFAULT }}
            >
              Hudson
            </span>
            <span
              className="text-xs sm:text-sm tracking-normal opacity-90 leading-none"
              style={{ color: theme.colors.primary.contrast }}
            >
              Furniture
            </span>
          </div>
        </motion.div>

        {/* Center Navigation Links */}
        <div
          className="hidden items-center justify-center font-semibold h-full md:flex gap-8 xl:gap-10"
          style={{ fontFamily: theme.fonts.alt }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base transition-colors duration-300 ${
                isActive
                  ? "text-[#BF6E3D]"
                  : "text-[#F8F5F2] hover:text-[#BF6E3D]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-base transition-colors duration-300 ${
                isActive
                  ? "text-[#BF6E3D]"
                  : "text-[#F8F5F2] hover:text-[#BF6E3D]"
              }`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `text-base transition-colors duration-300 ${
                isActive
                  ? "text-[#BF6E3D]"
                  : "text-[#F8F5F2] hover:text-[#BF6E3D]"
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/deals"
            className={({ isActive }) =>
              `text-base transition-colors duration-300 ${
                isActive
                  ? "text-[#BF6E3D]"
                  : "text-[#F8F5F2] hover:text-[#BF6E3D]"
              }`
            }
          >
            Deals
          </NavLink>

          {/* More Dropdown */}
          <div ref={moreRef} className="relative" onClick={toggleMoreDropdown}>
            <div className="relative flex items-center justify-center gap-1 cursor-pointer select-none group">
              <motion.div whileHover="hover" className="relative">
                <span className="text-[#F8F5F2] hover:text-[#BF6E3D] group-hover:text-[#BF6E3D] text-base transition-colors duration-300">
                  More
                </span>
              </motion.div>
              <ChevronDown
                size={16}
                className={`transition-all duration-200 ml-1 ${
                  moreOpen
                    ? "rotate-180 text-[#BF6E3D]"
                    : "group-hover:text-[#BF6E3D]"
                }`}
                style={{
                  color: moreOpen
                    ? theme.colors.accent.DEFAULT
                    : theme.colors.primary.contrast,
                }}
              />
            </div>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-48 shadow-xl rounded-lg overflow-hidden z-60 border"
                  style={{
                    borderColor: theme.colors.ui.border,
                  }}
                >
                  {moreLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      className="block px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                      style={{
                        backgroundColor: theme.colors.background.muted,
                      }}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section - Search & Icons */}
        <div
          className="hidden md:flex items-center gap-6 relative"
          style={{ color: theme.colors.primary.contrast }}
        >
          {/* Search */}
          <div className="relative w-full flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleIconClick}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <Search className="w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
            </motion.button>
          </div>

          {/* Utility Links */}
          <div className="flex items-center gap-4">
            {utilityLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to={link.to}
                  aria-label={link.name}
                  className="relative w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors"
                >
                  {link.icon}
                  {link.name === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center bg-[#D97706] shadow-md">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            ))}

            {/* Conditional rendering based on auth state */}
            {currentUser ? (
              /* Logged-in state */
              <div ref={profileRef} className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Avatar user={currentUser} size={32} />
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      profileOpen ? "rotate-180 text-[#BF6E3D]" : ""
                    }`}
                  />
                </motion.div>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-48 shadow-xl rounded-lg overflow-hidden z-60 border"
                      style={{
                        borderColor: theme.colors.ui.border,
                      }}
                    >
                      <div className="px-4 py-3 border-b" style={{ backgroundColor: theme.colors.background.muted }}>
                        <p className="text-sm font-medium text-[#2D2D2D]">
                          {currentUser.displayName || currentUser.email.split('@')[0]}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser.email}
                        </p>
                      </div>
                      {profileLinks.map((link) => (
                        link.action ? (
                          <button
                            key={link.name}
                            onClick={link.action}
                            className="w-full text-left px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                            style={{
                              backgroundColor: theme.colors.background.muted,
                            }}
                          >
                            {link.icon}
                            {link.name}
                          </button>
                        ) : (
                          <NavLink
                            key={link.name}
                            to={link.to}
                            className="block px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                            style={{
                              backgroundColor: theme.colors.background.muted,
                            }}
                          >
                            {link.icon}
                            {link.name}
                          </NavLink>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Logged-out state */
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <NavLink 
                    to="/login" 
                    className="flex items-center gap-1"
                    aria-label="Login"
                  >
                    <LogIn className="w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
                    <span className="hidden lg:inline text-sm">Login</span>
                  </NavLink>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <NavLink 
                    to="/register" 
                    className="flex items-center gap-1"
                    aria-label="Sign Up"
                  >
                    <UserPlus className="w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
                    <span className="hidden lg:inline text-sm">Register</span>
                  </NavLink>
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMobileMenu}
          className="block md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A65A2E]"
          style={{ color: theme.colors.primary.contrast }}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.button>
      </motion.div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black z-40"
              aria-hidden="true"
            />

            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs z-60 font-medium shadow-xl"
              style={{
                backgroundColor: theme.colors.primary.DEFAULT,
                fontFamily: theme.fonts.ui,
                color: theme.colors.primary.contrast,
                borderRight: `1px solid ${theme.colors.ui.border}`,
              }}
              aria-label="Mobile Navigation Sidebar"
            >
              {/* Sidebar Header */}
              <div className="flex justify-between font-semibold items-center p-4 border-b">
                <div
                  className="flex items-center cursor-pointer"
                  tabIndex={0}
                  aria-label="Homepage"
                  onClick={toggleMobileMenu}
                >
                  <img
                    src={Logo}
                    alt="Hudson Logo"
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span
                      className="text-lg leading-none"
                      style={{ color: theme.colors.accent.DEFAULT }}
                    >
                      Hudson
                    </span>
                    <span
                      className="text-xs leading-none opacity-90"
                      style={{ color: theme.colors.primary.contrast }}
                    >
                      Furniture
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  aria-label="Close Menu"
                  className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#A65A2E]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* User Profile Section */}
              {currentUser && (
                <div className="px-4 py-3 border-b flex items-center gap-3">
                  <Avatar user={currentUser} size={40} />
                  <div>
                    <p className="text-sm font-medium">
                      {currentUser.displayName || currentUser.email.split('@')[0]}
                    </p>
                    <p className="text-xs opacity-75 truncate">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Sidebar Links */}
              <nav className="flex flex-col px-4 py-6 gap-4 overflow-y-auto">
                <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                  <Search size={16} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-3">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `text-base transition-colors duration-300 ${
                        isActive
                          ? "text-[#BF6E3D]"
                          : "text-[#F8F5F2] hover:text-[#BF6E3D]"
                      }`
                    }
                    onClick={toggleMobileMenu}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      `text-base transition-colors duration-300 ${
                        isActive
                          ? "text-[#BF6E3D]"
                          : "text-[#F8F5F2] hover:text-[#BF6E3D]"
                      }`
                    }
                    onClick={toggleMobileMenu}
                  >
                    Shop
                  </NavLink>
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      `text-base transition-colors duration-300 ${
                        isActive
                          ? "text-[#BF6E3D]"
                          : "text-[#F8F5F2] hover:text-[#BF6E3D]"
                      }`
                    }
                    onClick={toggleMobileMenu}
                  >
                    Categories
                  </NavLink>
                  <NavLink
                    to="/deals"
                    className={({ isActive }) =>
                      `text-base transition-colors duration-300 ${
                        isActive
                          ? "text-[#BF6E3D]"
                          : "text-[#F8F5F2] hover:text-[#BF6E3D]"
                      }`
                    }
                    onClick={toggleMobileMenu}
                  >
                    Deals
                  </NavLink>
                </div>

                {/* Action Links */}
                <div className="flex flex-col gap-2">
                  {utilityLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      className="flex items-center gap-2 text-base font-medium"
                      style={{ color: theme.colors.primary.contrast }}
                      onClick={toggleMobileMenu}
                    >
                      {link.icon}
                      {link.name}
                      {link.name === "Cart" && cartCount > 0 && (
                        <span className="ml-auto text-xs w-5 h-5 rounded-full flex items-center justify-center bg-[#D97706]">
                          {cartCount}
                        </span>
                      )}
                    </NavLink>
                  ))}

                  {currentUser ? (
                    <>
                      {profileLinks.map((link) => (
                        link.action ? (
                          <button
                            key={link.name}
                            onClick={() => {
                              link.action();
                              toggleMobileMenu();
                            }}
                            className="flex items-center gap-2 text-base font-medium w-full text-left"
                            style={{ color: theme.colors.primary.contrast }}
                          >
                            {link.icon}
                            {link.name}
                          </button>
                        ) : (
                          <NavLink
                            key={link.name}
                            to={link.to}
                            className="flex items-center gap-2 text-base font-medium"
                            style={{ color: theme.colors.primary.contrast }}
                            onClick={toggleMobileMenu}
                          >
                            {link.icon}
                            {link.name}
                          </NavLink>
                        )
                      ))}
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="flex items-center gap-2 text-base font-medium"
                        style={{ color: theme.colors.primary.contrast }}
                        onClick={toggleMobileMenu}
                      >
                        <LogIn size={18} /> Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="flex items-center gap-2 text-base font-medium"
                        style={{ color: theme.colors.primary.contrast }}
                        onClick={toggleMobileMenu}
                      >
                        <UserPlus size={18} /> Register
                      </NavLink>
                    </>
                  )}
                </div>

                {/* More Links */}
                <div>
                  <button
                    onClick={toggleMobileMore}
                    className="w-full flex justify-between items-center text-base font-medium focus:outline-none"
                    style={{ color: theme.colors.primary.contrast }}
                    aria-expanded={mobileMoreOpen}
                  >
                    <span>More</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        mobileMoreOpen ? "rotate-180" : ""
                      }`}
                      style={{ color: theme.colors.primary.contrast }}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileMoreOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 flex flex-col gap-2"
                      >
                        {moreLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.to}
                            className="text-base font-normal transition-colors focus:outline-none"
                            style={{ color: theme.colors.primary.contrast }}
                            onClick={() => {
                              setMobileMoreOpen(false);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;