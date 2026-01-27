import React, { useState } from "react";
import createUser from "../services/functions/createUser";
import useAdminStore from "../services/store/adminStore";

const CreateUserModal = ({ onClose }) => {
  const { users, setUsers } = useAdminStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    const result = await createUser(username, password, role);

    if (!result.success) {
      setError(result.error || "Something went wrong");
      return;
    }

    const newUser = {
      id: result.id,
      username,
      role,
      created_at: new Date().toISOString(),
    };

    setUsers([...(users || []), newUser]);
    onClose();
  };

  const roleOptions = ["admin", "staff"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-20 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>

        <div className="flex flex-col gap-3">
          {/* Username */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          {/* Role Selection  */}
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
                  className={`flex-1 min-w-[80px] flex justify-center items-center py-2 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
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

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
