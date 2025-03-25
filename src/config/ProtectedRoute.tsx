import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ErrorPage from "../pages/ErrorPage";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
}) => {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/" />;
  }

  if (user?.role && requiredRoles && !requiredRoles.includes(user.role)) {
    return <ErrorPage />;
  }

  return user ? children : <Navigate to="/" />;
};
export default ProtectedRoute;
