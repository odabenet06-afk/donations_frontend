<div className="shadow-xl h-110 p-4 bg-white rounded-4xl flex flex-col overflow-hidden">
  <div className="grid lg:mb-3 grid-cols-[1fr_1fr_auto] px-1 border-gray-100 w-full flex-shrink-0">
    <p className="text-xs lg:text-md col-span-1 font-bold text-gray-400">
      {type === "donations" ? currentLang.donor : currentLang.category}
    </p>
    <p className="text-xs lg:text-md col-span-1 ml-3 font-bold text-gray-400">
      {currentLang.date}
    </p>
    <p className="text-xs lg:text-md col-span-1 font-bold text-gray-400 text-right">
      {currentLang.amount}
    </p>
  </div>

  <div className="flex-1 overflow-y-auto min-h-0">
    {pageData.map((item, i) => (
      <div
        key={i}
        className="grid grid-cols-[1fr_1fr_auto] border-t border-gray-100 py-4 w-full gap-x-4 items-center"
      >
        <p className="text-xs lg:text-md font-semibold truncate">
          {item.donor || item.category}
        </p>
        <p className="text-xs lg:text-md font-bold text-gray-500 ml-3">
          {formatEUDate(item?.date)}
        </p>
        <p
          className={`text-xs ${
            type === "donations" ? "text-green-400" : "text-red-400"
          } lg:text-md font-bold text-right`}
        >
          {item.amount.toLocaleString()} MKD
        </p>
      </div>
    ))}

    {pageData.length === 0 && (
      <div className="h-full flex justify-center items-center text-xl text-gray-300">
        <p>{currentLang.noData}</p>
      </div>
    )}
  </div>

  <div className="w-full h-full flex flex-row justify-around mb-10 items-center border-t border-gray-50 py-2 flex-shrink-0 bg-white">
    <button
      className="text-lg font-semibold disabled:opacity-30 p-2"
      disabled={page === 0}
      onClick={() => setPage((p) => Math.max(p - 1, 0))}
    >
      {"<"}
    </button>

    <p className="font-semibold flex items-center">
      {page + 1} / {totalPages || 1}
    </p>

    <button
      className="text-lg font-semibold disabled:opacity-30 p-2"
      disabled={page + 1 >= totalPages}
      onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
    >
      {">"}
    </button>
  </div>
</div>;
