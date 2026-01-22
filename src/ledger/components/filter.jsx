import React from "react";
import search from "../../assets/icons/search.png";
import { useState } from "react";

const filter = ({ change }) => {
  const [year, setYear] = useState(2026);
  return (
    <div className="border border-slate-200  h-40 p-4 col-span-1 bg-white rounded-4xl">
      <div className="grid grid-cols-2">
        <div className="h-20 flex flex-col  bg-white px-2 col-span-1">
          <p className="text-xs ml-1 mb-1 font-bold text-gray-400 uppercase">
            Year
          </p>
          <button className="h-8 w-full bg-gray-50 border text-gray-400 border-slate-200 rounded-xl"></button>
        </div>
        <div className="h-20 flex flex-col  bg-white px-2 col-span-1">
          <p className="text-xs ml-1 mb-1 font-bold text-gray-400 uppercase">
            month
          </p>
          <div className="h-8 w-full bg-gray-50 border border-slate-200 rounded-xl"></div>
        </div>
        <div className="h-10 bg-white flex flex-row justify-between px-2 col-span-2">
          <input
            type="text"
            placeholder="Search"
            className="h-8 w-5/6 full bg-gray-50 border border-slate-200 rounded-xl  px-2 placeholder-gray-300"
          />
          <div className="h-10 w-10 flex justify-center items-center bg-white border border-slate-200 rounded-full">
            <img className="h-6 w-6 " src={search} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default filter;
