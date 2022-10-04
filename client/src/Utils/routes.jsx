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

export const GuestRoutes = (props) => {
  const { isAuthenticated } = useAuth();
  if (props.to && !isAuthenticated)
    return <Navigate to={props.to ?? "/login"} />;
  const location = useLocation();
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/dashboard" />
  );
};
