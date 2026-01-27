import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import fetchExpenses from "../services/functions/fetchExpenses";
import ExpenseFilter from "./expenseFilter";
import ExpenseRow from "./expenseRow";
import ConfirmVoidModal from "../modals/confirmVoidModal";
import CreateExpenseModal from "../modals/createExpenseModal"; // Import the modal

const Expenses = ({ expenses }) => {
  const { setExpenses } = useAdminStore();
  const today = new Date();

  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false); // Create modal state
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [category, setCategory] = useState("");

  const [toggleYear, setToggleYear] = useState(false);
  const [toggleMonth, setToggleMonth] = useState(false);
  const [toggleCat, setToggleCat] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleVoidExpense = async (id) => {
    console.log("Voiding expense with ID:", id);
    setDeleteModal(false);
  };

  const openDeleteModal = (id) => {
    setSelectedExpenseId(id);
    setDeleteModal(true);
  };

  const months = [
    { label: "January", value: 1 }, { label: "February", value: 2 },
    { label: "March", value: 3 }, { label: "April", value: 4 },
    { label: "May", value: 5 }, { label: "June", value: 6 },
    { label: "July", value: 7 }, { label: "August", value: 8 },
    { label: "September", value: 9 }, { label: "October", value: 10 },
    { label: "November", value: 11 }, { label: "December", value: 12 },
  ];

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
      {/* Header Summary - Now with centered "New Expense" Button */}
      <div className="bg-white shadow-lg mb-7 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-50">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold text-slate-800">Expense Tracking</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {filteredExpenses.length} Expenses
          </p>
        </div>

        {/* Center Button */}
        <div className="flex-1 flex justify-center">
          <button
            onClick={() => setCreateModal(true)}
            className="bg-white text-slate-600 font-semibold px-8 py-2.5 rounded-full shadow-sm hover:bg-gray-50 transition border border-gray-100 active:scale-95 whitespace-nowrap"
          >
            + New Expense
          </button>
        </div>

        <div className="text-center md:text-right">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            total Spent
          </p>
          <p className="text-2xl font-black">
            {totalAmount} <span className="text-sm text-gray-400">MKD</span>
          </p>
        </div>
      </div>

      <ExpenseFilter
        year={year} setYear={setYear}
        month={month} setMonth={setMonth}
        category={category} setCategory={setCategory}
        months={months}
        toggleYear={toggleYear} setToggleYear={setToggleYear}
        toggleMonth={toggleMonth} setToggleMonth={setToggleMonth}
        toggleCat={toggleCat} setToggleCat={setToggleCat}
        handleSearch={handleSearch}
      />

      <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6">
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[1100px] flex flex-col gap-2">
            <div className="flex flex-row p-4 font-black text-gray-400 text-[11px] uppercase tracking-[0.15em] border-b border-gray-50 mb-2">
              <div className="w-40 shrink-0 px-2">Project</div>
              <div className="w-40 shrink-0 px-2">Amount</div>
              <div className="w-44 shrink-0 px-2">Category</div>
              <div className="flex-1 px-4">Description</div>
              <div className="w-32 shrink-0 px-2">Admin</div>
              <div className="w-40 shrink-0 text-right px-2">Date</div>
              <div className="w-20 shrink-0 text-center px-2">Action</div>
            </div>

            {!currentExpenses.length ? (
              <div className="h-32 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-2xl">
                No expenses recorded.
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
              Previous
            </button>
            <span className="text-sm text-gray-500 font-bold">
              Page <span className="text-blue-600">{currentPage}</span> of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-6 py-2 bg-gray-100 rounded-xl disabled:opacity-50 text-sm font-bold text-gray-600 transition-all hover:bg-gray-200"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <ConfirmVoidModal
          type="expense"
          id={selectedExpenseId}
          onCancel={() => setDeleteModal(false)}
          voidExpense={handleVoidExpense}
        />
      )}

      {/* Create Expense Modal */}
      {createModal && (
        <CreateExpenseModal onClose={() => setCreateModal(false)} />
      )}
    </div>
  );
};

export default Expenses;