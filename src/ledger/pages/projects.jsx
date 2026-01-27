import React, { useState } from "react";
import Home from "./home.jsx";
import useDataStore from "../services/store/dataStore.js";
import Project from "../components/project.jsx";

const Projects = () => {
  const storeData = useDataStore((state) => state.storeData); // subscribe to store
  const allProjects = [
    ...(storeData?.projects ?? []),
    {
      name: "General",
      description:
        "This section highlights the collective impact of everyone who has contributed. From small acts to big donations, each effort helps keep the platform running and supports all ongoing projects. Be part of this shared mission and help create real change in the community.",
    },
  ];

  const [project, setProject] = useState("General");

  const currentProject = allProjects.find((p) => p.name === project) ?? {
    name: "General",
    description:
      "This project represents general contributions that support the platform as a whole. Be part of it!",
  };

  const projectNames = allProjects.map((p) => p.name) ?? [];

  const filteredData = {
    donations: storeData?.donations?.filter((d) => d.purpose === project) ?? [],
    expenses: storeData?.expenses?.filter((e) => e.purpose === project) ?? [],
  };

  return (
    <div className="w-screen h-screen bg-slate-50">
      <Project data={currentProject} projectNames={projectNames} onChange={setProject}/>
      <Home reusable={filteredData} />
    </div>
  );
};

export default Projects;
