import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAdminStore from "../services/store/adminStore";
import checkToken from "../services/functions/checkToken";

const ProtectedRoute = () => {
  const isAuthorised = useAdminStore((state) => state.isAuthorised);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {

      await checkToken();
      setChecking(false);
    };


    verify();
  }, []);

  if (checking) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p className="animate-pulse font-bold text-slate-500">Verifying Session...</p>
      </div>
    );
  }

  return isAuthorised ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;