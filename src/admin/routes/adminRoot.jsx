import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAdminStore from "../services/store/adminStore";
import x from "../../assets/icons/x.png";
import openHands from "../../assets/icons/openHands.png";
import useData from "../../ledger/hooks/useData";
import Footer from "../../ledger/components/footer"

const AdminRoot = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const location = useLocation();
  const [toggleSidebar, setToggleSideBar] = useState(false);

  const getPathName = () => {
    const path = location.pathname.split("/").pop();

    if (!path || path === "admin") return "Dashboard";

    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const [current, setCurrent] = useState(getPathName());
  const {
    role,
    logOut,
    language,
    setLanguage,
    isAuthorised,
    loadDashboardData,
  } = useAdminStore();

  const {
    data: otherData,
    loading,
    error,
  } = useData(currentYear, currentMonth);

  const dict = {
    en: {
      Dashboard: "Dashboard",
      Project: "Projects",
      Donors: "Donors",
      Donations: "Donations",
      Expenses: "Expenses",
      Users: "Users",
      Logs: "Logs",
      logout: "LOG OUT",
    },
    sq: {
      Dashboard: "Paneli",
      Project: "Projektet",
      Donors: "Donatorët",
      Donations: "Donacionet",
      Expenses: "Shpenzimet",
      Users: "Përdoruesit",
      Logs: "Regjistrat",
      logout: "ÇKYÇU",
    },
    mk: {
      Dashboard: "Контролна табла",
      Project: "Проекти",
      Donors: "Донатори",
      Donations: "Донации",
      Expenses: "Трошоци",
      Users: "Корисници",
      Logs: "Записи",
      logout: "ОДЈАВИ СЕ",
    },
  };

  const lang = dict[language] || dict.en;

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
      { path: "Logs" },
    ];
  }

  useEffect(() => {
    loadDashboardData(today.getFullYear(), today.getMonth() + 1);
  }, []);

  useEffect(() => {
    setCurrent(getPathName());
  }, [location.pathname]);

  return (
    <div className="bg-slate-50 flex min-h-screen overflow-x-hidden">
      {toggleSidebar && (
        <div
          className="fixed inset-0 bg-black/20 z-40 xl:hidden"
          onClick={() => setToggleSideBar(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out 
  ${toggleSidebar ? "translate-x-0" : "-translate-x-64"} 
  xl:translate-x-0 xl:static xl:inset-0`}
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
              {lang[page.path] || page.path}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-slate-50 lg:bg-transparent lg:border-none flex justify-between items-center p-4 md:p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setToggleSideBar(true)}
              className="p-2 text-2xl xl:hidden"
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold text-slate-800">
              {lang[current] || current}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Language Switcher */}
            <div className="flex bg-white border border-slate-200 rounded-full p-1 shadow-sm">
              {["en", "sq", "mk"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
                    language === l
                      ? "bg-slate-900 text-white"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={logOut}
              className="bg-white shadow-sm border border-slate-200 px-6 py-2 flex items-center justify-center font-bold rounded-full hover:bg-slate-50 transition-all text-xs"
            >
              {lang.logout}
            </button>
          </div>
        </header>

        <section className="flex-1">
          <Outlet />
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default AdminRoot;
