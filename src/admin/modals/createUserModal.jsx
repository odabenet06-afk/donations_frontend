import React, { useState } from "react";
import createUser from "../services/functions/createUser";
import useAdminStore from "../services/store/adminStore";

const CreateUserModal = ({ onClose }) => {
  const { users, setUsers, language } = useAdminStore();
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState(null);

  const dict = {
    en: {
      title: "Create New User",
      username: "Username",
      password: "Password",
      role: "Role",
      admin: "Admin",
      staff: "Staff",
      cancel: "Cancel",
      create: "Create User",
      reqError: "Username and password are required",
      genError: "Something went wrong",
      successMsg: "User created successfully.",
    },
    sq: {
      title: "Krijo Përdorues të Ri",
      username: "Përdoruesi",
      password: "Fjalëkalimi",
      role: "Roli",
      admin: "Admin",
      staff: "Staf",
      cancel: "Anulo",
      create: "Krijo Përdoruesin",
      reqError: "Përdoruesi dhe fjalëkalimi kërkohen",
      genError: "Diçka shkoi keq",
      successMsg: "Përdoruesi u krijua me sukses.",
    },
    mk: {
      title: "Креирај нов корисник",
      username: "Корисничко име",
      password: "Лозинка",
      role: "Улога",
      admin: "Админ",
      staff: "Персонал",
      cancel: "Откажи",
      create: "Креирај корисник",
      reqError: "Корисничкото име и лозинката се задолжителни",
      genError: "Нешто тргна наопаку",
      successMsg: "Корисникот е успешно креиран.",
    },
  };

  const lang = dict[language] || dict.en;

  const handleCreate = async () => {
    if (!username || !password) {
      setError(lang.reqError);
      return;
    }

    const result = await createUser(username, password, role);

    if (!result.success) {
      setError(result.error || lang.genError);
      return;
    }

    const newUser = {
      id: result.id,
      username,
      role,
      created_at: new Date().toISOString(),
    };

    setUsers([...(users || []), newUser]);
    setSuccess(true);
    setError(null);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  const roleOptions = [
    { value: "admin", label: lang.admin },
    { value: "staff", label: lang.staff },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-slate-800 tracking-tight">
          {lang.title}
        </h2>

        <div className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.username}
            </label>
            <input
              type="text"
              placeholder={lang.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.password}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-2 block">
              {lang.role}
            </label>
            <div className="flex gap-3">
              {roleOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                    role === opt.value
                      ? "bg-slate-900 border-slate-900 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg mt-2">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-500 text-sm font-bold text-center bg-green-50 py-2 rounded-lg mt-2">
              {lang.successMsg}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
            >
              {lang.cancel}
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {lang.create}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;