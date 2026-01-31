import { Navigate, Outlet } from "react-router-dom";
import useAdminStore from "../services/store/adminStore";

const ProtectedRoute = () => {
  const { isAuthorised } = useAdminStore();

  if (!isAuthorised) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
