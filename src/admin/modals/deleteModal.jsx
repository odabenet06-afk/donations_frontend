import React, { useState } from "react";
import deleteData from "../services/functions/delete";
import useAdminStore from "../services/store/adminStore";

const ConfirmDeleteModal = ({ onCancel, id, username, type }) => {
  const [error, setError] = useState(null);

  const { donors, setDonors, users, setUsers, projects, setProjects } =
    useAdminStore();

  const onConfirm = async () => {
    const result = await deleteData(type, id, username);
    if (!result.success) {
      setError(result.error);
      return;
    }
    if (type === "donor") {
      setDonors(donors.filter((d) => d.donor_public_id !== id));
    } else if (type === "user") {
      setUsers(users.filter((u) => u.username !== username));
    } else if (type === "project") {
      setProjects(projects?.filter((p) => p.id !== id) || []);
    }
    onCancel();
    return;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md text-center relative">
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
