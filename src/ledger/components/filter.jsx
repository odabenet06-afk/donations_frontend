import React from "react";
import search from "../../assets/icons/search.png";
import { useState, useEffect, useRef } from "react";
import arrow from "../../assets/icons/arrow.png";
import fetchData from "../services/functions/fetchData";
import useDataStore from "../services/store/dataStore";

const filter = ({ onFilter, type, oldData, lang = "en" }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [searchText, setSearchText] = useState("");
  const [toggleYear, setToggleYear] = useState(false);
  const [toggleMonth, setToggleMonth] = useState(false);
  const { setDataStore } = useDataStore();
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setToggleYear(false);
        setToggleMonth(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dict = {
    en: {
      year: "Year",
      month: "Month",
      search: "Search",
      all: "All",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    sq: {
      year: "Viti",
      month: "Muaji",
      search: "Kërko",
      all: "Të gjithë",
      months: [
        "Janar",
        "Shkurt",
        "Mars",
        "Prill",
        "Maj",
        "Qershor",
        "Korrik",
        "Gusht",
        "Shtator",
        "Tetor",
        "Nëntor",
        "Dhjetor",
      ],
    },
    mk: {
      year: "Година",
      month: "Месец",
      search: "Пребарај",
      all: "Сите",
      months: [
        "Јануари",
        "Февруари",
        "Март",
        "Април",
        "Мај",
        "Јуни",
        "Јули",
        "Август",
        "Септември",
        "Октомври",
        "Ноември",
        "Декември",
      ],
    },
  };

  const currentLang = dict[lang] || dict.en;

  const handleSearch = async () => {
    const newData = await fetchData(year, month, searchText);
    setDataStore(newData.data);
  };

  const handleOtherSearch = async () => {
    const newData = await fetchData(year, month);
    onFilter(newData.data);
  };

  return (
    <div
      className={`shadow-lg ${
        type === "expenses" ? "h-26 " : "h-40"
      } p-4 col-span-1 lg:col-span-2 lg:h-32 bg-white rounded-4xl`}
    >
      <div
        className={`grid ${type === "expenses" ? "grid-cols-[1fr_auto_1fr] lg:grid-cols-[1fr_auto_1fr]" : "grid-cols-2"} lg:grid-cols-3`}
      >
        {/* Year Selector */}
        <div
          ref={filterRef}
          className="h-20 flex flex-col bg-white px-2 col-span-1 relative"
        >
          <p className="text-xs lg:text-md ml-1 mb-1 font-bold text-gray-400 uppercase">
            {currentLang.year}
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
              <img className="w-5 h-5 lg:h-7 lg:w-7" src={arrow} alt="" />
            </button>
            {toggleYear && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-sm z-50">
                <div className="flex flex-col">
                  {[2026, 2025, 2024, 2023].map((yr) => (
                    <button
                      key={yr}
                      className={`text-left px-3 py-2 text-sm ${yr === year ? "bg-gray-100 rounded-xl" : ""} hover:bg-gray-50 m-2 `}
                      onClick={() => {
                        setYear(yr);
                        setToggleYear(false);
                      }}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {type === "expenses" && (
          <button
            onClick={handleOtherSearch}
            className="h-10 lg:mx-5 w-10 lg:h-16 lg:w-16 flex justify-center items-center bg-white border border-slate-200 rounded-full self-center justify-self-center"
          >
            <img className="h-6 w-6 lg:h-11 lg:w-11" src={search} alt="" />
          </button>
        )}

        {/* Month Selector */}
        <div
          ref={filterRef}
          className="h-20 flex flex-col bg-white px-2 col-span-1 relative"
        >
          <p
            className={`text-xs lg:text-md ml-1 mb-1 font-bold text-gray-400 uppercase ${type === "expenses" ? "text-right" : ""}`}
          >
            {currentLang.month}
          </p>
          <div className="relative">
            <button
              onClick={() => {
                setToggleMonth(!toggleMonth);
                setToggleYear(false);
              }}
              className="h-9 lg:h-12 lg:font-semibold w-full text-start flex flex-row justify-between items-center px-2 text-gray-600 bg-gray-50 border border-slate-200 rounded-xl"
            >
              {month ? currentLang.months[month - 1] : currentLang.all}
              <img className="w-5 h-5 lg:h-7 lg:w-7" src={arrow} alt="" />
            </button>
            {toggleMonth && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md z-50 max-h-60 overflow-y-auto">
                <div className="flex flex-col">
                  <button
                    className={`text-left px-3 py-1 text-sm ${!month ? "bg-gray-100 rounded-xl" : ""} hover:bg-gray-50 m-1`}
                    onClick={() => {
                      setMonth(null);
                      setToggleMonth(false);
                    }}
                  >
                    {currentLang.all}
                  </button>
                  {currentLang.months.map((mName, index) => (
                    <button
                      key={index}
                      className={`text-left px-3 py-1 text-sm ${index + 1 === month ? "bg-gray-100 rounded-xl" : ""} hover:bg-gray-50 m-1`}
                      onClick={() => {
                        setMonth(index + 1);
                        setToggleMonth(false);
                      }}
                    >
                      {mName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Input (Donations Only) */}
        {type === "donations" && (
          <div className="lg:col-span-1 col-span-2 flex flex-col">
            <p className="hidden lg:block text-xs lg:text-md ml-1 mb-1 font-bold text-transparent uppercase">
              .
            </p>
            <div className="h-10 lg:h-14 bg-white flex flex-row justify-between px-2 ">
              <input
                type="text"
                placeholder={currentLang.search}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-9 w-5/6 lg:h-12 bg-gray-50 border border-slate-200 rounded-xl px-2 placeholder-gray-300 text-gray-600 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="h-10 w-10 lg:w-12 lg:h-11 lg:ml-4 flex justify-center items-center bg-white border border-slate-200 hover:bg-gray-100 rounded-full"
              >
                <img className="h-6 w-6 " src={search} alt="" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default filter;
