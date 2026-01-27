import React from "react";
import arrowDown from "../../assets/icons/arrowDown.png";
import upward from "../../assets/icons/upward.png";
import wallet from "../../assets/icons/wallet.png";
import donations from "../../assets/icons/donationNoBg.png";

const Card = ({ data }) => {
  if (!data || data.amount === undefined) return null;

  return (
    <div className="shadow-md h-50 p-8 col-span-12 md:col-span-6 xl:col-span-3 bg-white rounded-3xl flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <div className="bg-slate-100 rounded-xl p-2 w-10 h-10 flex items-center justify-center">
          <img
            className="w-6 h-6 object-contain"
            src={
              data.property === "Donations"
                ? upward
                : data.property === "Expenses"
                  ? arrowDown
                  : data.property === "Donors"
                    ? donations
                    : wallet
            }
            alt={data.property}
          />
        </div>
        <p className="text-xs uppercase text-slate-500 font-bold tracking-wider">
          TOTAL {data.property}
        </p>
      </div>

      <div className="flex flex-row items-end gap-1">
        <p className="font-sans text-4xl font-bold">
          {data.amount.toLocaleString()}
        </p>
        {data.property !== "Donors" && (
          <p className="font-sans text-lg text-slate-500 mb-1">MKD</p>
        )}
      </div>
    </div>
  );
};

export default Card;
