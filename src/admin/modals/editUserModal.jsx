import React, { useState } from "react";
import editUser from "../services/functions/editUser";
import useAdminStore from "../services/store/adminStore";

const EditUserModal = ({ userToEdit, onClose }) => {
  const { users, setUsers, language } = useAdminStore();
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState(userToEdit?.username || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(userToEdit?.role || "admin");
  const [error, setError] = useState(null);

  const dict = {
    en: {
      title: "Edit User",
      editing: "Editing",
      newUsername: "New Username",
      newPassword: "New Password",
      passPlaceholder: "Leave blank to keep current",
      role: "Role",
      admin: "Admin",
      staff: "Staff",
      cancel: "Cancel",
      update: "Update User",
      emptyError: "Username cannot be empty",
      genError: "Update failed",
      successMsg: "Changes saved successfully.",
    },
    sq: {
      title: "Ndrysho Përdoruesin",
      editing: "Duke ndryshuar",
      newUsername: "Emri i ri i përdoruesit",
      newPassword: "Fjalëkalimi i ri",
      passPlaceholder: "Lini bosh për të mbajtur aktualin",
      role: "Roli",
      admin: "Admin",
      staff: "Staf",
      cancel: "Anulo",
      update: "Përditëso Përdoruesin",
      emptyError: "Përdoruesi nuk mund të jetë bosh",
      genError: "Përditësimi dështoi",
      successMsg: "Ndryshimet u ruajtën me sukses.",
    },
    mk: {
      title: "Уреди корисник",
      editing: "Уредување на",
      newUsername: "Ново корисничко име",
      newPassword: "Нова лозинка",
      passPlaceholder: "Оставете празно за да ја задржите тековната",
      role: "Улога",
      admin: "Админ",
      staff: "Персонал",
      cancel: "Откажи",
      update: "Ажурирај корисник",
      emptyError: "Корисничкото име не може да биде празно",
      genError: "Ажурирањето не успеа",
      successMsg: "Промените се успешно зачувани.",
    },
  };

  const lang = dict[language] || dict.en;

  const handleUpdate = async () => {
    if (!username) {
      setError(lang.emptyError);
      return;
    }

    const result = await editUser(username, password, role, userToEdit.username);

    if (!result.success) {
      setError(result.error || lang.genError);
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

  const roleOptions = [
    { value: "admin", label: lang.admin },
    { value: "staff", label: lang.staff },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-1 text-slate-800">{lang.title}</h2>
        <p className="text-xs text-gray-400 mb-6 font-medium italic">
          {lang.editing}: {userToEdit.username}
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.newUsername}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.newPassword}
            </label>
            <input
              type="password"
              placeholder={lang.passPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

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
            <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 text-sm font-bold text-center bg-green-50 py-2 rounded-lg">
              {lang.successMsg}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
            >
              {lang.cancel}
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {lang.update}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;