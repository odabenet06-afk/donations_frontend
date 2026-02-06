import React, { useState } from "react";
import deleteUser from "../services/functions/deleteUser";
import useAdminStore from "../services/store/adminStore";

const DeleteUserModal = ({ userToDelete, onCancel }) => {
  const [error, setError] = useState(null);
  const { users, setUsers, language } = useAdminStore();
  const [success, setSuccess] = useState(false);

  const dict = {
    en: {
      title: "Are you sure?",
      description: "Are you sure you want to delete user",
      warning: "This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      successMsg: "User deleted successfully.",
      errorDefault: "Failed to delete user",
    },
    sq: {
      title: "A jeni i sigurt?",
      description: "A jeni i sigurt që dëshironi të fshini përdoruesin",
      warning: "Ky veprim nuk mund të kthehet mbrapa.",
      cancel: "Anulo",
      delete: "Fshije",
      successMsg: "Përdoruesi u fshi me sukses.",
      errorDefault: "Dështoi fshirja e përdoruesit",
    },
    mk: {
      title: "Дали сте сигурни?",
      description: "Дали сте сигурни дека сакате да го избришете корисникот",
      warning: "Ова дејство не може да се врати.",
      cancel: "Откажи",
      delete: "Избриши",
      successMsg: "Корисникот е успешно избришан.",
      errorDefault: "Неуспешно бришење на корисникот",
    },
  };

  const lang = dict[language] || dict.en;

  const onConfirm = async () => {
    const result = await deleteUser(userToDelete.username);

    if (!result.success) {
      setError(result.error || lang.errorDefault);
      return;
    }

    setUsers(users.filter((u) => u.username !== userToDelete.username));
    setSuccess(true);
    setError(null);
    setTimeout(() => {
      setSuccess(false);
      onCancel(); // Fixed: changed from onClose to onCancel
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center border border-gray-100">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 14c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-xl font-bold mb-2 text-slate-800">{lang.title}</h2>
        <p className="text-gray-500 text-sm mb-6">
          {lang.description}{" "}
          <span className="font-bold text-slate-800">
            {userToDelete?.username}
          </span>
          ? {lang.warning}
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-colors"
          >
            {lang.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition-all active:scale-95"
          >
            {lang.delete}
          </button>
        </div>

        {error && (
          <p className="text-red-500 mt-4 text-xs font-bold bg-red-50 py-2 rounded-lg">
            {error}
          </p>
        )}
        
        {success && (
          <p className="text-green-500 mt-4 text-sm font-bold bg-green-50 py-2 rounded-lg">
            {lang.successMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeleteUserModal;