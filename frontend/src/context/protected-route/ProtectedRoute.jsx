import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../login/LoginContext";

const ProtectedRoute = () => {
  const { user } = useLogin();
  const { email } = user || {};

  if (
    email?.toLowercase() === "ayoub@gmail.com" ||
    email?.toLowercase() === "karim.mbari00@gmail.com"
  ) {
    return <Outlet />;
  }

  return <Navigate to="/connexion" />;
};

export default ProtectedRoute;
