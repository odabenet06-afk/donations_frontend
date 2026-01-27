import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import fetchLogs from "../services/functions/fetchLogs";
import LogFilter from "./logFilter";
import LogRow from "./logRow";

const Logs = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { logs, setLogs } = useAdminStore();

  const handleSearch = async () => {
    const result = await fetchLogs(from, to);
    setLogs(result.data || []);
    setCurrentPage(1);
  };

  const sortedLogs = logs
    ? [...logs].sort((a, b) => new Date(b.changed_at) - new Date(a.changed_at))
    : [];

  const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);
  const currentLogs = sortedLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-5 flex flex-col h-full max-w-full">
      <LogFilter
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        handleSearch={handleSearch}
      />

      <div className="w-full bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[1100px] flex flex-col gap-2">
            {/* Header Labels */}
            <div className="flex flex-row p-3 font-black text-gray-400 text-[11px] uppercase tracking-[0.15em]">
              <div className="w-24 shrink-0">Action</div>
              <div className="w-56 shrink-0">Entity Details</div>
              <div className="flex-1 px-2">Data Before</div>
              <div className="flex-1 px-2">Data After</div>
              <div className="w-32 shrink-0 px-2">User</div>
              <div className="w-40 shrink-0 text-right">Timestamp</div>
            </div>

            {!currentLogs.length ? (
              <div className="h-40 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-[24px] border border-dashed border-gray-200">
                No logs found for selected dates.
              </div>
            ) : (
              currentLogs.map((log) => <LogRow key={log.id} log={log} />)
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 px-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-6 py-2 bg-gray-100 rounded-xl disabled:opacity-50 text-sm font-bold text-gray-600 transition-all hover:bg-gray-200"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500 font-bold">
              Page <span>{currentPage}</span> of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-6 py-2 bg-gray-100 rounded-xl disabled:opacity-50 text-sm font-bold text-gray-600 transition-all hover:bg-gray-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;
