import React, { useState, useEffect } from "react";
import Home from "./home.jsx";
import useDataStore from "../services/store/dataStore.js";
import Project from "../components/project.jsx";
import { useOutletContext } from "react-router-dom";

const Projects = () => {

    const { lang } = useOutletContext();
  const storeData = useDataStore((state) => state.storeData);

  const allProjects = storeData?.projects ?? [];

  const [project, setProject] = useState(null);

  useEffect(() => {
    if (allProjects.length > 0 && !project) {
      setProject(allProjects[0].name);
    }
  }, [allProjects, project]);

  const currentProject = allProjects.find((p) => p.name === project);

  const projectNames = allProjects.map((p) => p.name);

  const filteredData = {
    donations: storeData?.donations?.filter((d) => d.purpose === project) ?? [],
    expenses: storeData?.expenses?.filter((e) => e.purpose === project) ?? [],
  };

  return (
    <div className="w-screen h-screen bg-slate-50">
      <Project
        data={currentProject}
        projectNames={projectNames}
        onChange={setProject}
        lang={lang} 
      />
    
      <Home reusable={filteredData} lang={lang} />
    </div>
  );
};

export default Projects;
