import React from "react";
import formatEUDate from "../services/functions/formatDate";
import xIcon from "../../assets/icons/x.png";
import editIcon from "../../assets/icons/edit.png";

const UserRow = ({ user, onEdit, onDelete }) => (
  <div className="flex flex-row bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow items-center">
    <div className="w-16 shrink-0 font-mono text-xs font-bold text-slate-400 px-2">
      #{user.id}
    </div>

    <div className="flex-1 px-2 font-bold text-slate-800">{user.username}</div>

    <div className="w-40 shrink-0 px-2">
      <span
        className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider ${
          user.role === "admin"
            ? "bg-purple-50 text-purple-700"
            : "bg-blue-50 text-blue-700"
        }`}
      >
        {user.role}
      </span>
    </div>

    <div className="w-48 shrink-0 text-sm text-gray-400 text-right font-medium px-2">
      {formatEUDate(user.created_at)}
    </div>

    <div className="w-32 shrink-0 flex justify-center gap-2 px-2">
      <button
        onClick={() => onEdit(user)}
        className="hover:scale-110 transition-transform active:scale-90 p-2 rounded-full hover:bg-blue-50"
      >
        <img className="w-5 h-5 opacity-70" src={editIcon} alt="edit" />
      </button>
      <button
        onClick={() => onDelete(user.id)}
        className="hover:scale-110 transition-transform active:scale-90 p-2 rounded-full hover:bg-red-50"
      >
        <img className="w-5 h-5 opacity-70" src={xIcon} alt="delete" />
      </button>
    </div>
  </div>
);

export default UserRow;
