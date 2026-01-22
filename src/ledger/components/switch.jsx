import React from "react";
import ToggleDonation from "../../assets/icons/toggleDonation.png";
import UntoggleDonation from "../../assets/icons/untoggleDonation.png";
import toggleExpenses from "../../assets/icons/toggleExpense.png";
import untoggleExpenses from "../../assets/icons/untoggleExpense.png";
import filterImg from "../../assets/icons/filter.png";
import x from "../../assets/icons/x.png";

const Switch = ({ onClick, type, toggle, filter }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row bg-gray-200 w-4/6 h-10 rounded-xl p-1 items-center">
        <button
          onClick={() => onClick("donations")}
          className={
            type === "donations"
              ? "bg-white text-xs flex flex-row justify-center items-center gap-1 font-semibold h-full w-full rounded-lg"
              : "h-full w-full flex flex-row justify-center items-center gap-1 text-xs  text-gray-600 font-semibold rounded-lg"
          }
        >
          <img
            className="w-5 h-5"
            src={type === "donations" ? ToggleDonation : UntoggleDonation}
            alt=""
          />
          Donations
        </button>
        <button
          onClick={() => onClick("expenses")}
          className={
            type === "expenses"
              ? "bg-white text-xs flex flex-row justify-center items-center gap-1 font-semibold h-full w-full rounded-lg"
              : "h-full flex flex-row justify-center items-center gap-1 text-xs text-gray-600 font-semibold w-full rounded-lg"
          }
        >
          <img
            className="w-5 h-5"
            src={type === "expenses" ? toggleExpenses : untoggleExpenses}
            alt=""
          />
          Expenses
        </button>
      </div>
      <button
        onClick={() => toggle(!filter)}
        className="w-2/8 flex items-center gap-2 justify-center bg-white h-10 border border-slate-200 rounded-xl"
      >
        <img className="w-4 h-4" src={filter ? x : filterImg} alt="" />
        <p className="text-xs font-semibold">Filters</p>
      </button>
    </div>
  );
};

export default Switch;
