import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login successful!");

      // Wait briefly to let AuthContext update
      setTimeout(() => {
        const storedRole = localStorage.getItem("userRole"); // optional if role is saved
        console.log("Logged in user role:", storedRole || "Check context/state");
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-3 rounded-md transition duration-300 ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-gray-950 hover:bg-black"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
