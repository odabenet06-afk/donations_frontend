import React, { useState } from "react";
import editUser from "../services/functions/editUser";
import useAdminStore from "../services/store/adminStore";

const EditUserModal = ({ userToEdit, onClose }) => {
  const { users, setUsers } = useAdminStore();
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState(userToEdit?.username || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(userToEdit?.role || "admin");
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    if (!username) {
      setError("Username cannot be empty");
      return;
    }

    const result = await editUser(
      username,
      password,
      role,
      userToEdit.username,
    );

    if (!result.success) {
      setError(result.error || "Update failed");
      return;
    }

    const updatedUsers = users.map((u) =>
      u.username === userToEdit.username ? { ...u, username, role } : u,
    );

    setUsers(updatedUsers);
    setSuccess(true);
    setError(null);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  const roleOptions = ["admin", "staff"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-20 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-1">Edit User</h2>
        <p className="text-xs text-gray-400 mb-4 font-medium italic">
          Editing: {userToEdit.username}
        </p>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              New Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full font-medium"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              New Password
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full font-medium"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Role
            </label>
            <div className="flex flex-wrap gap-2">
              {roleOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setRole(opt)}
                  className={`flex-1 min-w-[80px] py-2 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                    role === opt
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {success && (
            <p className="text-green-400 mt-4 text-sm font-medium">
              Changes saved successfully.
            </p>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
