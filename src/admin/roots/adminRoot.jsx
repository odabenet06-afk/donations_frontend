import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAdminStore from "../services/store/adminStore";
import x from "../../assets/icons/x.png";
import { Link } from "react-router-dom";
import openHands from "../../assets/icons/openHands.png";

const AdminRoot = () => {
  const [toggleSidebar, setToggleSideBar] = useState(false);
  const [current, setCurrent] = useState("Dashboard");

  const loadDashboardData = useAdminStore((state) => state.loadDashboardData);

  const { role, logOut } = useAdminStore();

  let pages;
  if (role === "staff") {
    pages = [
      { path: "Donors" },
      { path: "Donations" },
      { path: "Expenses" },
      { path: "Project" },
    ];
  } else {
    pages = [
      { path: "Dashboard" },
      { path: "Project" },
      { path: "Donors" },
      { path: "Donations" },
      { path: "Expenses" },
      { path: "Users" },
    ];
  }

  useEffect(() => {
    const today = new Date();
    loadDashboardData(today.getFullYear(), today.getMonth() + 1);
  }, []);

  return (
    <div className="bg-slate-50 flex min-h-screen overflow-x-hidden">
      {/* Sidebar Overlay for Mobile */}
      {toggleSidebar && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setToggleSideBar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out 
          ${toggleSidebar ? "translate-x-0" : "-translate-x-64"} 
          lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="p-6 flex justify-between items-center ">
          <img className="w-12 h-12" src={openHands} alt="Logo" />
          <button
            className="lg:hidden p-2"
            onClick={() => setToggleSideBar(false)}
          >
            <img className="w-6 h-6" src={x} alt="close" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {pages.map((page, i) => (
            <Link
              key={i}
              to={"/admin/" + page.path.toLowerCase()}
              onClick={() => {
                setCurrent(page.path);
                setToggleSideBar(false);
              }}
              className={`p-3 rounded-xl font-semibold transition-colors ${
                current === page.path
                  ? "bg-slate-100 text-slate-600"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page.path === "Project" ? "Projects" : page.path}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-slate-50 lg:bg-transparent lg:border-none flex justify-between items-center p-4 md:p-6">
          <button
            onClick={() => setToggleSideBar(true)}
            className="p-2 text-2xl lg:hidden"
          >
            ☰
          </button>
          <h1 className="text-2xl font-bold text-slate-800">
            {current === "Project" ? "Projects" : current}
          </h1>
          <button
            onClick={logOut}
            className="bg-white shadow-sm border border-slate-200 px-6 py-2 flex items-center justify-center font-bold rounded-full hover:bg-slate-50 transition-all"
          >
            LOG OUT
          </button>
        </header>

        <section className="flex-1">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminRoot;
