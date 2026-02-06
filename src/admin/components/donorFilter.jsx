import React from "react";
import arrow from "../../assets/icons/arrow.png";
import searchIcon from "../../assets/icons/search.png";
import useAdminStore from "../services/store/adminStore";

const DonorFilter = ({
  year,
  setYear,
  month,
  setMonth,
  search,
  setSearch,
  handleSearch,
  toggleYear,
  setToggleYear,
  toggleMonth,
  setToggleMonth,
  months,
}) => {
  const { language } = useAdminStore();

  const dict = {
    en: {
      year: "Year",
      month: "Month",
      allMonths: "All Months",
      searchPlaceholder: "Search by name...",
    },
    sq: {
      year: "Viti",
      month: "Muaji",
      allMonths: "Të gjithë muajt",
      searchPlaceholder: "Kërko me emër...",
    },
    mk: {
      year: "Година",
      month: "Месец",
      allMonths: "Сите месеци",
      searchPlaceholder: "Пребарај по име...",
    },
  };

  const lang = dict[language] || dict.en;

  return (
    <div className="shadow-lg h-40 p-4 col-span-1 lg:col-span-2 lg:h-32 bg-white rounded-4xl mb-7 border border-gray-50">
      <div className="grid grid-cols-2 lg:grid-cols-3">
        {/* YEAR */}
        <div className="h-20 flex flex-col bg-white px-2 col-span-1 relative">
          <p className="text-xs lg:text-md ml-1 mb-1 font-bold text-gray-400 uppercase">
            {lang.year}
          </p>
          <div className="relative">
            <button
              onClick={() => {
                setToggleMonth(false);
                setToggleYear(!toggleYear);
              }}
              className="h-9 lg:h-12 text-start flex flex-row lg:font-semibold justify-between items-center w-full bg-gray-50 border text-gray-600 px-3 border-slate-200 rounded-xl"
            >
              <p>{year}</p>
              <img
                className={`w-5 h-5 lg:h-7 lg:w-7 transition-transform ${toggleYear ? "rotate-180" : ""}`}
                src={arrow}
                alt="arrow"
              />
            </button>
            {toggleYear && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md z-50">
                <div className="flex flex-col p-1">
                  {[2026, 2025, 2024, 2023].map((y) => (
                    <button
                      key={y}
                      className={`text-left px-3 py-2 text-sm transition-colors ${y === year ? "bg-gray-100 rounded-xl text-slate-900 font-bold" : "text-gray-600"} hover:bg-gray-50 m-1`}
                      onClick={() => {
                        setYear(y);
                        setToggleYear(false);
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MONTH */}
        <div className="h-20 flex flex-col bg-white px-2 col-span-1 relative">
          <p className="text-xs lg:text-md ml-1 mb-1 font-bold text-gray-400 uppercase">
            {lang.month}
          </p>
          <div className="relative">
            <button
              onClick={() => {
                setToggleMonth(!toggleMonth);
                setToggleYear(false);
              }}
              className="h-9 lg:h-12 lg:font-semibold w-full text-start flex flex-row justify-between items-center px-3 text-gray-600 bg-gray-50 border border-slate-200 rounded-xl"
            >
              <p>{month ? months[month - 1].label : lang.allMonths}</p>
              <img
                className={`w-5 h-5 lg:h-7 lg:w-7 transition-transform ${toggleMonth ? "rotate-180" : ""}`}
                src={arrow}
                alt="arrow"
              />
            </button>
            {toggleMonth && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md z-50 max-h-60 overflow-y-auto">
                <div className="flex flex-col p-1">
                  <button
                    className={`text-left px-3 py-2 text-sm ${!month ? "bg-gray-100 rounded-xl" : ""} hover:bg-gray-50 m-1`}
                    onClick={() => {
                      setMonth(null);
                      setToggleMonth(false);
                    }}
                  >
                    {lang.allMonths}
                  </button>
                  {months.map((m) => (
                    <button
                      key={m.value}
                      className={`text-left px-3 py-2 text-sm transition-colors ${m.value === month ? "bg-gray-100 rounded-xl text-slate-900 font-bold" : "text-gray-600"} hover:bg-gray-50 m-1`}
                      onClick={() => {
                        setMonth(m.value);
                        setToggleMonth(false);
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SEARCH */}
        <div className="lg:col-span-1 col-span-2 flex flex-col px-2">
          <p className="hidden lg:block text-xs lg:text-md ml-1 mb-1 font-bold text-transparent uppercase">
            Search
          </p>
          <div className="h-10 lg:h-12 flex flex-row justify-between gap-3">
            <input
              type="text"
              placeholder={lang.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full w-full bg-gray-50 border border-slate-200 rounded-xl px-4 placeholder-gray-300 text-gray-600 focus:outline-none transition-colors"
            />
            <button
              onClick={handleSearch}
              className="h-full aspect-square flex justify-center items-center bg-white border border-slate-200 rounded-full hover:bg-gray-100 transition-colors shadow-sm active:scale-95"
            >
              <img
                className="h-5 w-5 lg:h-6 lg:w-6"
                src={searchIcon}
                alt="search"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorFilter;