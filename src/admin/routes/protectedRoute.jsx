import { Navigate, Outlet } from "react-router-dom";
import useAdminStore from "../services/store/adminStore";
import { useEffect, useState } from "react";
import checkToken from "../services/functions/checkToken";

const ProtectedRoute = () => {
  const { isAuthorised, token } = useAdminStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const mainToken = localStorage.getItem("token");
      if (!mainToken) {
        setLoading(false);
        return;
      }

      const result = await checkToken();
      if (!result.success) {
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    verify();
  }, [token]);

  if (loading) {
    return null;
  }

  if (!isAuthorised) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
