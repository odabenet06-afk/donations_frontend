import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import formatEUDate from "../services/functions/formatDate";
import Project from "../components/project";
import CreateProjectModal from "../modals/createProject";

const projects = () => {
  const { projects, role } = useAdminStore();
  const [createModal, setCreateModal] = useState(false);

  return (
    <div className="grid p-5 gap-5 grid-cols-2 flex-1">
      {role === "staff" ? (
        null
      ) : (
        <div className="col-span-2 w-full flex justify-center">
          <button
            onClick={() => setCreateModal(true)}
            className="h-10 bg-white p-4 flex items-center justify-center rounded-full shadow-md"
          >
            New Project
          </button>
        </div>
      )}
      {!projects ? (
        <div className="w-full h-full flex justify-center mt-20 ">
          NO PROJECTS AVAILABLE
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

export default projects;
