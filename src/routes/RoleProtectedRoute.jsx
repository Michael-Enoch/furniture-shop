import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const RoleProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/login" replace />;

  const userRole = userData?.role;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RoleProtectedRoute;
