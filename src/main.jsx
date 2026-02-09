import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ledger/pages/home.jsx";
import Projects from "./ledger/pages/projects.jsx";
import Donations from "./admin/pages/donations.jsx";
import Donors from "./admin/pages/donors.jsx";
import Expenses from "./admin/pages/expenses.jsx";
import Users from "./admin/pages/users.jsx";
import AdminProjects from "./admin/pages/projects.jsx";
import Dashboard from "./admin/pages/dashboard.jsx";
import PublicRoot from "./ledger/roots/publicRoot.jsx";
import AdminRoot from "./admin/routes/adminRoot.jsx";
import LoginPage from "./admin/pages/logIn.jsx";
import ProtectedRoute from "./admin/routes/protectedRoute.jsx";
import Logs from "./admin/pages/logs.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoot />,
    children: [
      {
        path: "/",
        element: <Home footer={true} />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },

  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <AdminRoot />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "project", element: <AdminProjects /> },
          { path: "donors", element: <Donors /> },
          { path: "donations", element: <Donations /> },
          { path: "expenses", element: <Expenses /> },
          { path: "users", element: <Users /> },
          { path: "logs", element: <Logs /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
