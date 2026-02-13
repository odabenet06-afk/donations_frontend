import React from "react";
import formatEUDate from "../services/functions/formatDate";
import xIcon from "../../assets/icons/x.png";
import editIcon from "../../assets/icons/edit.png"; 
import useAdminStore from "../services/store/adminStore";

const DonationRow = ({ donation, onDelete, onEdit }) => {
  const { role, language } = useAdminStore();

  const dict = {
    en: {
      locked: "Locked",
      editTitle: "Edit Donation",
      voidTitle: "Void Donation",
    },
    sq: {
      locked: "E mbyllur",
      editTitle: "Ndrysho Donacionin",
      voidTitle: "Anulo Donacionin",
    },
    mk: {
      locked: "Заклучено",
      editTitle: "Уреди донација",
      voidTitle: "Поништи донација",
    },
  };

  const lang = dict[language] || dict.en;

  return (
    <div className="flex flex-row bg-white p-4 rounded-2xl border border-gray-100 transition-shadow items-center hover:border-blue-100 group">
      <div className="w-32 shrink-0 font-mono text-xs font-bold text-slate-500 px-2">
        {donation.donor_id}
      </div>
      <div className="w-48 shrink-0 font-bold text-slate-800 px-2 truncate">
        {donation.donor_name}
      </div>
      <div className="w-40 shrink-0 px-2">
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-black text-sm whitespace-nowrap">
          {donation.amount} {donation.currency}
        </span>
      </div>
      <div className="w-44 shrink-0 font-semibold text-gray-600 italic px-2 truncate">
        {donation.donation_purpose}
      </div>
      <div className="w-32 shrink-0 text-gray-500 text-sm font-medium px-2">
        #{donation.receipt_number}
      </div>
      <div className="flex-1 px-4 text-sm text-gray-400 font-medium truncate">
        {donation.created_by_username}
      </div>
      <div className="w-40 shrink-0 text-sm text-gray-400 text-right font-bold px-2">
        {formatEUDate(donation.created_at)}
      </div>

      {/* ACTIONS */}
      <div className="w-24 shrink-0 flex justify-center gap-2 px-2">
        {role === "staff" ? (
          <></>
        ) : (
          <>
            <button
              onClick={() => onEdit(donation)}
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
              onClick={() => onDelete(donation.id)}
              className="hover:scale-110 transition-transform active:scale-90 p-2 rounded-full"
              title={lang.voidTitle}
            >
              <img
                className="w-5 h-5 opacity-70 group-hover:opacity-100"
                src={xIcon}
                alt="void"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DonationRow;