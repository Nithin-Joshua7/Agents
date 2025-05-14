import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const PrivateRoute = ({ children }) => {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!user && !localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;