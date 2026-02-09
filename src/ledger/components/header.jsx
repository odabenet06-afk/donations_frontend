import React from "react";
import Logo from "../../assets/icons/openHands.png";
import { NavLink } from "react-router-dom";
import useDataStore from "../services/store/dataStore";

const Header = () => {
  const { language, setLanguage } = useDataStore();

  const dict = {
    en: { home: "HOME", projects: "PROJECTS" },
    sq: { home: "PËRMBLEDHJE", projects: "PROJEKTET" },
    mk: { home: "ДОМА", projects: "ПРОЕКТИ" },
  };

  const currentLang = dict[language] || dict.en;

  return (
    <div className="bg-slate-50 w-full px-4 lg:px-8">
      <div className="bg-slate-50 w-full px-4 lg:px-8 pt-4 pb-10 flex flex-wrap items-center">
        {/* Logo */}
        <div className="w-full md:w-auto  flex justify-center md:justify-start  items-center gap-2">
          <img
            className="h-16 w-16 md:h-20 md:w-20"
            src={Logo}
            alt="openhands logo"
          />
          <h1 className="text-lg md:text-xl font-bold">OPENHANDS</h1>
        </div>

        {/* Right side */}
        <div className="w-full md:w-auto  flex justify-between md:justify-end items-center gap-6 mt-2 md:mt-0 md:ml-auto">
          {/* Language switch */}
          <div className="flex gap-3">
            {["en", "sq", "mk"].map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`text-[10px] font-black uppercase tracking-widest transition-all ${
                  language === l
                    ? "text-slate-900 border-b-2 border-slate-900"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          {/* Navigation */}
          <div className="flex gap-4 lg:gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold lg:text-xl"
                  : "text-gray-400 lg:text-xl"
              }
            >
              {currentLang.home}
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold lg:text-xl"
                  : "text-gray-400 lg:text-xl"
              }
            >
              {currentLang.projects}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
