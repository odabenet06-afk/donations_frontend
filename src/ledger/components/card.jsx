import React from "react";
import arrowDown from "../../assets/icons/arrowDown.png";
import upward from "../../assets/icons/upward.png";
import wallet from "../../assets/icons/wallet.png";

const card = ({ data, date }) => {
  if (!data || data.amount === undefined) {
    return <div className="hidden lg:block lg:col-span-1"></div>;
  }
  return (
    <div className="shadow-lg h-60 p-8 col-span-1 lg:col-span-2 bg-white rounded-4xl">
      <div className="flex flex-col gap-5 w-full h-full">
        <div className="bg-slate-100 rounded-xl p-2 w-10 h-10">
          <img
            src={
              data.property === "Donations"
                ? upward
                : data.property === "Expenses"
                  ? arrowDown
                  : wallet
            }
          />
        </div>
        <p className="text-xs uppercase text-slate-500 font-bold">
          TOTAL {data.property}
        </p>
        <div className="flex flex-row items-end">
          <p className="font-sans text-4xl">{data.amount.toLocaleString()}</p>
          <p className="font-sans text-xl">MKD</p>
        </div>
        <div className="flex w-full flex-row justify-between">
          <p className="font-sans">{date.year}</p>
          <p className="font-sans">{date.month}</p>
        </div>
      </div>
    </div>
  );
};

export default card;
