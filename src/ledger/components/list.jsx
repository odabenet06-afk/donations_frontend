import React from "react";
import { useState } from "react";
import Switch from "./switch.jsx";
import Filter from "./filter.jsx";

import formatEUDate from "../../admin/services/functions/formatDate.js";

const list = ({ data, onFilter }) => {
  const [toggleFilter, setToggleFilter] = useState(true);
  const [type, setType] = useState("donations");
  const [index, setIndex] = useState(0);
  const filteredData = data?.[type] || [];
  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = filteredData.slice(start, end);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="flex flex-col gap-6 gap-y-10 col-span-1 lg:col-span-6 lg:col-start-2">
      <Switch
        type={type}
        onClick={setType}
        filter={toggleFilter}
        toggle={setToggleFilter}
      />
      {toggleFilter ? (
        <Filter type={type} onFilter={onFilter} oldData={data} />
      ) : null}

      <div className="shadow-xl h-104 p-4  bg-white rounded-4xl">
        <div className="flex flex-col  pt-2 w-full h-full">
          <div className="grid lg:mb-3 grid-cols-[1fr_1fr_auto] px-1  border-gray-100 w-full">
            {type === "donations" ? (
              <>
                <p className="text-xs lg:text-md col-span-1 font-bold text-gray-400">
                  DONOR
                </p>
                <p className="text-xs lg:text-md col-span-1 ml-3 font-bold text-gray-400">
                  DATE
                </p>
                <p className="text-xs lg:text-md col-span-1 font-bold text-gray-400">
                  AMOUNT
                </p>
              </>
            ) : (
              <>
                <p className="text-xs lg:text-md col-span-1 font-bold text-gray-400">
                  CATEGORY
                </p>
                <p className="text-xs lg:text-md col-span-1 ml-3 font-bold text-gray-400">
                  DATE
                </p>
                <p className="text-xs lg:text-md col-span-1 font-bold text-gray-400">
                  AMOUNT
                </p>
              </>
            )}
          </div>
          <div className="h-3"></div>
          <div className="flex flex-col h-full gap-6">
            {pageData.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className={`grid grid-cols-[1fr_1fr_auto] border-t border-gray-100 pt-5 w-full gap-x-4 ${
                  i === pageData.slice(0, 5).length - 1 ? "border-b pb-5" : ""
                }`}
              >
                {pageData[i]?.donor && (
                  <p className="text-xs lg:text-md font-semibold">
                    {pageData[i].donor}
                  </p>
                )}
                {pageData[i]?.category && (
                  <p className="text-xs lg:text-md font-semibold">
                    {pageData[i].category}
                  </p>
                )}
                {pageData[i]?.date && (
                  <p className="text-xs lg:text-md font-bold text-gray-500">
                    {formatEUDate(pageData[i]?.date)}
                  </p>
                )}
                {pageData[i]?.amount && (
                  <p
                    className={`text-xs ${type === "donations" ? "text-green-400" : "text-red-400"} lg:text-md font-bold text-right`}
                  >
                    {pageData[i].amount.toLocaleString()} MKD
                  </p>
                )}
              </div>
            ))}
            {pageData.length == 0 && (
              <div className="w-full h-full flex justify-center items-center text-xl text-gray-300">
                <p> No Data Available</p>
              </div>
            )}
            <div className="w-full  flex flex-row mt-auto justify-around ">
              <button
                className="text-lg font-semibold"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
              >
                {"<"}
              </button>

              <p className="font-semibold">
                {page + 1}...{totalPages}
              </p>

              <button
                className=" text-lg font-semibold"
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

export default list;
