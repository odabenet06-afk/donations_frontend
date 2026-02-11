<div className="shadow-xl h-104 p-4 bg-white rounded-4xl flex flex-col"> {/* Added flex and flex-col */}
  <div className="flex flex-col pt-2 w-full h-full">
    
    {/* Header - Fixed */}
    <div className="grid lg:mb-3 grid-cols-[1fr_1fr_auto] px-1 border-gray-100 w-full flex-shrink-0">
      <p className="text-xs lg:text-md col-span-1 font-bold text-gray-400">
        {type === "donations" ? currentLang.donor : currentLang.category}
      </p>
      <p className="text-xs lg:text-md col-span-1 ml-3 font-bold text-gray-400">
        {currentLang.date}
      </p>
      <p className="text-xs lg:text-md col-span-1 font-bold text-gray-400">
        {currentLang.amount}
      </p>
    </div>

    {/* Scrollable Row Area */}
    <div className="flex-grow overflow-y-auto flex flex-col gap-4 custom-scrollbar"> 
      {pageData.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_1fr_auto] border-t border-gray-100 pt-5 w-full gap-x-4 items-center"
        >
          {/* ... your existing row content (donor/category/date/amount) ... */}
          <p className="text-xs lg:text-md font-semibold">{item.donor || item.category}</p>
          <p className="text-xs lg:text-md font-bold text-gray-500">{formatEUDate(item?.date)}</p>
          <p className={`text-xs ${type === "donations" ? "text-green-400" : "text-red-400"} lg:text-md font-bold text-right`}>
            {item.amount.toLocaleString()} MKD
          </p>
        </div>
      ))}

      {pageData.length === 0 && (
        <div className="flex-grow flex justify-center items-center text-xl text-gray-300">
          <p>{currentLang.noData}</p>
        </div>
      )}
    </div>

    <div className="w-full flex flex-row justify-around border-t border-gray-50 ">
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
  </div>
</div>