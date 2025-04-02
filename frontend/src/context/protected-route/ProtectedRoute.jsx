import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../login/LoginContext";

const ProtectedRoute = () => {
  const { user } = useLogin();
  const { email } = user || {};

  if (
    email?.toLowerCase() === "ayoub@gmail.com" ||
    email?.toLowerCase() === "karim.mbari00@gmail.com"
  ) {
    return <Outlet />;
  }

  return <Navigate to="/connexion" />;
};

export default ProtectedRoute;
