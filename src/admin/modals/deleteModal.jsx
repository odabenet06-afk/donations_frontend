import React, { useState } from "react";
import deleteData from "../services/functions/delete";
import useAdminStore from "../services/store/adminStore";

const ConfirmDeleteModal = ({ onCancel, id, username, type }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { donors, setDonors, users, setUsers, projects, setProjects, language } =
    useAdminStore();

  // Translation Dictionary
  const dict = {
    en: {
      title: "Are you sure?",
      message: "Are you sure you want to delete this item? This action cannot be undone.",
      cancel: "Cancel",
      delete: "Delete",
      successMsg: "Item deleted successfully.",
      errorMsg: "Something went wrong"
    },
    sq: {
      title: "A jeni i sigurt?",
      message: "A jeni i sigurt që dëshironi ta fshini këtë artikull? Ky veprim nuk mund të kthehet mbrapa.",
      cancel: "Anulo",
      delete: "Fshij",
      successMsg: "Artikulli u fshi me sukses.",
      errorMsg: "Diçka shkoi keq"
    },
    mk: {
      title: "Дали сте сигурни?",
      message: "Дали сте сигурни дека сакате да го избришете овој елемент? Оваа акција е неповратна.",
      cancel: "Откажи",
      delete: "Избриши",
      successMsg: "Елементот е успешно избришан.",
      errorMsg: "Нешто тргна наопаку"
    }
  };

  const lang = dict[language] || dict.en;

  const onConfirm = async () => {
    const result = await deleteData(type, id, username);
    if (!result.success) {
      setError(result.error || lang.errorMsg);
      return;
    }

    // Logic remains in English/Original format for state management
    if (type === "donor") {
      setDonors(donors.filter((d) => d.donor_public_id !== id));
    } else if (type === "user") {
      setUsers(users.filter((u) => u.username !== username));
    } else if (type === "project") {
      setProjects(projects?.filter((p) => p.id !== id) || []);
    }

    setSuccess(true);
    setError(null);
    
    setTimeout(() => {
      setSuccess(false);
      onCancel(); // Fixed: using onCancel to close the modal
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm text-center border border-gray-100">
        <h2 className="text-2xl font-black mb-3 text-gray-800">{lang.title}</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {lang.message}
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-500 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            {lang.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-500 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-100 transition-all active:scale-95"
          >
            {lang.delete}
          </button>
        </div>

        {error && (
          <p className="text-red-500 mt-4 text-[11px] font-bold uppercase tracking-tight">
            {error}
          </p>
        )}
        
        {success && (
          <div className="mt-4 bg-green-50 p-2 rounded-xl border border-green-100">
            <p className="text-green-600 text-[11px] font-black uppercase">
              {lang.successMsg}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;