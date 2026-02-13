import React from "react";
import formatEUDate from "../services/functions/formatDate";
import xIcon from "../../assets/icons/x.png";
import useAdminStore from "../services/store/adminStore";

const ExpenseRow = ({ expense, onDelete }) => {
  const { role, language } = useAdminStore();

  const dict = {
    en: {
      project: "Project",
      notPermitted: "Not permitted",
    },
    sq: {
      project: "Projekti",
      notPermitted: "Nuk lejohet",
    },
    mk: {
      project: "Проект",
      notPermitted: "Не е дозволено",
    },
  };

  const lang = dict[language] || dict.en;

  return (
    <div className="flex flex-row bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow items-center">
      <div className="w-40 shrink-0 px-2 font-bold text-slate-800">
        <span className="text-[10px] text-gray-400 block uppercase">
          {lang.project}
        </span>
        {expense.project_name}
      </div>
      <div className="w-40 shrink-0 px-2">
        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg font-black text-sm whitespace-nowrap">
          {expense.amount} {expense.currency}
        </span>
      </div>
      <div className="w-44 shrink-0 px-2">
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">
          {expense.category}
        </span>
      </div>
      <div className="flex-1 px-4 text-sm text-gray-500 italic truncate">
        {expense.description}
      </div>
      <div className="w-32 shrink-0 px-2 text-sm text-gray-400 font-medium">
        {expense.created_by_username}
      </div>
      <div className="w-40 shrink-0 px-2 text-sm text-gray-400 text-right font-bold">
        {formatEUDate(expense.created_at)}
      </div>

      {/* DELETE ACTION */}
      <div className="w-20 shrink-0 flex justify-center px-2">
        {role === "staff" ? (
          <></>
        ) : (
          <button
            onClick={() => onDelete(expense.id)}
            className="hover:scale-110 transition-transform active:scale-90 p-2 rounded-full"
          >
            <img className="w-5 h-5" src={xIcon} alt="delete" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ExpenseRow;
