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
  const { role } = useAdminStore();

  return (
    <div
      key={i}
      className="col-span-2 xl:col-span-1 p-8 bg-white shadow-md flex-1 rounded-4xl"
    >
      <div className="h-12 flex mb-5 justify-between gap-4">
        {role === "staff" ? (
          <div></div>
        ) : (
          <button onClick={() => setEditModal(true)}>
            <img className="w-10 h-10" src={edit} alt="" />
          </button>
        )}
        <h1 className="text-2xl mb-10 font-semibold">{prjct.name}</h1>
        {role === "staff" ? (
          <div></div>
        ) : (
          <button onClick={() => setDeleteModal(true)}>
            <img className="w-10 h-10" src={x} alt="" />
          </button>
        )}
      </div>

      <p className="border-b-1 border-gray-100 pb-4">{prjct.description}</p>
      <div className="flex mt-4 flex-row justify-between">
        <p>Start: {formatEUDate(prjct.start_date)}</p>
        <p>
          End:{" "}
          {prjct.end_date == null ? "Ongoing" : formatEUDate(prjct.end_date)}
        </p>
      </div>
      <div className="flex mt-4 flex-row justify-between">
        <p>Status: </p>
        <p>{prjct.status}</p>
      </div>
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
