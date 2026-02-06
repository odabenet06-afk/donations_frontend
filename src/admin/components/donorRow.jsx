import React from "react";
import useAdminStore from "../services/store/adminStore";
import formatEUDate from "../services/functions/formatDate";

const DonorRow = ({ donor, onEdit, onDelete }) => {
  const { language } = useAdminStore();

  const dict = {
    en: {
      public: "Public",
      anonymous: "Anonymous",
      partially_anonymous: "Partially Anonymous",
    },
    sq: {
      public: "Publik",
      anonymous: "Anonim",
      partially_anonymous: "Pjesërisht Anonim",
    },
    mk: {
      public: "Јавно",
      anonymous: "Анонимно",
      partially_anonymous: "Делумно анонимно",
    },
  };

  const lang = dict[language] || dict.en;

  // We use the backend string (e.g., "public") to find the translation
  const privacyKey = donor.privacy_preference?.toLowerCase();
  const translatedPrivacy = lang[privacyKey] || donor.privacy_preference;

  return (
    <div className="flex flex-row p-3 items-center bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all border border-transparent hover:border-gray-200 group">
      <div className="w-36 shrink-0 font-mono text-[10px] text-gray-400">#{donor.donor_public_id}</div>
      <div className="w-48 shrink-0 font-bold text-slate-700 text-sm">{donor.full_name}</div>
      <div className="w-56 shrink-0 text-gray-500 text-sm truncate pr-4">{donor.email}</div>
      <div className="w-36 shrink-0 text-gray-500 text-sm">{donor.phone || "—"}</div>
      <div className="w-48 shrink-0">
        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-tight text-gray-600">
          {translatedPrivacy}
        </span>
      </div>
      <div className="flex-1 px-2 text-gray-400 text-xs italic truncate">{donor.notes || "..."}</div>
      <div className="w-32 shrink-0 text-right pr-4 text-gray-500 font-medium text-xs">
        {formatEUDate(donor.created_at)}
      </div>
      
      {/* Action Buttons */}
      <div className="w-24 shrink-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(donor)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
        </button>
        <button onClick={() => onDelete(donor.donor_public_id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );
};

export default DonorRow;