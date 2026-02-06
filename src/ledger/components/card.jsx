import React from "react";
import arrowDown from "../../assets/icons/arrowDown.png";
import upward from "../../assets/icons/upward.png";
import wallet from "../../assets/icons/wallet.png";

const card = ({ data, date, lang = "en" }) => {
  // Dictionary to match the property names for styling/icons
  const dict = {
    en: { total: "TOTAL", donations: "Donations", expenses: "Expenses", reserve: "Reserve" },
    sq: { total: "TOTALI", donations: "Donacionet", expenses: "Shpenzimet", reserve: "Rezerva" },
    mk: { total: "ВКУПНО", donations: "Донации", expenses: "Трошоци", reserve: "Резерва" }
  };

  const currentLang = dict[lang] || dict.en;

  if (!data || data.amount === undefined) {
    return <div className="hidden lg:block lg:col-span-1"></div>;
  }

  // Determine type for styling and icons based on the translated property name
  const isDonation = data.property === currentLang.donations;
  const isExpense = data.property === currentLang.expenses;

  return (
    <div className={`shadow-lg h-60 p-8 col-span-1 lg:col-span-2 ${
      isDonation ? "bg-green-50" : isExpense ? "bg-red-50" : "bg-blue-50"
    } rounded-4xl`}>
      <div className="flex flex-col gap-5 w-full h-full">
        <div className={`${
          isDonation ? "bg-green-200" : isExpense ? "bg-red-200" : "bg-blue-200"
        } rounded-xl p-2 w-10 h-10`}>
          <img 
            src={
              isDonation ? upward : isExpense ? arrowDown : wallet
            }
            alt="icon"
          />
        </div>
        <p className="text-xs uppercase text-slate-500 font-bold">
          {currentLang.total} {data.property}
        </p>
        <div className="flex flex-row items-end">
          <p className="font-sans text-4xl">{data.amount.toLocaleString()}</p>
          <p className="font-sans text-xl ml-1">MKD</p>
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