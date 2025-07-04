import { getDatabase, onValue, ref, runTransaction } from "firebase/database";
// eslint-disable-next-line no-unused-vars
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
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  History,
  BookOpenText,
  Mail,
} from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useEffect, useRef, useState } from "react";

// Get initials from Full name
const getInitials = (name = "", email = "") => {
  if (name && name.trim().length > 0) {
    const nameParts = name.trim().split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${
        nameParts[nameParts.length - 1][0]
      }`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  }

  if (email) {
    const localPart = email.split("@")[0];
    const parts = localPart.split(".");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return localPart[0].toUpperCase();
  }

  return "U";
};

// Avatar Component
const Avatar = ({ user }) => {
  const initials = getInitials(user?.displayName, user?.email);

  return (
    <div
      className="rounded-full w-8 h-8 border-2 flex items-center justify-center"
      style={{
        borderColor: theme.colors.accent.DEFAULT,
        backgroundColor: theme.colors.category.living,
        color: theme.colors.primary.contrast,
      }}
    >
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="text-xs font-medium">{initials}</span>
      )}
    </div>
  );
};

const Navbar = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { logOut, currentUser, role } = useAuth();
  const [visitorCount, setVisitorCount] = useState(0);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // Mobile sidebar state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

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

  // Close the desktop "More" dropdown if clicked outside
  const moreRef = useRef(null);
  // Close the desktop "Profile" dropdown if clicked outside
  const profileRef = useRef(null);

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

  useEffect(() => {
    const db = getDatabase(app);
    const countRef = ref(db, "visitorCount");

    runTransaction(countRef, (current) => (current || 0) + 1)
      .then(() => console.log("Visitor count incremented"))
      .catch((err) => console.error("Transaction failed:", err));

    const unsubscribe = onValue(countRef, (snapshot) => {
      setVisitorCount(snapshot.val());
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setProfileOpen(false);
      setMobileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const moreLinks = [
    { name: "Site map", to: "/site-map" },
    { name: "Reviews", to: "/reviews" },
    { name: "FAQ", to: "/faq" },
  ];

  const isAdmin = role === "admin";

  const base = isAdmin ? "/admin" : "";

  const profileLinks = [
    {
      name: "Dashboard",
      to: isAdmin ? "/admin" : "/dashboard",
      icon: <LayoutDashboard size={14} />,
    },
    { name: "Orders", to: `${base}/orders`, icon: <History size={14} /> },
    { name: "Settings", to: `${base}/settings`, icon: <Settings size={14} /> },
    { name: "Logout", icon: <LogOut size={14} />, onClick: handleLogout },
  ];

  const utilityLinks = [
    { name: "Cart", to: "/cart", icon: <ShoppingCart size={18} /> },
    { name: "Wishlist", to: "/wishlist", icon: <Heart size={18} /> },
  ];

  const MobileUtilityLinks = [
    { name: "Cart", to: "/cart", icon: <ShoppingCart size={14} /> },
    { name: "Wishlist", to: "/wishlist", icon: <Heart size={14} /> },
  ];

  const Navlinks = [
    { name: "Home", to: "/" },
    { name: "Shop", to: "/products" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const MobileNavLinks = [
    { name: "Home", to: "/", icon: <Home size={14} /> },
    { name: "Shop", to: "/products", icon: <Sofa size={14} /> },
    { name: "About", to: "/about", icon: <BookOpenText size={14} /> },
    { name: "Contact", to: "/contact", icon: <Mail size={14} /> },
  ];

  const capitalizeFirstLetter = (string) =>
    string ? string.charAt(0).toUpperCase() + string.slice(1) : "";

  return (
    <>
      <div
        className="w-full text-xs font-semibold sm:text-sm max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-3 gap-2 sm:gap-0 text-center sm:text-left"
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
      <div
        className={`flex justify-between items-center py-2 w-full max-w-screen-2xl sticky top-0 left-0 mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 z-50`}
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
              Furnishings
            </span>
          </div>
        </div>

        {/* Center Navigation Links */}
        <div
          className="hidden items-center justify-center font-medium h-full md:flex gap-8 xl:gap-10"
          style={{ fontFamily: theme.fonts.alt }}
        >
          {Navlinks.map((link) => (
            <motion.div
              className="relative h-full flex items-center justify-center cursor-pointer select-none"
              whileHover="hover"
            >
              <NavLink
                to={link.to}
                key={link.name}
                className={({ isActive }) =>
                  `text-base transition-colors duration-300 ${
                    isActive
                      ? "text-[#BF6E3D]"
                      : "text-[#F8F5F2] hover:text-[#BF6E3D]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </motion.div>
          ))}

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
                    backgroundColor: theme.colors.background.muted,
                  }}
                >
                  {moreLinks.map((label, i) => (
                    <Link
                      key={i}
                      to={label.to}
                      className="block px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium transition-all duration-200"
                    >
                      {label.name}
                    </Link>
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

          {/* utility Links*/}
          <div className="flex items-center gap-4">
            {utilityLinks.map((link) => (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  key={link.name}
                  to={link.to}
                  aria-label="Cart"
                  className="relative w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors"
                >
                  {link.icon}
                  {link.name === "Cart" && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center bg-[#D97706] shadow-md">
                      {cartCount}
                    </span>
                  )}
                  {link.name === "Wishlist" && wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center bg-[#D97706] shadow-md">
                      {wishlistCount}
                    </span>
                  )}
                </NavLink>
              </motion.div>
            ))}

            {/* Profile Dropdown */}
            {currentUser ? (
              <div ref={profileRef} className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Avatar user={currentUser} size={18} />
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
                      <div
                        className="px-4 py-3 border-b"
                        style={{
                          backgroundColor: theme.colors.background.muted,
                        }}
                      >
                        <p className="text-sm font-medium text-[#2D2D2D]">
                          {currentUser.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 mb-2 truncate">
                          {currentUser.email}
                        </p>
                        <p className="truncate text-sm font-medium text-[#2D2D2D]">
                          {capitalizeFirstLetter(role)}
                        </p>
                      </div>
                      {profileLinks.map((link) =>
                        link.onClick ? (
                          <button
                            key={link.name}
                            onClick={link.onClick}
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
                            className="px-4 py-3 text-[#2D2D2D] hover:text-[#BF6E3D] text-sm font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                            style={{
                              backgroundColor: theme.colors.background.muted,
                            }}
                          >
                            {link.icon}
                            {link.name}
                          </NavLink>
                        )
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink to="/register" aria-label="Sign Up">
                    <UserPlus className="w-5 h-5 cursor-pointer hover:text-[#BF6E3D] transition-colors" />
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
      </div>

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
                      {currentUser.displayName || "User"}
                    </p>
                    <p className="text-xs opacity-75 truncate">
                      {currentUser.email}
                    </p>
                    <p className="truncate capitalize opacity-75 text-sm font-medium">
                      {capitalizeFirstLetter(role)}
                    </p>
                  </div>
                </div>
              )}

              {/* Sidebar Links */}
              <nav className="flex flex-col px-4 py-6 gap-2 overflow-y-auto">
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
                <div className="flex flex-col gap-3 py-2 border-b border-[#DAD4CE]">
                  {MobileNavLinks.map((link) => (
                    <NavLink
                      to={link.to}
                      key={link.name}
                      onClick={toggleMobileMenu}
                      style={{ color: theme.colors.primary.contrast }}
                      className={({ isActive }) =>
                        `text-sm transition-colors w-full duration-300 flex items-center gap-2 font-medium ${
                          isActive
                            ? "text-[#BF6E3D]"
                            : "text-[#F8F5F2] hover:text-[#BF6E3D]"
                        }`
                      }
                    >
                      {link.icon}
                      {link.name}
                    </NavLink>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-col gap-3 py-2 border-b border-[#DAD4CE]">
                  {MobileUtilityLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.to}
                      className="flex items-center gap-2 text-sm font-medium"
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
                      {link.name === "Wishlist" && wishlistCount > 0 && (
                        <span className="ml-auto text-xs w-5 h-5 rounded-full flex items-center justify-center bg-[#D97706]">
                          {wishlistCount}
                        </span>
                      )}
                    </NavLink>
                  ))}

                  {currentUser ? (
                    <>
                      {profileLinks.map((link) =>
                        link.onClick ? (
                          <button
                            key={link.name}
                            onClick={link.onClick}
                            className="flex items-center gap-2 text-sm font-medium w-full text-left"
                            style={{ color: theme.colors.primary.contrast }}
                          >
                            {link.icon}
                            {link.name}
                          </button>
                        ) : (
                          <NavLink
                            key={link.name}
                            to={link.to}
                            className="flex items-center gap-2 text-sm font-medium"
                            style={{ color: theme.colors.primary.contrast }}
                            onClick={toggleMobileMenu}
                          >
                            {link.icon}
                            {link.name}
                          </NavLink>
                        )
                      )}
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="flex items-center gap-2 text-sm font-medium"
                        style={{ color: theme.colors.primary.contrast }}
                        onClick={toggleMobileMenu}
                      >
                        <LogIn size={14} /> Login
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="flex items-center gap-2 text-sm font-medium"
                        style={{ color: theme.colors.primary.contrast }}
                        onClick={toggleMobileMenu}
                      >
                        <UserPlus size={14} /> Register
                      </NavLink>
                    </>
                  )}
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
                        {moreLinks.map((label, i) => (
                          <Link
                            key={i}
                            to={label.to}
                            className="text-base font-normal transition-colors focus:outline-none"
                            style={{ color: theme.colors.primary.contrast }}
                            onClick={() => {
                              setMobileMoreOpen(false);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {label.name}
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
