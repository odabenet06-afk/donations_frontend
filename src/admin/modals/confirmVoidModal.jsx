import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import voidData from "../services/functions/voidData";

const ConfirmVoidModal = ({ onCancel, id, type }) => {
  const [error, setError] = useState(null);

  const { donations, setDonations, expenses, setExpenses } = useAdminStore();

  const onConfirm = async () => {
    const result = await voidData(type, id);

    if (!result.success) {
      setError(result.error);
      return;
    }

    if (type === "donation") {
      setDonations(donations.filter((d) => d.id !== id));
    } else if (type === "expense") {
      setExpenses(expenses.filter((e) => e.id !== id));
    }

    onCancel();
    return;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-md text-center relative">
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to void this {type}? This action cannot be
          undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
        <p className="text-red-400 mt-4 text-sm font-medium">{error}</p>
      </div>
    </div>
  );
};

export default ConfirmVoidModal;
