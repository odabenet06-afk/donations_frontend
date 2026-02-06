import React, { useState, useEffect, useMemo } from "react";
import useAdminStore from "../services/store/adminStore";
import LogFilter from "./logFilter";
import LogRow from "./logRow";

const Logs = () => {
  const { logs, language } = useAdminStore();
  
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const dict = {
    en: {
      action: "Action",
      details: "Entity Details",
      before: "Data Before",
      after: "Data After",
      user: "User",
      time: "Timestamp",
      loading: "Waiting for logs to load...",
      empty: "No logs match these dates.",
      prev: "Previous",
      next: "Next",
      page: "Page",
      of: "of"
    },
    sq: {
      action: "Veprimi",
      details: "Detajet e Entitetit",
      before: "Të dhënat Para",
      after: "Të dhënat Pas",
      user: "Përdoruesi",
      time: "Koha",
      loading: "Duke pritur për ngarkimin e regjistrave...",
      empty: "Nuk ka regjistra për këto data.",
      prev: "Para",
      next: "Pas",
      page: "Faqja",
      of: "nga"
    },
    mk: {
      action: "Акција",
      details: "Детали за ентитетот",
      before: "Пред податоци",
      after: "По податоци",
      user: "Корисник",
      time: "Време",
      loading: "Се чека вчитување на записите...",
      empty: "Нема податоци за избраните датуми.",
      prev: "Претходна",
      next: "Следна",
      page: "Страна",
      of: "од"
    }
  };

  const lang = dict[language] || dict.en;

  // Filtering & Sorting
  const filteredLogs = useMemo(() => {
    if (!logs || !Array.isArray(logs)) return [];
    
    let filtered = [...logs];

    if (from) {
      const start = new Date(from).setHours(0, 0, 0, 0);
      filtered = filtered.filter(log => new Date(log.changed_at).getTime() >= start);
    }

    if (to) {
      const end = new Date(to).setHours(23, 59, 59, 999);
      filtered = filtered.filter(log => new Date(log.changed_at).getTime() <= end);
    }

    return filtered.sort((a, b) => new Date(b.changed_at) - new Date(a.changed_at));
  }, [logs, from, to]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [from, to]);

  return (
    <div className="p-5 flex flex-col h-full max-w-full">
      <LogFilter
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
      />

      <div className="w-full bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[1100px] flex flex-col gap-2">
            {/* Header */}
            <div className="flex flex-row p-4 font-black text-slate-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50 mb-2">
              <div className="w-24 shrink-0">{lang.action}</div>
              <div className="w-56 shrink-0">{lang.details}</div>
              <div className="flex-1 px-2">{lang.before}</div>
              <div className="flex-1 px-2">{lang.after}</div>
              <div className="w-32 shrink-0 px-2">{lang.user}</div>
              <div className="w-40 shrink-0 text-right">{lang.time}</div>
            </div>

            {currentLogs.length === 0 ? (
              <div className="h-60 flex items-center justify-center text-gray-400 italic bg-slate-50/50 rounded-[24px] border border-dashed border-gray-200">
                {logs?.length === 0 ? lang.loading : lang.empty}
              </div>
            ) : (
              currentLogs.map((log) => <LogRow key={log.id || log.changed_at} log={log} />)
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 px-4 py-4 bg-slate-50 rounded-2xl">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl disabled:opacity-30 text-xs font-bold text-slate-700 transition-all hover:shadow-md active:scale-95"
            >
              {lang.prev}
            </button>
            <span className="text-[11px] text-slate-500 font-black uppercase tracking-widest">
              {lang.page} {currentPage} {lang.of} {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl disabled:opacity-30 text-xs font-bold text-slate-700 transition-all hover:shadow-md active:scale-95"
            >
              {lang.next}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;