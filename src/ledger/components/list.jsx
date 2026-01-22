import React from "react";
import { useState } from "react";
import Switch from "./switch.jsx";
import Filter from "./filter.jsx";

const list = ({ data }) => {
  const [toggleFilter, setToggleFilter] = useState(true);
  const [type, setType] = useState("donations");
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-6">
      <Switch
        type={type}
        onClick={setType}
        filter={toggleFilter}
        toggle={setToggleFilter}
      />
      {toggleFilter ? <Filter /> : null}

      <div className="border border-slate-200 h-86 p-4 col-span-1 bg-white rounded-4xl">
        <div className="flex flex-col  pt-2 w-full h-full">
          <div className="grid grid-cols-[1fr_1fr_auto] px-1 border-gray-100 w-full">
            {type === "donations" ? (
              <>
                <p className="text-xs col-span-1 font-bold text-gray-400">
                  DONOR
                </p>
                <p className="text-xs col-span-1 ml-3 font-bold text-gray-400">
                  DATE
                </p>
                <p className="text-xs col-span-1 font-bold text-gray-400">
                  AMOUNT
                </p>
              </>
            ) : (
              <>
                <p className="text-xs col-span-1 font-bold text-gray-400">
                  CATEGORY
                </p>
                <p className="text-xs col-span-1 ml-3 font-bold text-gray-400">
                  DATE
                </p>
                <p className="text-xs col-span-1 font-bold text-gray-400">
                  AMOUNT
                </p>
              </>
            )}
          </div>
          <div className="h-3"></div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: (index + 1) * 5 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_1fr_auto] border-t border-gray-100 pt-4 w-full gap-x-4"
              >
                {data[i]?.donor && (
                  <p className="text-xs font-semibold">{data[i].donor}</p>
                )}
                {data[i]?.category && (
                  <p className="text-xs font-semibold">{data[i].category}</p>
                )}
                {/* {data[i]?.purpose && <p className="text-xs truncate">{data[i].purpose}</p>} */}
                {data[i]?.date && (
                  <p className="text-xs font-bold text-gray-500">
                    {data[i].date}
                  </p>
                )}
                {data[i]?.amount && (
                  <p className="text-xs font-bold text-right">
                    {data[i].amount.toLocaleString()} MKD
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default list;
