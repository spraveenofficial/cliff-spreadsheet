import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/auth-context";

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
};

export const GuestRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/" />
  );
};
