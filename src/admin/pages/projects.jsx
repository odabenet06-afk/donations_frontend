import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import formatEUDate from "../services/functions/formatDate";
import Project from "../components/project";
import CreateProjectModal from "../modals/createProject";

const Projects = () => {
  const { projects, role, language } = useAdminStore();
  const [createModal, setCreateModal] = useState(false);

  // Translation Dictionary
  const dict = {
    en: {
      newProject: "New Project",
      noProjects: "NO PROJECTS AVAILABLE",
    },
    sq: {
      newProject: "Projekt i Ri",
      noProjects: "NUK KA PROJEKTE TË DISPONUESHME",
    },
    mk: {
      newProject: "Нов Проект",
      noProjects: "НЕМА ДОСТАПНИ ПРОЕКТИ",
    },
  };

  const lang = dict[language] || dict.en;

  return (
    <div className="grid p-5 gap-5 grid-cols-2 flex-1">
      {role === "staff" ? null : (
        <div className="col-span-2 w-full flex justify-center">
          <button
            onClick={() => setCreateModal(true)}
            className="h-10 bg-white px-6 flex items-center justify-center rounded-full shadow-md font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-colors"
          >
            {lang.newProject}
          </button>
        </div>
      )}

      {!projects || projects.length === 0 ? (
        <div className="col-span-2 w-full h-full flex justify-center mt-20 text-gray-400 font-black tracking-tighter opacity-50 text-2xl">
          {lang.noProjects}
        </div>
      ) : (
        projects.map((prjct, i) => <Project key={i} prjct={prjct} i={i} />)
      )}

      {createModal && (
        <CreateProjectModal onClose={() => setCreateModal(false)} />
      )}
    </div>
  );
};

export default Projects;