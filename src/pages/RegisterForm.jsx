import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { 
  FiMail, 
  FiLock, 
  FiUser, 
} from "react-icons/fi";
import { 
  FaChair,
} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Home } from "lucide-react";
import theme from "../context/Theme";


const Register = () => {
  const { register: signUp } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const password = watch("password", "");

  const navigate = useNavigate();

   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  

 const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userData = {
        ...data,
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
              size={23} 
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
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 ml-3 flex items-center pointer-events-none">
                <FiUser 
                  className="h-4 w-4" 
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
              <div className="absolute inset-y-0 left-0 ml-3 flex items-center pointer-events-none">
                <FiMail 
                  className="h-4 w-4" 
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
              <div className="absolute inset-y-0 left-0 ml-3 flex items-center pointer-events-none">
                <FiLock 
                  className="h-4 w-4" 
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
                  className="h-4 w-4" 
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
        </div>

        <motion.div 
          className="pt-6"
          variants={itemVariants}
        >
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 text-md rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={{ 
              backgroundColor: loading ? theme.colors.ui.border : theme.colors.accent.DEFAULT,
              color: theme.colors.primary.contrast,
              fontFamily: theme.fonts.ui
            }}
            whileHover={!loading ? { 
              scale: 1.01,
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
                <Home className="h-4 w-4" />
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
            <Link
              to="/login" 
              className="font-medium hover:underline"
              style={{ color: theme.colors.accent.DEFAULT }}
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default Register;