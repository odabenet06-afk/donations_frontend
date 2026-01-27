import React from "react";
import edit from "../../assets/icons/edit.png";
import x from "../../assets/icons/x.png";
import formatEUDate from "../services/functions/formatDate";
import useAdminStore from "../services/store/adminStore";

const DonorRow = ({ donor, onEdit, onDelete, getPrivacyLabel }) => {
  const { role } = useAdminStore();

  return (
    <div className="flex flex-row bg-white p-4 rounded-2xl border border-gray-100 items-center">
      <div className="w-36 shrink-0 font-mono text-xs font-bold text-slate-500">
        {donor.donor_public_id}
      </div>
      <div className="w-48 shrink-0 font-semibold">
        {donor.first_name} {donor.last_name}
      </div>
      <div className="w-56 shrink-0 text-blue-600 text-sm truncate pr-4">
        {donor.email}
      </div>
      <div className="w-36 shrink-0 text-gray-600 text-sm">
        {donor.phone || "-"}
      </div>
      <div className="w-48 shrink-0">
        <span
          className={`text-[10px] font-bold px-3 py-1 rounded-full border ${donor.privacy_preference === "SHOW_NAME_PUBLICLY" ? "bg-green-50 text-green-600 border-green-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}
        >
          {getPrivacyLabel(donor.privacy_preference)}
        </span>
      </div>
      <div className="flex-1 min-w-24 px-2 text-sm text-gray-400 italic break-all overflow-hidden">
        {donor.notes || "-"}
      </div>
      <div className="w-32 shrink-0 text-sm text-gray-400 text-right pr-4">
        {formatEUDate(donor.created_at)}
      </div>
      <div className="w-24 shrink-0 flex justify-center gap-3">
        {role === "staff" ? (
          <p className="text-[10px] font-bold text-gray-400 uppercase">
            Not permitted
          </p>
        ) : (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => onEdit(donor)}
              className="hover:scale-110 transition-transform active:scale-95"
            >
              <img className="w-6 h-6" src={edit} alt="edit" />
            </button>
            <button
              onClick={() => onDelete(donor.donor_public_id)}
              className="hover:scale-110 transition-transform active:scale-95"
            >
              <img className="w-6 h-6" src={x} alt="delete" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorRow;
