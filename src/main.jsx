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
import Dashboard from "./admin/pages/dashboard.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/admin",
    element: <Projects />,
    children: [
       {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <AdminProjects />,
      },
      {
        path: "donors",
        element: <Donors />,
      },
      {
        path: "donations",
        element: <Donations />,
      },
      {
        path: "expenses",
        element: <Expenses />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
