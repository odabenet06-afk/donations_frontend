import React, { useState } from "react";
import formatEUDate from "../services/functions/formatDate";
import x from "../../assets/icons/x.png";
import edit from "../../assets/icons/edit.png";
import ConfirmDeleteModal from "../modals/deleteModal";
import EditProjectModal from "../modals/editProject";
import useAdminStore from "../services/store/adminStore";

const Project = ({ prjct, i }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { role, language } = useAdminStore(); 

  const dict = {
    en: {
      start: "Start",
      end: "End",
      status: "Status",
      ongoing: "Ongoing",

      active: "Active",
      completed: "Completed",
    },
    sq: {
      start: "Fillimi",
      end: "Mbarimi",
      status: "Statusi",
      ongoing: "Në vazhdim",
 
      active: "Aktiv",
      completed: "I përfunduar",
    },
    mk: {
      start: "Почеток",
      end: "Крај",
      status: "Статус",
      ongoing: "Во тек",

      active: "Активен",
      completed: "Завршен",
    }
  };

  const lang = dict[language] || dict.en;

 
  const translateStatus = (status) => {
    const s = status?.toLowerCase();
    return lang[s] || status;
  };

  return (
    <div
      key={i}
      className="col-span-2 h-full xl:col-span-1 p-8 bg-white shadow-md rounded-4xl flex flex-col"
    >
      {/* TOP SECTION: Title and Actions */}
      <div className="h-12 flex mb-5 justify-between gap-4">
        {role === "staff" ? (
          <div className="w-10"></div>
        ) : (
          <button onClick={() => setEditModal(true)}>
            <img className="w-10 h-10" src={edit} alt="Edit" />
          </button>
        )}
        <h1 className="text-2xl mb-10 font-semibold">{prjct.name}</h1>
        {role === "staff" ? (
          <div className="w-10"></div>
        ) : (
          <button onClick={() => setDeleteModal(true)}>
            <img className="w-10 h-10" src={x} alt="Delete" />
          </button>
        )}
      </div>

      {/* MIDDLE SECTION: Description */}
      <p className="pb-4">{prjct?.description}</p>

      {/* BOTTOM SECTION */}
      <div className="mt-auto border-t border-gray-100 pt-4">
        <div className="flex flex-row justify-between text-sm">
          <p className="text-gray-500">
            <span className="font-bold text-gray-700">{lang.start}:</span> {formatEUDate(prjct.start_date)}
          </p>
          <p className="text-gray-500">
            <span className="font-bold text-gray-700">{lang.end}:</span>{" "}
            {prjct.end_date == null ? lang.ongoing : formatEUDate(prjct.end_date)}
          </p>
        </div>
        <div className="flex mt-4 flex-row justify-between items-center">
          <p className="text-gray-500 font-bold">{lang.status}: </p>
          <p className="font-medium px-3 py-1 bg-slate-50 rounded-lg text-xs uppercase tracking-wide">
            {translateStatus(prjct.status)}
          </p>
        </div>
      </div>

      {/* MODALS */}
      {deleteModal && (
        <ConfirmDeleteModal
          type={"project"}
          id={prjct.id}
          onCancel={() => setDeleteModal(false)}
        />
      )}
      {editModal && (
        <EditProjectModal prjct={prjct} onClose={() => setEditModal(false)} />
      )}
    </div>
  );
};

export default Project;