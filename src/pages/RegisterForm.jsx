import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  FiMail, 
  FiLock, 
  FiUser, 
  FiHome, 
  FiLogIn,
  // FiBed,
  FiCoffee,
  FiMonitor,
  FiUmbrella,
  FiBook
} from "react-icons/fi";
import { 
  FaChair,
  FaBed 
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const theme = {
  fonts: {
    header:  "'Raleway', sans-serif",
    body: "'Inter', sans-serif",
    alt: "'Poppins', sans-serif",
    ui: "'Work Sans', sans-serif",
  },
  colors: {
    primary: {
      DEFAULT: '#3A2F2A',
      contrast: '#F8F5F2',
    },
    accent: {
      DEFAULT: '#A65A2E',
      hover: '#BF6E3D',
    },
    background: {
      DEFAULT: '#F3EFEB',
      alt: "#EFEAE5",       
      muted: '#EAE6E1',
    },
    text: {
      primary: '#2D2D2D',
      onPrimary: '#F8F5F2',
    },
    ui: {
      base: '#FFFFFF',
      border: '#DAD4CE',
    },
    category: {
      bedroom: '#CDB8A0',
      living: '#A39887',
      office: '#7F8B91',
      dining: '#B57C54',
      outdoor: '#7A8C5D',
    },
  },
  semanticRoles: {
    navBackground: 'primary.DEFAULT',
    primaryButtonBackground: 'primary.DEFAULT',
    primaryButtonText: 'primary.contrast',
    sectionBackground: 'background.DEFAULT',
    cardBackground: 'background.muted',
    bodyText: 'text.primary',
    footerBackground: 'ui.base',
    inputBackground: 'ui.base',
    inputBorder: 'ui.border',
    hoverEffect: 'accent.hover',
    ctaButton: 'accent.DEFAULT',
    ctaHover: 'accent.hover',
  },
};

const Register = () => {
  const { register: signUp } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const password = watch("password", "");

  // Category icons mapping
  const categoryIcons = {
    bedroom: <FaBed  className="h-5 w-5" />,
    living: <FaChair className="h-5 w-5" />,
    office: <FiMonitor className="h-5 w-5" />,
    dining: <FiCoffee className="h-5 w-5" />,
    outdoor: <FiUmbrella className="h-5 w-5" />,
  };
  const navigate = useNavigate();

 const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userData = {
        ...data,
        preferences: selectedCategory ? [selectedCategory] : []
      };

      await signUp(userData.email, userData.password, userData.role || 'customer', userData.name);
      toast.success("Welcome to Hudson's Furniture!");
      navigate('/'); // Redirect to homepage after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message || "Couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(166, 90, 46, 0.2)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.background.DEFAULT }}
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md"
        style={{ 
          border: `1px solid ${theme.colors.ui.border}`,
          fontFamily: theme.fonts.body,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)'
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="flex flex-col items-center space-y-3 mb-6"
          variants={itemVariants}
        >
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaChair 
              className="text-4xl" 
              style={{ color: theme.colors.accent.DEFAULT }} 
            />
          </motion.div>
          <h2 
            className="text-2xl font-semibold"
            style={{ 
              color: theme.colors.primary.DEFAULT,
              fontFamily: theme.fonts.header
            }}
          >
            Create Your Account
          </h2>
          <p 
            className="text-sm text-center"
            style={{ color: theme.colors.text.primary }}
          >
            Join our community of furniture enthusiasts
          </p>
        </motion.div>

        <div className="space-y-4">
          {/* Name Field */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser 
                  className="h-5 w-5" 
                  style={{ color: theme.colors.accent.DEFAULT }} 
                />
              </div>
              <input
                {...register("name", { 
                  required: "Full name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
                type="text"
                placeholder="Full name"
                className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none"
                style={{ 
                  borderColor: errors.name ? theme.colors.accent.DEFAULT : theme.colors.ui.border,
                  fontFamily: theme.fonts.ui,
                  backgroundColor: theme.colors.ui.base
                }}
              />
            </div>
            {errors.name && (
              <p className="text-xs mt-1 pl-1" style={{ color: theme.colors.accent.DEFAULT }}>
                {errors.name.message}
              </p>
            )}
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail 
                  className="h-5 w-5" 
                  style={{ color: theme.colors.accent.DEFAULT }} 
                />
              </div>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none"
                style={{ 
                  borderColor: errors.email ? theme.colors.accent.DEFAULT : theme.colors.ui.border,
                  fontFamily: theme.fonts.ui,
                  backgroundColor: theme.colors.ui.base
                }}
              />
            </div>
            {errors.email && (
              <p className="text-xs mt-1 pl-1" style={{ color: theme.colors.accent.DEFAULT }}>
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock 
                  className="h-5 w-5" 
                  style={{ color: theme.colors.accent.DEFAULT }} 
                />
              </div>
              <input
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                type="password"
                placeholder="Create password"
                className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none"
                style={{ 
                  borderColor: errors.password ? theme.colors.accent.DEFAULT : theme.colors.ui.border,
                  fontFamily: theme.fonts.ui,
                  backgroundColor: theme.colors.ui.base
                }}
              />
            </div>
            {errors.password && (
              <p className="text-xs mt-1 pl-1" style={{ color: theme.colors.accent.DEFAULT }}>
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Confirm Password Field */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock 
                  className="h-5 w-5" 
                  style={{ color: theme.colors.accent.DEFAULT }} 
                />
              </div>
              <input
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => 
                    value === password || "Passwords do not match"
                })}
                type="password"
                placeholder="Confirm password"
                className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none"
                style={{ 
                  borderColor: errors.confirmPassword ? theme.colors.accent.DEFAULT : theme.colors.ui.border,
                  fontFamily: theme.fonts.ui,
                  backgroundColor: theme.colors.ui.base
                }}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs mt-1 pl-1" style={{ color: theme.colors.accent.DEFAULT }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>

          {/* Furniture Preference with Icons */}
          <motion.div 
            variants={itemVariants} 
            className="pt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label 
              className="block text-sm mb-2"
              style={{ color: theme.colors.text.primary }}
            >
              Your furniture style preference:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(theme.colors.category).map(([category, color]) => (
                <motion.div 
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      selectedCategory === category 
                        ? 'ring-2 ring-offset-2' 
                        : 'opacity-80 hover:opacity-100'
                    }`}
                    style={{ 
                      backgroundColor: color,
                      color: theme.colors.primary.DEFAULT,
                      borderColor: theme.colors.primary.DEFAULT,
                      ringColor: theme.colors.accent.DEFAULT
                    }}
                  >
                    {categoryIcons[category]}
                  </div>
                  <span className="text-xs mt-1 capitalize" style={{ color: theme.colors.text.primary }}>
                    {category}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="pt-6"
          variants={itemVariants}
        >
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={{ 
              backgroundColor: loading ? theme.colors.ui.border : theme.colors.primary.DEFAULT,
              color: theme.colors.primary.contrast,
              fontFamily: theme.fonts.ui
            }}
            whileHover={!loading ? { 
              scale: 1.01,
              boxShadow: `0 5px 15px ${theme.colors.accent.DEFAULT}33`
            } : {}}
            whileTap={!loading ? { scale: 0.99 } : {}}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <FiHome className="h-5 w-5" />
                <span>Create Account</span>
              </>
            )}
          </motion.button>
        </motion.div>

        <motion.div 
          className="text-center pt-4"
          variants={itemVariants}
        >
          <p className="text-sm" style={{ color: theme.colors.text.primary }}>
            Already have an account?{' '}
            <a 
              href="/login" 
              className="font-medium hover:underline"
              style={{ color: theme.colors.accent.DEFAULT }}
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default Register;