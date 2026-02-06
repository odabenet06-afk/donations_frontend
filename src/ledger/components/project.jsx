import React, { useState } from "react";
import arrow from "../../assets/icons/arrow.png";

const Project = ({ data, projectNames, onChange, lang = "en" }) => {
  const [toggleProjects, setToggleProjects] = useState(false);

  const dict = {
    en: { noDescription: "No description available" },
    sq: { noDescription: "Nuk ka përshkrim në dispozicion" },
    mk: { noDescription: "Нема достапен опис" }
  };

  const currentLang = dict[lang] || dict.en;

  return (
    <div className="lg:grid lg:grid-cols-8 w-full">
      <div className="flex items-center p-6 flex-col relative lg:col-start-2 lg:col-span-6">
        <div
          className="relative mb-8"
          style={{ width: "fit-content", minWidth: "200px" }}
        >
          <button
            onClick={() => setToggleProjects(!toggleProjects)}
            className="flex bg-white rounded-2xl p-4 shadow-md flex-row justify-between items-center w-full gap-4"
          >
            {/* The project name comes from the database, so it won't change unless your DB is localized */}
            <h1 className="text-3xl font-bold">{data?.name}</h1>
            <img 
              className={`h-8 w-8 mt-2 transition-transform duration-200 ${toggleProjects ? 'rotate-180' : ''}`} 
              src={arrow} 
              alt="toggle" 
            />
          </button>

          {toggleProjects && (
            <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-slate-200 rounded-xl flex flex-col w-full shadow-lg">
              {projectNames.map((projName) => (
                <button
                  key={projName}
                  className={`text-left font-semibold text-lg px-4 py-2 m-2 hover:bg-gray-100 hover:rounded-xl transition-colors ${
                    projName === data?.name ? "bg-gray-100 rounded-xl" : ""
                  }`}
                  onClick={() => {
                    onChange(projName);
                    setToggleProjects(false);
                  }}
                >
                  {projName}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Localized fallback if description is missing */}
        <div className="w-full mt-4 text-lg text-slate-700 leading-relaxed">
          {data?.description ?? currentLang.noDescription}
        </div>
      </div>
    </div>
  );
};

export default Project;