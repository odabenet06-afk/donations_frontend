import React from "react";
import useAdminStore from "../services/store/adminStore.js";
import arrowDown from "../../assets/icons/arrowDown.png";
import upward from "../../assets/icons/upward.png";
import wallet from "../../assets/icons/wallet.png";
import donations from "../../assets/icons/donationNoBg.png";

const Card = ({ data }) => {
  const { language } = useAdminStore();

  if (!data || data.amount === undefined) return null;

  const dict = {
    en: {
      total: "TOTAL",
      Donations: "Donations",
      Expenses: "Expenses",
      Donors: "Donors",
      Reserve: "Balance", // Maps "Reserve" data to "Balance" label
      currency: "MKD"
    },
    sq: {
      total: "GJITHSEJ",
      Donations: "Donacionet",
      Expenses: "Shpenzimet",
      Donors: "Donatorët",
      Reserve: "Bilanci", // Maps "Reserve" data to "Bilanci" label
      currency: "DEN"
    },
    mk: {
      total: "ВКУПНО",
      Donations: "Донации",
      Expenses: "Трошоци",
      Donors: "Донатори",
      Reserve: "Биланс", // Maps "Reserve" data to "Биланс" label
      currency: "ДЕН"
    }
  };

  const lang = dict[language] || dict.en;
  
  // This looks up the translation for "Reserve", "Donations", etc.
  const translatedProperty = lang[data.property] || data.property;

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
                    : wallet // Wallet icon remains for "Reserve"
            }
            alt={data.property}
          />
        </div>
        <p className="text-[10px] uppercase text-slate-500 font-black tracking-wider leading-tight">
          {lang.total} {translatedProperty}
        </p>
      </div>

      <div className="flex flex-row items-end gap-1">
        <p className="font-sans text-4xl font-bold">
          {data.amount.toLocaleString()}
        </p>
        {data.property !== "Donors" && (
          <p className="font-sans text-sm text-slate-500 mb-1 font-bold">
            {lang.currency}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;