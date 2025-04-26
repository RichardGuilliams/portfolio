import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // ⏳ Wait until user loads

  if (!user.role == "admin") return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div className="p-6 text-red-600">Unauthorized</div>;
  }

  return children;
};

export default ProtectedRoute;
