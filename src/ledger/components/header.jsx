import React from "react";
import Logo from "../../assets/icons/openHands.png";
import { NavLink } from "react-router-dom";

const header = () => {
  return (
    <div className="h-20 md:h-24 bg-slate-50 flex w-full items-center justify-between border-black">
      <div className="flex flex-row items-center">
        <img
          className="h-16 w-16 md:h-20 md:w-20"
          src={Logo}
          alt="openhands logo"
        />
        <h1 className="text-lg md:text-xl font-bold">OPENHANDS</h1>
      </div>

      <div className="flex gap-4 lg:gap-8 lg:pr-8 text-md pr-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold lg:text-xl"
              : " text-gray-400 lg:text-xl"
          }
        >
          HOME
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold lg:text-xl"
              : "text-gray-400  lg:text-xl"
          }
        >
          PROJECTS
        </NavLink>
      </div>
    </div>
  );
};

export default header;
