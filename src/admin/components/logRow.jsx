import React from "react";
import formatEUDate from "../services/functions/formatDate";
import useAdminStore from "../services/store/adminStore";

const LogValueBox = ({ data, emptyLabel }) => (
  <div className="text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100 max-h-40 overflow-y-auto w-full">
    {data && typeof data === "object" && Object.keys(data).length > 0 ? (
      Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-1 last:mb-0 break-words">
          <span className="font-bold text-slate-400">{key}:</span>{" "}
          <span className="text-slate-700 font-medium">{String(value)}</span>
        </div>
      ))
    ) : (
      <span className="text-gray-400 italic">{emptyLabel}</span>
    )}
  </div>
);

const LogRow = ({ log }) => {
  const { language } = useAdminStore();

  const dict = {
    en: {
      noData: "No data",
      system: "System",
      idPrefix: "ID"
    },
    sq: {
      noData: "Nuk ka të dhëna",
      system: "Sistemi",
      idPrefix: "ID"
    },
    mk: {
      noData: "Нема податоци",
      system: "Систем",
      idPrefix: "ID"
    }
  };

  const lang = dict[language] || dict.en;

  // Helper to color-code actions
  const getActionStyle = (action) => {
    const act = action?.toLowerCase();
    if (act?.includes("create") || act?.includes("add")) return "text-emerald-600";
    if (act?.includes("delete") || act?.includes("void") || act?.includes("remove")) return "text-rose-600";
    return "text-blue-600"; // for updates/edits
  };

  return (
    <div className="flex flex-row bg-white p-4 rounded-2xl border border-slate-100 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all items-start group">
      {/* Action Column */}
      <div className={`w-24 shrink-0 font-black uppercase text-[10px] tracking-widest pt-1 transition-colors ${getActionStyle(log.action)}`}>
        {log.action}
      </div>

      {/* Entity Details */}
      <div className="w-56 shrink-0 pt-1 flex flex-col pr-4">
        <span className="font-bold text-slate-800 text-sm break-all leading-tight group-hover:text-black">
          {log.entity_type}
        </span>
        <span className="text-slate-400 text-[10px] font-mono mt-1 break-all bg-slate-100 px-1.5 py-0.5 rounded w-fit">
          {lang.idPrefix}: {log.entity_id}
        </span>
      </div>

      {/* Data Before */}
      <div className="flex-1 px-2">
        <LogValueBox data={log.before_value} emptyLabel={lang.noData} />
      </div>

      {/* Data After */}
      <div className="flex-1 px-2">
        <LogValueBox data={log.after_value} emptyLabel={lang.noData} />
      </div>

      {/* User Column */}
      <div className="w-32 shrink-0 text-sm font-semibold text-slate-600 pt-1 px-2 break-all">
        {log.changed_by_username || lang.system}
      </div>

      {/* Timestamp Column */}
      <div className="w-40 shrink-0 text-xs font-bold text-slate-400 text-right pt-1">
        {formatEUDate(log.changed_at)}
      </div>
    </div>
  );
};

export default LogRow;