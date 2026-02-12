import React from "react";
import { useState } from "react";
import Switch from "./switch.jsx";
import Filter from "./filter.jsx";

import formatEUDate from "../../admin/services/functions/formatDate.js";

const List = ({ data, onFilter, lang = "en" }) => {
  const [toggleFilter, setToggleFilter] = useState(true);
  const [type, setType] = useState("donations");
  const filteredData = data?.[type] || [];
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = filteredData.slice(start, end);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const dict = {
    en: {
      donor: "DONOR",
      category: "CATEGORY",
      date: "DATE",
      amount: "AMOUNT",
      noData: "No Data Available",
    },
    sq: {
      donor: "DONATORI",
      category: "KATEGORIA",
      date: "DATA",
      amount: "SHUMA",
      noData: "Nuk ka të dhëna",
    },
    mk: {
      donor: "ДОНАТОР",
      category: "КАТЕГОРИЈА",
      date: "ДАТУМ",
      amount: "ИЗНОС",
      noData: "Нема достапни податоци",
    },
  };

  const currentLang = dict[lang] || dict.en;

  return (
    <div className="flex flex-col gap-6 gap-y-10 col-span-1 lg:col-span-6 lg:col-start-2">
      <Switch
        type={type}
        onClick={setType}
        filter={toggleFilter}
        toggle={setToggleFilter}
        lang={lang}
      />
      {toggleFilter ? (
        <Filter type={type} onFilter={onFilter} oldData={data} lang={lang} />
      ) : null}

      <div className="shadow-xl min-h-[1000px] p-4 bg-white rounded-4xl">
        <div className="flex flex-col pt-2 w-full h-full">
          <div className="grid lg:mb-3 grid-cols-[1fr_1fr_auto] px-1 border-gray-100 w-full">
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
          <div className="h-3"></div>
          <div className="flex flex-col h-full gap-6">
            {pageData.map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_1fr_auto] border-t border-gray-100 pt-5 w-full gap-x-4 ${
                  i === pageData.length - 1 ? "border-b pb-5" : ""
                }`}
              >
                {item?.donor && (
                  <p className="text-xs lg:text-md font-semibold">
                    {item.donor}
                  </p>
                )}
                {item?.category && (
                  <p className="text-xs lg:text-md font-semibold">
                    {item.category}
                  </p>
                )}
                {item?.date && (
                  <p className="text-xs lg:text-md font-bold text-gray-500">
                    {formatEUDate(item?.date)}
                  </p>
                )}
                {item?.amount && (
                  <p
                    className={`text-xs ${type === "donations" ? "text-green-400" : "text-red-400"} lg:text-md font-bold text-right`}
                  >
                    {item.amount.toLocaleString()} MKD
                  </p>
                )}
              </div>
            ))}

            {pageData.length === 0 && (
              <div className="w-full h-full flex justify-center items-center text-xl text-gray-300">
                <p>{currentLang.noData}</p>
              </div>
            )}

            {/* Pagination */}
            <div className="w-full flex flex-row mt-auto justify-around py-4">
              <button
                className="text-lg font-semibold disabled:opacity-30"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
              >
                {"<"}
              </button>

              <p className="font-semibold">
                {page + 1} ... {totalPages || 1}
              </p>

              <button
                className="text-lg font-semibold disabled:opacity-30"
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
