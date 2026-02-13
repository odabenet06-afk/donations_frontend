import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import fetchExpenses from "../services/functions/fetchExpenses";
import ExpenseFilter from "./expenseFilter";
import ExpenseRow from "./expenseRow";
import ConfirmVoidModal from "../modals/confirmVoidModal";
import CreateExpenseModal from "../modals/createExpenseModal";

const Expenses = ({ expenses }) => {
  const { setExpenses, language } = useAdminStore();
  const today = new Date();
  console.log(expenses);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [category, setCategory] = useState("");

  const [toggleYear, setToggleYear] = useState(false);
  const [toggleMonth, setToggleMonth] = useState(false);
  const [toggleCat, setToggleCat] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dict = {
    en: {
      title: "Expense Tracking",
      count: "Expenses",
      newBtn: "+ New Expense",
      totalSpent: "Total Spent",
      noData: "No expenses recorded.",
      prev: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
      cols: [
        "Project",
        "Amount",
        "Category",
        "Description",
        "Admin",
        "Date",
        "Action",
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    sq: {
      title: "Ndjekja e Shpenzimeve",
      count: "Shpenzime",
      newBtn: "+ Shpenzim i Ri",
      totalSpent: "Gjithsej Shpenzuar",
      noData: "Nuk u gjet asnjë shpenzim.",
      prev: "Paraprake",
      next: "Tjetra",
      page: "Faqja",
      of: "nga",
      cols: [
        "Projekti",
        "Shuma",
        "Kategoria",
        "Përshkrimi",
        "Admin",
        "Data",
        "Veprimi",
      ],
      months: [
        "Janar",
        "Shkurt",
        "Mars",
        "Prill",
        "Maj",
        "Qershor",
        "Korrik",
        "Gusht",
        "Shtator",
        "Tetor",
        "Nëntor",
        "Dhjetor",
      ],
    },
    mk: {
      title: "Следење на трошоци",
      count: "Трошоци",
      newBtn: "+ Нов трошок",
      totalSpent: "Вкупно потрошено",
      noData: "Нема евидентирано трошоци.",
      prev: "Претходна",
      next: "Следна",
      page: "Страница",
      of: "од",
      cols: [
        "Проект",
        "Износ",
        "Категорија",
        "Опис",
        "Админ",
        "Датум",
        "Акција",
      ],
      months: [
        "Јануари",
        "Февруари",
        "Март",
        "Април",
        "Мај",
        "Јуни",
        "Јули",
        "Август",
        "Септември",
        "Октомври",
        "Ноември",
        "Декември",
      ],
    },
  };

  const lang = dict[language] || dict.en;

  const handleVoidExpense = async (id) => {
    setDeleteModal(false);
  };

  const openDeleteModal = (id) => {
    setSelectedExpenseId(id);
    setDeleteModal(true);
  };

  const months = lang.months.map((m, i) => ({ label: m, value: i + 1 }));

  const handleSearch = async () => {
    const result = await fetchExpenses(year, month);
    setExpenses(result.data || []);
    setCurrentPage(1);
  };

  const filteredExpenses = (expenses || []).filter((exp) =>
    category ? exp.category === category : true,
  );

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const currentExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalAmount = filteredExpenses
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
    .toFixed(2);

  return (
    <div className="p-5 flex flex-col h-full max-w-full">
      {/* Header Summary */}
      <div className="bg-white shadow-lg mb-7 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-50">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-slate-800">{lang.title}</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {filteredExpenses.length} {lang.count}
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <button
            onClick={() => setCreateModal(true)}
            className="bg-white text-slate-600 font-semibold px-8 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition border border-gray-100 active:scale-95 whitespace-nowrap"
          >
            {lang.newBtn}
          </button>
        </div>

        <div className="text-center md:text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            {lang.totalSpent}
          </p>
          <p className="text-2xl font-black">
            {totalAmount} <span className="text-sm text-gray-400">MKD</span>
          </p>
        </div>
      </div>

      <ExpenseFilter
        year={year}
        setYear={setYear}
        month={month}
        setMonth={setMonth}
        category={category}
        setCategory={setCategory}
        months={months}
        toggleYear={toggleYear}
        setToggleYear={setToggleYear}
        toggleMonth={toggleMonth}
        setToggleMonth={setToggleMonth}
        toggleCat={toggleCat}
        setToggleCat={setToggleCat}
        handleSearch={handleSearch}
      />

      <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[1100px] flex flex-col gap-2">
            <div className="flex flex-row p-4 font-black text-gray-400 text-[11px] uppercase tracking-[0.15em] border-b border-gray-50 mb-2">
              <div className="w-40 shrink-0 px-2">{lang.cols[0]}</div>
              <div className="w-40 shrink-0 px-2">{lang.cols[1]}</div>
              <div className="w-44 shrink-0 px-2">{lang.cols[2]}</div>
              <div className="flex-1 px-4">{lang.cols[3]}</div>
              <div className="w-32 shrink-0 px-2">{lang.cols[4]}</div>
              <div className="w-40 shrink-0 text-right px-2">
                {lang.cols[5]}
              </div>
              <div className="w-20 shrink-0 text-center px-2">
                {lang.cols[6]}
              </div>
            </div>

            {!currentExpenses.length ? (
              <div className="h-32 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-2xl">
                {lang.noData}
              </div>
            ) : (
              currentExpenses.map((exp) => (
                <ExpenseRow
                  key={exp.id}
                  expense={exp}
                  onDelete={openDeleteModal}
                />
              ))
            )}
          </div>
        </div>

        {/* Pagination Logic */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 px-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-6 py-2 bg-gray-100 rounded-xl disabled:opacity-50 text-sm font-bold text-gray-600 transition-all hover:bg-gray-200"
            >
              {lang.prev}
            </button>
            <span className="text-sm text-gray-500 font-bold">
              {lang.page} <span className="text-blue-600">{currentPage}</span>{" "}
              {lang.of} {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-6 py-2 bg-gray-100 rounded-xl disabled:opacity-50 text-sm font-bold text-gray-600 transition-all hover:bg-gray-200"
            >
              {lang.next}
            </button>
          </div>
        )}
      </div>

      {deleteModal && (
        <ConfirmVoidModal
          type="expense"
          id={selectedExpenseId}
          onCancel={() => setDeleteModal(false)}
        />
      )}

      {createModal && (
        <CreateExpenseModal onClose={() => setCreateModal(false)} />
      )}
    </div>
  );
};

export default Expenses;
