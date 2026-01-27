import React from "react";

const LogFilter = ({ from, setFrom, to, setTo, handleSearch }) => {
  return (
    <div className="bg-white shadow-lg mb-7 rounded-3xl p-6 border border-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-end gap-6">
        <div className="flex flex-col flex-1 space-y-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider ml-1">From Date</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="bg-gray-50 border border-slate-200 rounded-2xl p-3 w-full text-sm font-semibold text-gray-600 outline-none focus:border-blue-400 transition-colors"
          />
        </div>

        <button
          onClick={handleSearch}
          className="h-12 rounded-full border-gray-200 border  font-black text-xs uppercase tracking-widest px-8 rounded-2xl  shadow-slate-200 hover:bg-gray-100  transition-all active:scale-95"
        >
          Search Logs
        </button>

        <div className="flex flex-col flex-1 space-y-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider ml-1">To Date</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-gray-50 border border-slate-200 rounded-2xl p-3 w-full text-sm font-semibold text-gray-600 outline-none focus:border-blue-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default LogFilter;