import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import voidData from "../services/functions/voidData";

const ConfirmVoidModal = ({ onCancel, id, type }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { donations, setDonations, expenses, setExpenses, language } = useAdminStore();

  const dict = {
    en: {
      title: "Are you sure?",
      message: `Are you sure you want to void this ${type}? This action cannot be undone.`,
      cancel: "Cancel",
      delete: "Void Item",
      successMsg: "Changes saved successfully.",
      types: { donation: "donation", expense: "expense" }
    },
    sq: {
      title: "A jeni të sigurt?",
      message: `A jeni të sigurt që dëshironi të anuloni këtë ${type === 'donation' ? 'donacion' : 'shpenzim'}? Ky veprim nuk mund të kthehet.`,
      cancel: "Anulo",
      delete: "Shlyej",
      successMsg: "Ndryshimet u ruajtën me sukses.",
      types: { donation: "donacion", expense: "shpenzim" }
    },
    mk: {
      title: "Дали сте сигурни?",
      message: `Дали сте сигурни дека сакате да ја поништите оваа ${type === 'donation' ? 'донација' : 'трошок'}? Оваа акција е неповратна.`,
      cancel: "Откажи",
      delete: "Поништи",
      successMsg: "Промените се успешно зачувани.",
      types: { donation: "донација", expense: "трошок" }
    },
  };

  const lang = dict[language] || dict.en;

  const onConfirm = async () => {
    const result = await voidData(type, id);

    if (!result.success) {
      setError(result.error);
      return;
    }

    if (type === "donation") {
      setDonations(donations.filter((d) => d.id !== id));
    } else if (type === "expense") {
      setExpenses(expenses.filter((e) => e.id !== id));
    }

    setSuccess(true);
    setError(null);
    setTimeout(() => {
      setSuccess(false);
      onCancel();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-sm text-center border border-gray-100">
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold mb-2 text-slate-800">{lang.title}</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          {lang.message}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-100"
          >
            {lang.delete}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
          >
            {lang.cancel}
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

export default ConfirmVoidModal;