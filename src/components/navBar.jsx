/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { getDatabase, onValue, ref, runTransaction } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/images/hudson.png";
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
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import app from "../../Firebase/firebase";
import theme from "../context/Theme";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);

  // Mobile sidebar state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
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

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClick(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleMoreDropdown = () => setMoreOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleMobileMore = () => setMobileMoreOpen((prev) => !prev);

  // Close the desktop "More" dropdown if clicked outside
  const moreRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const moreLinks = ["About Us", "Contact", "Reviews", "Blog", "Support"];

  return (
    <>
      <div
        className="w-full text-xs font-semibold sm:text-sm max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-3 gap-2 sm:gap-0 text-center sm:text-left"
        style={{
          fontFamily: theme.fonts.ui,
          backgroundColor: theme.colors.accent.DEFAULT,
          color: theme.colors.primary.contrast,
        }}
      >
        <div className="flex items-center gap-1 sm:gap-2 text-[11px]">
          <p>Call Us</p>
          {":"}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 text-[11px]">
          <Users size={14} color={theme.colors.primary.contrast} />
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
      >
        {/* Logo Section */}
        <div
          className="flex-shrink-0 cursor-pointer font-bold select-none flex items-center"
          tabIndex={0}
          aria-label="Homepage"
          style={{
            color: theme.colors.primary.contrast,
            fontFamily: theme.fonts.header,
          }}
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
        </div>

        {/* Center Navigation Links */}
        <div
          className="hidden items-center justify-center font-semibold h-full md:flex gap-8 xl:gap-10"
          style={{ fontFamily: theme.fonts.alt }}
        >
          {/* Home Link */}
          <motion.div
            className="relative h-full flex items-center justify-center cursor-pointer select-none"
            whileHover="hover"
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
          </motion.div>

          <motion.div
            className="relative h-full flex items-center justify-center cursor-pointer select-none group"
            whileHover="hover"
          >
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-base transition-colors duration-300 ${
                  isActive
                    ? "text-[#BF6E3D]"
                    : "text-[#F8F5F2] hover:text-[#BF6E3D] group-hover:text-[#BF6E3D]"
                }`
              }
            >
              Shop
            </NavLink>
          </motion.div>

          <motion.div
            className="relative h-full flex items-center justify-center cursor-pointer select-none"
            whileHover="hover"
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
              Categories
            </NavLink>
          </motion.div>

          {/* Deals Link */}
          <motion.div
            className="relative h-full flex items-center justify-center cursor-pointer select-none"
            whileHover="hover"
          >
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
          </motion.div>

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
                  <a
                    href="#"
                    className="block px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                    style={{
                      backgroundColor: theme.colors.background.muted,
                    }}
                  >
                    About Us
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                    style={{
                      backgroundColor: theme.colors.background.muted,
                    }}
                  >
                    Contact
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                    style={{
                      backgroundColor: theme.colors.background.muted,
                    }}
                  >
                    Reviews
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                    style={{
                      backgroundColor: theme.colors.background.muted,
                    }}
                  >
                    Blog
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                    style={{
                      backgroundColor: theme.colors.background.muted,
                    }}
                  >
                    Support
                  </a>
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

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Heart className="w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <NavLink to="/cart" aria-label="Cart">
                <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
              </NavLink>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <NavLink to="/register" aria-label="Sign Up">
                <UserPlus className="w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
              </NavLink>
            </motion.div>
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

              {/* Sidebar Links */}
              <nav className="flex flex-col px-4 py-6 gap-4 overflow-y-auto">
                <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-3">
                  <NavLink
                    to="/"
                    className="flex items-center gap-2 text-base font-medium"
                    style={{ color: theme.colors.primary.contrast }}
                    onClick={toggleMobileMenu}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/deals"
                    className="flex items-center gap-2 text-base font-medium"
                    style={{ color: theme.colors.primary.contrast }}
                    onClick={toggleMobileMenu}
                  >
                    Deals
                  </NavLink>
                </div>

                {/* Action Links */}
                <div className="flex flex-col gap-2">
                  <NavLink
                    to="/cart"
                    className="flex items-center gap-2 text-base font-medium"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    <ShoppingCart size={18} /> Cart
                  </NavLink>
                  <NavLink
                    to="/"
                    className="flex items-center gap-2 text-base font-medium"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    <Heart size={18} /> Wishlist
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="flex items-center gap-2 text-base font-medium"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    <LogIn size={18} /> Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="flex items-center gap-2 text-base font-medium"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    <UserPlus size={18} /> Register
                  </NavLink>
                </div>
                <div>
                  <button
                    className="w-full flex justify-between items-center text-base font-medium focus:outline-none"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    <span className="flex items-center gap-2">
                      <Sofa size={18} />
                      Shop
                    </span>
                  </button>
                </div>

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
                        {moreLinks.map((label) => (
                          <a
                            key={label}
                            href="#"
                            className="text-base font-normal transition-colors focus:outline-none"
                            style={{ color: theme.colors.primary.contrast }}
                            onClick={() => {
                              setMobileMoreOpen(false);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {label}
                          </a>
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
