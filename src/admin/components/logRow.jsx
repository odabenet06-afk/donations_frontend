import React from "react";
import formatEUDate from "../services/functions/formatDate";

const LogValueBox = ({ data }) => (
  <div className="text-[11px] bg-gray-50 p-3 rounded-xl border border-gray-100 max-h-40 overflow-y-auto w-full">
    {data && typeof data === "object" ? (
      Object.entries(data).map(([key, value]) => (
        <div key={key} className="mb-1 last:mb-0 break-words">
          <span className="font-bold text-gray-500">{key}:</span>{" "}
          <span className="text-gray-700">{String(value)}</span>
        </div>
      ))
    ) : (
      <span className="text-gray-400 italic">No data</span>
    )}
  </div>
);

const LogRow = ({ log }) => (
  <div className="flex flex-row bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow items-start">
    <div className="w-24 shrink-0 font-black text-blue-600 uppercase text-[10px] tracking-widest pt-1">
      {log.action}
    </div>
    <div className="w-56 shrink-0 pt-1 flex flex-col pr-4">
      <span className="font-bold text-slate-700 text-sm break-all leading-tight">
        {log.entity_type}
      </span>
      <span className="text-gray-400 text-[10px] font-mono mt-1 break-all">
        ID: {log.entity_id}
      </span>
    </div>
    <div className="flex-1 px-2">
      <LogValueBox data={log.before_value} />
    </div>
    <div className="flex-1 px-2">
      <LogValueBox data={log.after_value} />
    </div>
    <div className="w-32 shrink-0 text-sm font-semibold text-gray-600 pt-1 px-2 break-all">
      {log.changed_by_username || "System"}
    </div>
    <div className="w-40 shrink-0 text-xs font-bold text-gray-400 text-right pt-1">
      {formatEUDate(log.changed_at)}
    </div>
  </div>
);

export default LogRow;