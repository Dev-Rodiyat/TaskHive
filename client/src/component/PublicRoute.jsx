import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

const PublicRoute = ({ children }) => {
  const { user } = useUser();
  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
