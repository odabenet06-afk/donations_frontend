import React from "react";
import arrow from "../../assets/icons/arrow.png";

const ExpenseFilter = ({
  year,
  setYear,
  month,
  setMonth,
  category,
  setCategory,
  toggleYear,
  setToggleYear,
  toggleMonth,
  setToggleMonth,
  toggleCat,
  setToggleCat,
  months,
  handleSearch,
}) => {
  const categories = [
    "Salary",
    "Office materials",
    "Transportation",
    "Family support",
    "Project investment",
    "Other",
  ];

  return (
    <div className="shadow-lg p-4 bg-white rounded-4xl mb-7 border border-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* YEAR */}
        <div className="flex flex-col relative">
          <p className="text-xs ml-1 mb-1 font-bold text-gray-400 uppercase">
            Year
          </p>
          <button
            onClick={() => {
              setToggleYear(!toggleYear);
              setToggleMonth(false);
              setToggleCat(false);
            }}
            className="h-12 text-start flex flex-row font-semibold justify-between items-center w-full bg-gray-50 border text-gray-600 px-3 border-slate-200 rounded-xl"
          >
            {year}
            <img
              className={`w-5 h-5 transition-transform ${toggleYear ? "rotate-180" : ""}`}
              src={arrow}
              alt="arrow"
            />
          </button>
          {toggleYear && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md z-50 p-1">
              {[2026, 2025, 2024, 2023].map((y) => (
                <button
                  key={y}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    setYear(y);
                    setToggleYear(false);
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MONTH */}
        <div className="flex flex-col relative">
          <p className="text-xs ml-1 mb-1 font-bold text-gray-400 uppercase">
            Month
          </p>
          <button
            onClick={() => {
              setToggleMonth(!toggleMonth);
              setToggleYear(false);
              setToggleCat(false);
            }}
            className="h-12 text-start flex flex-row font-semibold justify-between items-center w-full bg-gray-50 border text-gray-600 px-3 border-slate-200 rounded-xl"
          >
            {month ? months[month - 1].label : "All Months"}
            <img
              className={`w-5 h-5 transition-transform ${toggleMonth ? "rotate-180" : ""}`}
              src={arrow}
              alt="arrow"
            />
          </button>
          {toggleMonth && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md z-50 max-h-60 overflow-y-auto p-1">
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                onClick={() => {
                  setMonth(null);
                  setToggleMonth(false);
                }}
              >
                All Months
              </button>
              {months.map((m) => (
                <button
                  key={m.value}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    setMonth(m.value);
                    setToggleMonth(false);
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORY (Local Filter) */}
        <div className="flex flex-col relative">
          <p className="text-xs ml-1 mb-1 font-bold text-gray-400 uppercase">
            Category
          </p>
          <button
            onClick={() => {
              setToggleCat(!toggleCat);
              setToggleYear(false);
              setToggleMonth(false);
            }}
            className="h-12 text-start flex flex-row font-semibold justify-between items-center w-full bg-gray-50 border text-gray-600 px-3 border-slate-200 rounded-xl"
          >
            {category || "All Categories"}
            <img
              className={`w-5 h-5 transition-transform ${toggleCat ? "rotate-180" : ""}`}
              src={arrow}
              alt="arrow"
            />
          </button>
          {toggleCat && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md z-50 p-1">
              <button
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                onClick={() => {
                  setCategory("");
                  setToggleCat(false);
                }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    setCategory(cat);
                    setToggleCat(false);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SEARCH ACTION */}
        <div className="flex flex-col">
          <p className="text-xs text-transparent mb-1 font-bold uppercase">
            Action
          </p>
          <button
            onClick={handleSearch}
            className="h-12 border-gray-100 border shadow-sm font-bold rounded-full hover:bg-black transition-all active:scale-95"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilter;
