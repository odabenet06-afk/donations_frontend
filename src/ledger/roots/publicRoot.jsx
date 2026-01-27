import Header from "../components/header";
import { Outlet } from "react-router-dom";
import useData from "../hooks/useData";
import { initReloadSocket } from "../services/functions/ws.js";

const PublicRoot = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  initReloadSocket();

  const { data, loading, error } = useData(currentYear, currentMonth);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PublicRoot;
