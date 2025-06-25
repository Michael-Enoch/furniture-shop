import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import { FaChair } from "react-icons/fa";
import theme from "../context/Theme";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

const Login = () => {
  const {login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
const onSubmit = async (data) => {
  setLoading(true);
  try {
    const userCredential = await login(data.email, data.password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const name = userDoc.exists() ? userDoc.data().name : "Guest";

    toast.success(`Welcome back ${name}`, {
      style: {
        backgroundColor: "#3A2F2A",
        color: "#F8F5F2",
        border: "1px solid #A65A2E",
      },
      position: "top-right",
      duration: 3000,
    });

    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Couldn't sign you in. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: theme.colors.background.DEFAULT }}
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md space-y-6"
        style={{
          border: `1px solid ${theme.colors.ui.border}`,
          fontFamily: theme.fonts.body,
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col items-center space-y-3">
          <FaChair
            className="text-4xl"
            style={{ color: theme.colors.accent.DEFAULT }}
          />
          <h2
            className="text-2xl font-semibold"
            style={{
              color: theme.colors.primary.DEFAULT,
              fontFamily: theme.fonts.header,
            }}
          >
            Welcome Back
          </h2>
          <p
            className="text-sm text-center"
            style={{ color: theme.colors.text.primary }}
          >
            Sign in to access your furniture designs and orders
          </p>
        </div>

        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.01 }} whileFocus="focus">
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
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Your email address"
                className="w-full pl-10 pr-3 py-3 rounded-md border focus:outline-none"
                style={{
                  borderColor: theme.colors.ui.border,
                  fontFamily: theme.fonts.ui,
                }}
              />
            </div>
            {errors.email && (
              <p
                className="text-xs mt-1"
                style={{ color: theme.colors.accent.DEFAULT }}
              >
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} whileFocus="focus">
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
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Your password"
                className="w-full pl-10 pr-3 py-3 rounded-md border focus:outline-none"
                style={{
                  borderColor: theme.colors.ui.border,
                  fontFamily: theme.fonts.ui,
                }}
              />
            </div>
            {errors.password && (
              <p
                className="text-xs mt-1"
                style={{ color: theme.colors.accent.DEFAULT }}
              >
                {errors.password.message}
              </p>
            )}
          </motion.div>
        </div>

        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md flex items-center justify-center space-x-2 transition-all duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={{
              backgroundColor: loading
                ? theme.colors.ui.border
                : theme.colors.accent.DEFAULT,
              color: theme.colors.primary.contrast,
              fontFamily: theme.fonts.ui,
            }}
            whileHover={!loading ? { scale: 1.01 } : {}}
            whileTap={!loading ? { scale: 0.99 } : {}}
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                <FiLogIn size={15} />
                <span>Sign In</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="text-center pt-2">
          <a
            href="/forgot-password"
            className="text-sm hover:underline"
            style={{ color: theme.colors.accent.DEFAULT }}
          >
            Forgot password?
          </a>
          <p
            className="text-sm mt-2"
            style={{ color: theme.colors.text.primary }}
          >
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium hover:underline"
              style={{ color: theme.colors.accent.DEFAULT }}
            >
              Create one
            </a>
          </p>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
