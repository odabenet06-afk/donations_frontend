import React from "react";
import useAdminStore from "../services/store/adminStore";

const LogFilter = ({ from, setFrom, to, setTo, handleSearch }) => {
  const { language } = useAdminStore();

  const dict = {
    en: {
      from: "From Date",
      to: "To Date",
      search: "Search Logs",
    },
    sq: {
      from: "Nga Data",
      to: "Deri më Datën",
      search: "Kërko Regjistrat",
    },
    mk: {
      from: "Од датум",
      to: "До датум",
      search: "Пребарај записи",
    },
  };

  const lang = dict[language] || dict.en;

  return (
    <div className="bg-white shadow-xl shadow-slate-200/50 mb-7 rounded-[32px] p-6 border border-slate-100">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {/* From Date */}
        <div className="flex flex-col flex-1 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-2">
            {lang.from}
          </label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-3 w-full text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-400 transition-all cursor-pointer"
          />
        </div>

        {/* Search Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto h-[46px] px-10 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-slate-200 hover:bg-black hover:-translate-y-0.5 transition-all active:scale-95"
          >
            {lang.search}
          </button>
        </div>

        {/* To Date */}
        <div className="flex flex-col flex-1 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-2">
            {lang.to}
          </label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-3 w-full text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-400 transition-all cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default LogFilter;