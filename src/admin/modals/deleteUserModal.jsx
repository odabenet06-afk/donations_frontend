import React, { useState } from "react";
import deleteUser from "../services/functions/deleteUser";
import useAdminStore from "../services/store/adminStore";

const DeleteUserModal = ({ userToDelete, onCancel }) => {
  const [error, setError] = useState(null);
  const { users, setUsers } = useAdminStore();
  const [success, setSuccess] = useState(false);
  const onConfirm = async () => {
    const result = await deleteUser(userToDelete.username);

    if (!result.success) {
      setError(result.error || "Failed to delete user");
      return;
    }

    setUsers(users.filter((u) => u.username !== userToDelete.username));
    setSuccess(true);
    setError(null)
    setTimeout(() => {
      setSuccess(false);
      onClose(); 
    }, 2000);
    return;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md text-center relative">
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete user{" "}
          <span className="font-bold text-slate-800">
            {userToDelete?.username}
          </span>
          ? This action cannot be undone.
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
        <p className="text-red-400 mt-4 text-sm">{error}</p>
        {success && (
          <p className="text-green-400 mt-4 text-sm font-medium">
            Changes saved successfully.
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteUserModal;
