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
  Bed,
  Sofa,
  UtensilsCrossed,
  Briefcase,
  TreePine,
  LogIn,
  UserPlus,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import app from "../../Firebase/firebase";

import theme from "../context/Theme";
import { NavLink } from "react-router-dom";

import CountdownTimer from "./CountdownTimer";

const Navbar = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  // Desktop dropdown state
  const [shopOpen, setShopOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // Mobile sidebar state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shopRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (shopRef.current && !shopRef.current.contains(event.target)) {
        setShopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const toggleShopDropdown = () => setShopOpen((prev) => !prev);
  const toggleMoreDropdown = () => setMoreOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleMobileShop = () => setMobileShopOpen((prev) => !prev);
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

  const navLinks = [
    "Home",
    "Bedroom",
    "Living Room",
    "Dining",
    "Office",
    "Outdoor",
  ];

  const shopCategories = [
    { name: "Bedroom", icon: Bed },
    { name: "Living Room", icon: Sofa },
    { name: "Dining", icon: UtensilsCrossed },
    { name: "Office", icon: Briefcase },
    { name: "Outdoor", icon: TreePine },
  ];

  const moreLinks = ["Deals", "Contact", "About Us"];

  return (
    <>
      <div
        className="w-full text-xs font-semibold sm:text-sm max-w-8xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between py-3 gap-2 sm:gap-0 text-center sm:text-left"
        style={{
          fontFamily: theme.fonts.ui,
          backgroundColor: theme.colors.primary.DEFAULT,
          color: theme.colors.primary.contrast,
        }}
      >
        <p className="animate-pulse text-sm">
          🎉 <span className="text-[#A65A2E]">Limited Time: Free Shipping</span>{" "}
          <span className="text-white font-semibold">on Orders Over $99</span> –{" "}
          <span className="text-red-600 italic">Don’t Miss Out!</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <CountdownTimer targetDate="2025-07-10T23:59:59" />

          <div className="flex items-center gap-1 sm:gap-2 text-[11px]">
            <Users size={14} color={theme.colors.accent.DEFAULT} />
            <span>
              {visitorCount ? `${visitorCount} Visitors` : "Loading..."}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.div
        className={`flex justify-between items-center h-12 w-full max-w-8xl sticky top-0 left-0 mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 z-50 ${
          isScrolled ? "shadow-md" : "border-t"
        }`}
        style={{
          backgroundColor: theme.colors.primary.DEFAULT,
          borderColor: isScrolled ? "transparent" : theme.colors.ui.border,
        }}
      >
        <div
          className="flex-shrink-0 cursor-pointer font-bold select-none flex items-center"
          tabIndex={0}
          aria-label="Homepage"
          style={{
            color: theme.colors.primary.contrast,
            fontFamily: theme.fonts.header,
          }}
        >
          {/* Logo image */}
          <img
            src={Logo}
            alt="Hudson Logo"
            className="w-6 h-6 sm:w-8 rounded-full sm:h-8 mr-2"
          />

          {/* Logo text */}
          <span
            className="text-lg sm:text-xl tracking-wide"
            style={{ color: theme.colors.accent.DEFAULT }}
          >
            Hudson
          </span>
          <span
            className="ml-1.5 text-sm sm:text-base tracking-normal"
            style={{ color: theme.colors.primary.contrast }}
          >
            Furniture
          </span>
        </div>

        <div
          className="hidden items-center justify-center font-semibold h-full md:flex gap-6 xl:gap-8"
          style={{ fontFamily: theme.fonts.alt }}
        >
          <motion.div
            className="relative h-full flex items-center justify-center cursor-pointer select-none"
            whileHover="hover"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm transition-colors duration-300 ${
                  isActive
                    ? "text-[#BF6E3D]"
                    : "text-[#F8F5F2] hover:text-[#BF6E3D]"
                }`
              }
            >
              Home
            </NavLink>
          </motion.div>
          <div
            ref={shopRef}
            className="relative h-full inline-block"
            onClick={toggleShopDropdown}
          >
            <div className="relative h-full flex items-center justify-center cursor-pointer select-none">
              <motion.div className="relative" whileHover="hover">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `text-sm transition-colors duration-300 ${
                      isActive
                        ? "text-[#BF6E3D]"
                        : "text-[#F8F5F2] hover:text-[#BF6E3D]"
                    }`
                  }
                >
                  Shop
                </NavLink>
              </motion.div>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  shopOpen ? "rotate-180" : ""
                } relative top-0.5`}
                style={{ color: theme.colors.primary.contrast }}
              />
            </div>

            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 font-semibold mt-2 p-4 grid grid-cols-2 gap-4 shadow-lg z-50 w-68"
                  style={{
                    backgroundColor: theme.colors.background.muted,
                    fontFamily: theme.fonts.alt,
                  }}
                >
                  {shopCategories.map(({ name, icon: Icon }) => (
                    <a
                      key={name}
                      href="#"
                      className="flex items-center gap-2 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm"
                    >
                      <Icon size={16} />
                      {name}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Static Nav Items */}
          {["New Arrivals", "Blog"].map((label) => (
            <motion.div
              key={label}
              whileHover="hover"
              className="cursor-pointer text-[#F8F5F2] hover:text-[#BF6E3D] text-sm"
            >
              {label}
            </motion.div>
          ))}

          <div ref={moreRef} className="relative" onClick={toggleMoreDropdown}>
            <div className="relative flex items-center justify-center gap-1 cursor-pointer select-none">
              <motion.div whileHover="hover" className="relative">
                <span className="text-[#F8F5F2] hover:text-[#BF6E3D] text-sm">
                  More
                </span>
              </motion.div>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  moreOpen ? "rotate-180" : ""
                } relative top-0.5`}
                style={{ color: theme.colors.primary.contrast }}
              />
            </div>

            {/* Dropdown Menu (desktop) */}
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-9 mt-2 w-40 shadow-lg overflow-hidden z-60"
                >
                  {moreLinks.map((label) => (
                    <a
                      key={label}
                      href="#"
                      className="block px-4 py-2 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium"
                      style={{
                        backgroundColor: theme.colors.background.muted,
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Icons + Mobile Toggle */}
        <div
          className="md:flex hidden items-center gap-2 sm:gap-3 md:gap-4 relative"
          style={{ color: theme.colors.primary.contrast }}
        >
          {/* Desktop Search */}
          <Search className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />

          {/* Desktop Wishlist */}
          <Heart className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />

          {/* Desktop Cart */}
          <NavLink to="/cart" aria-label="Cart">
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
          </NavLink>

          {/* Desktop Login */}

          <NavLink to="/login" aria-label="Login">
            <LogIn className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
          </NavLink>

          {/* Desktop Sign Up */}
          <NavLink to="/register" aria-label="Sign Up">
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
          </NavLink>
        </div>
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="block md:hidden rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A65A2E]"
          style={{ color: theme.colors.primary.contrast }}
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7 " />
          ) : (
            <Menu className="w-6 h-6 sm:w-7 sm:h-7 " />
          )}
        </button>
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
                  className="flex items-baseline cursor-pointer"
                  tabIndex={0}
                  aria-label="Homepage"
                  onClick={toggleMobileMenu}
                >
                  <span
                    className="text-lg"
                    style={{ color: theme.colors.accent.DEFAULT }}
                  >
                    Hudson
                  </span>
                  <span
                    className="ml-1.5 text-sm"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    Furniture
                  </span>
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

                {/* Login / Register */}
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
                    onClick={toggleMobileShop}
                    className="w-full flex justify-between items-center text-base font-medium focus:outline-none"
                    style={{ color: theme.colors.primary.contrast }}
                  >
                    <span className="flex items-center gap-2">
                      <Sofa size={18} />
                      Shop Categories
                    </span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        mobileShopOpen ? "rotate-180" : ""
                      }`}
                      size={16}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileShopOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 flex flex-col gap-2"
                      >
                        {shopCategories.map(({ name, icon: Icon }) => (
                          <NavLink
                            key={name}
                            to={`/${name.toLowerCase().replace(/\s+/g, "-")}`}
                            className="flex items-center gap-2 text-sm font-normal"
                            style={{ color: theme.colors.primary.contrast }}
                            onClick={toggleMobileMenu} // optionally close sidebar on selection
                          >
                            <Icon size={16} />
                            {name}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
