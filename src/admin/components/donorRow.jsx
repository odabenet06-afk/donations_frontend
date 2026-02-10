import React from "react";
import useAdminStore from "../services/store/adminStore";
import formatEUDate from "../services/functions/formatDate";
import xIcon from "../../assets/icons/x.png";
import editIcon from "../../assets/icons/edit.png";

const DonorRow = ({ donor, onEdit, onDelete }) => {
  const { language, role } = useAdminStore();

  const dict = {
    en: {
      public: "Public",
      anonymous: "Anonymous",
      partially_anonymous: "Partially Anonymous",
      editTitle: "Edit Donor",
      deleteTitle: "Delete Donor",
    },
    sq: {
      public: "Publik",
      anonymous: "Anonim",
      partially_anonymous: "Pjesërisht Anonim",
      editTitle: "Ndrysho Donatorin",
      deleteTitle: "Fshij Donatorin",
    },
    mk: {
      public: "Јавно",
      anonymous: "Анонимно",
      partially_anonymous: "Делумно анонимно",
      editTitle: "Уреди донатор",
      deleteTitle: "Избриши донатор",
    },
  };

  const lang = dict[language] || dict.en;
  const privacyKey = donor.privacy_preference?.toLowerCase();
  const translatedPrivacy = lang[privacyKey] || donor.privacy_preference;

  return (
    <div className="flex flex-row p-3 items-center bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all border border-transparent hover:border-gray-200 group">
      <div className="w-36 shrink-0 font-mono text-[10px] text-gray-400">
        #{donor.donor_public_id}
      </div>
      <div className="w-48 shrink-0 font-bold text-slate-700 text-sm truncate">
        {donor.full_name}
      </div>
      <div className="w-56 shrink-0 text-gray-500 text-sm truncate pr-4">
        {donor.email}
      </div>
      <div className="w-36 shrink-0 text-gray-500 text-sm">
        {donor.phone || "—"}
      </div>
      <div className="w-48 shrink-0">
        <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-[10px] font-black uppercase tracking-tight text-gray-600">
          {translatedPrivacy}
        </span>
      </div>
      <div className="flex-1 px-2 text-gray-400 text-xs italic truncate">
        {donor.notes || "..."}
      </div>
      <div className="w-32 shrink-0 text-right pr-4 text-gray-500 font-medium text-xs">
        {formatEUDate(donor.created_at)}
      </div>
      
      {/* ACTIONS */}
      <div className="w-24 shrink-0 flex justify-center gap-2 px-2">
        <button
          onClick={() => onEdit(donor)}
          className="hover:scale-110 transition-transform active:scale-90 p-2 rounded-full"
          title={lang.editTitle}
        >
          <img
            className="w-5 h-5 opacity-70 group-hover:opacity-100"
            src={editIcon}
            alt="edit"
          />
        </button>

        <button
          onClick={() => onDelete(donor.donor_public_id)}
          className="hover:scale-110 transition-transform active:scale-90 p-2 rounded-full"
          title={lang.deleteTitle}
        >
          <img
            className="w-5 h-5 opacity-70 group-hover:opacity-100"
            src={xIcon}
            alt="delete"
          />
        </button>
      </div>
    </div>
  );
};

export default DonorRow;