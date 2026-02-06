import React from "react";
import ToggleDonation from "../../assets/icons/toggleDonation.png";
import UntoggleDonation from "../../assets/icons/untoggleDonation.png";
import toggleExpenses from "../../assets/icons/toggleExpense.png";
import untoggleExpenses from "../../assets/icons/untoggleExpense.png";
import filterImg from "../../assets/icons/filter.png";
import x from "../../assets/icons/x.png";

const Switch = ({ onClick, type, toggle, filter, lang = "en" }) => {
  const dict = {
    en: { donations: "Donations", expenses: "Expenses", filters: "Filters" },
    sq: { donations: "Donacionet", expenses: "Shpenzimet", filters: "Filtrat" },
    mk: { donations: "Донации", expenses: "Трошоци", filters: "Филтри" },
  };

  const currentLang = dict[lang] || dict.en;

  return (
    <div className="flex flex-row col-span-1 justify-between">
      <div
        style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}
        className="flex flex-row bg-gray-200 w-4/6 h-10 lg:h-13 rounded-xl p-1 items-center"
      >
        <button
          onClick={() => onClick("donations")}
          className={
            type === "donations"
              ? "bg-white text-xs shadow-md flex flex-row justify-center items-center gap-1 font-semibold h-full w-full rounded-lg transition-all"
              : "h-full w-full flex flex-row justify-center items-center gap-1 text-xs text-gray-600 font-semibold rounded-lg"
          }
        >
          <img
            className="w-5 h-5 lg:w-8 lg:h-8"
            src={type === "donations" ? ToggleDonation : UntoggleDonation}
            alt="donations"
          />
          <p className="lg:text-lg">{currentLang.donations}</p>
        </button>
        <button
          onClick={() => onClick("expenses")}
          className={
            type === "expenses"
              ? "bg-white text-xs shadow-md flex flex-row justify-center items-center gap-1 font-semibold h-full w-full rounded-lg transition-all"
              : "h-full flex flex-row justify-center items-center gap-1 text-xs text-gray-600 font-semibold w-full rounded-lg"
          }
        >
          <img
            className="w-5 h-5 lg:w-8 lg:h-8"
            src={type === "expenses" ? toggleExpenses : untoggleExpenses}
            alt="expenses"
          />
          <p className="lg:text-lg">{currentLang.expenses}</p>
        </button>
      </div>

      <button
        onClick={() => toggle(!filter)}
        className="w-2/8 px-4 flex items-center shadow-lg gap-2 justify-center bg-white lg:h-13 rounded-xl hover:bg-gray-50 transition-colors"
      >
        <img
          className="w-4 h-4 lg:w-6 lg:h-6"
          src={filter ? x : filterImg}
          alt="filter toggle"
        />
        <p className="text-xs font-semibold lg:text-lg">
          {currentLang.filters}
        </p>
      </button>
    </div>
  );
};

export default Switch;
