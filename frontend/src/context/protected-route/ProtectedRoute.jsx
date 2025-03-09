import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../login/LoginContext";

const ProtectedRoute = () => {
  const { user } = useLogin();
  const { name } = user || {};

  return name === "Ayoub Jdad" ? <Outlet /> : <Navigate to="/connexion" />;
};

export default ProtectedRoute;
