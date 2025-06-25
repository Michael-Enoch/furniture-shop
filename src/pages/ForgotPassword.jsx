import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { FaChair } from 'react-icons/fa';

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
    success: '#7A8C5D', // Using the outdoor category color for success
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.background.DEFAULT }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-sm w-full max-w-md overflow-hidden"
        style={{ 
          border: `1px solid ${theme.colors.ui.border}`,
          fontFamily: theme.fonts.body,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Header */}
        <div 
          className="h-16 flex items-center justify-center relative"
          style={{ backgroundColor: theme.colors.primary.DEFAULT }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-4 gap-2 h-full">
              {[...Array(8)].map((_, i) => (
                <FaChair 
                  key={i} 
                  className="w-full h-full p-1" 
                  style={{ color: theme.colors.primary.contrast }} 
                />
              ))}
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaChair 
              className="text-3xl z-10" 
              style={{ color: theme.colors.primary.contrast }} 
            />
          </motion.div>
        </div>
        
        <div className="p-8">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 
                  className="text-2xl font-semibold mb-2"
                  style={{ 
                    color: theme.colors.primary.DEFAULT,
                    fontFamily: theme.fonts.header
                  }}
                >
                  Reset Your Password
                </h2>
                <p 
                  className="text-sm mb-6"
                  style={{ color: theme.colors.text.primary }}
                >
                  Enter your email and we'll send you a link to reset your password.
                </p>
              </motion.div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail 
                        className="h-5 w-5" 
                        style={{ color: theme.colors.accent.DEFAULT }} 
                      />
                    </div>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-lg border focus:outline-none"
                      style={{ 
                        borderColor: theme.colors.ui.border,
                        fontFamily: theme.fonts.ui,
                        backgroundColor: theme.colors.ui.base
                      }}
                      required
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
                    }`}
                    style={{ 
                      backgroundColor: isLoading 
                        ? theme.colors.ui.border 
                        : theme.colors.accent.DEFAULT,
                      color: theme.colors.primary.contrast,
                      fontFamily: theme.fonts.ui
                    }}
                    whileHover={!isLoading ? { 
                      scale: 1.01,
                      boxShadow: `0 5px 15px ${theme.colors.accent.DEFAULT}33`
                    } : {}}
                    whileTap={!isLoading ? { scale: 0.99 } : {}}
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </motion.button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center pt-2"
                >
                  <a 
                    href="/login" 
                    className="text-sm flex items-center justify-center hover:underline"
                    style={{ color: theme.colors.accent.DEFAULT }}
                  >
                    <FiArrowLeft className="mr-2" />
                    Back to login
                  </a>
                </motion.div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${theme.colors.success}20` }}
                >
                  <FiCheckCircle 
                    className="text-3xl" 
                    style={{ color: theme.colors.success }} 
                  />
                </div>
              </motion.div>
              
              <h3 
                className="text-xl font-semibold mb-2"
                style={{ 
                  color: theme.colors.primary.DEFAULT,
                  fontFamily: theme.fonts.header
                }}
              >
                Check Your Email
              </h3>
              
              <p 
                className="mb-6 max-w-md mx-auto"
                style={{ color: theme.colors.text.primary }}
              >
                We've sent a password reset link to <span className="font-medium">{email}</span>. 
                Please check your inbox and follow the instructions.
              </p>
              
              <div className="text-sm text-gray-500 mb-6">
                <p>Didn't receive the email?</p>
                <p>Check your spam folder or resend the link.</p>
              </div>
              
              <div className="flex flex-col space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 rounded-lg"
                  style={{ 
                    backgroundColor: theme.colors.accent.DEFAULT,
                    color: theme.colors.primary.contrast,
                    fontFamily: theme.fonts.ui
                  }}
                  onClick={() => {
                    setIsSubmitted(false);
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setIsSubmitted(true);
                    }, 1000);
                  }}
                >
                  Resend Email
                </motion.button>
                
                <a 
                  href="/login" 
                  className="text-sm flex items-center justify-center hover:underline py-2"
                  style={{ color: theme.colors.accent.DEFAULT }}
                >
                  <FiArrowLeft className="mr-2" />
                  Back to login
                </a>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Decorative Footer */}
        <div 
          className="h-12 flex items-center justify-center relative"
          style={{ backgroundColor: theme.colors.background.alt }}
        >
          <div className="flex space-x-1 opacity-60">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              >
                <FaChair 
                  className="text-xs mx-0.5" 
                  style={{ color: theme.colors.primary.DEFAULT }} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;  