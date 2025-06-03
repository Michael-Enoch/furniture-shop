import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  // import the custom hook
  const { register: signUp } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password, data.role);
      toast.success("Registration successful!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration Failed!");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center">
          Create an Account
        </h2>
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
        <select {...register("role")} className="w-full border border-gray-300 p-3 rounded-md" required>
          <option value="customer">Customer</option>
          <option value="customer">Admin</option>
        </select>

        <button type="submit" className="w-full bg-gray-950 text-white py-3 rounded-md hover:bg-black transition duration-300ms">Register</button>
      </form>
    </div>
  );
};

export default Register;
