import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminProtectedRoute = () => {
  const { currentUser, userData, loading } = useAuth();
  const isAdmin = userData?.role === "admin";

if (loading) {
  return <div className="p-10">Loading...</div>;
}

if (!currentUser) return <Navigate to="/login" replace />;
if (isAdmin) return <Navigate to="/" replace />;

return <Outlet />;

};

export default AdminProtectedRoute;
