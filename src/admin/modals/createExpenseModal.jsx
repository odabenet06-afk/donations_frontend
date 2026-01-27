import React, { useState } from "react";
import createExpense from "../services/functions/createExpense";
import useAdminStore from "../services/store/adminStore";

const CreateExpenseModal = ({ onClose }) => {
  const { expenses, setExpenses, projects, user } = useAdminStore();

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("MKD");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState(""); // Attachment State
  const [error, setError] = useState(null);

  const [toggleProject, setToggleProject] = useState(false);
  const [toggleCategory, setToggleCategory] = useState(false);

  const categories = [
    "Salary",
    "Office materials",
    "Transportation",
    "Family support",
    "Project investment",
    "Other",
  ];

  const handleCreate = async () => {
    if (!amount || !category || !projectName) {
      setError("Please fill in the amount, category, and project.");
      return;
    }

    const result = await createExpense(
      amount,
      currency.toUpperCase(),
      category,
      description,
      projectName,
      attachmentUrl, // Passed to your function
    );

    if (!result.success) {
      setError(result.error);
      return;
    }

    const newExpense = {
      id: result.id,
      amount,
      currency: currency.toUpperCase(),
      category,
      description,
      project_name: projectName,
      attachment_url: attachmentUrl,
      created_by_username: user?.username || "Admin",
      created_at: new Date().toISOString(),
    };

    setExpenses([newExpense, ...(expenses || [])]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-5 text-slate-800 tracking-tight">
          Record Expense
        </h2>

        <div className="flex flex-col gap-4">
          {/* PROJECT & CATEGORY DROPDOWNS (Same as before) */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              Project
            </label>
            <button
              onClick={() => {
                setToggleProject(!toggleProject);
                setToggleCategory(false);
              }}
              className="w-full text-left border border-gray-200 rounded-xl p-3 bg-white font-medium flex justify-between items-center hover:border-gray-300 transition-colors"
            >
              <span
                className={projectName ? "text-slate-900" : "text-gray-400"}
              >
                {projectName || "Select Project"}
              </span>
              <span className="text-gray-400 text-xs text-[10px]">▼</span>
            </button>
            {toggleProject && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-40 overflow-y-auto">
                <div className="flex flex-col p-1">
                  {projects?.map((prj) => (
                    <button
                      key={prj.id}
                      className="text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg m-0.5"
                      onClick={() => {
                        setProjectName(prj.name);
                        setToggleProject(false);
                      }}
                    >
                      {prj.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              Category
            </label>
            <button
              onClick={() => {
                setToggleCategory(!toggleCategory);
                setToggleProject(false);
              }}
              className="w-full text-left border border-gray-200 rounded-xl p-3 bg-white font-medium flex justify-between items-center hover:border-gray-300 transition-colors"
            >
              <span className={category ? "text-slate-900" : "text-gray-400"}>
                {category || "Select Category"}
              </span>
              <span className="text-gray-400 text-xs text-[10px]">▼</span>
            </button>
            {toggleCategory && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-40 overflow-y-auto">
                <div className="flex flex-col p-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className="text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg m-0.5"
                      onClick={() => {
                        setCategory(cat);
                        setToggleCategory(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AMOUNT & CURRENCY */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-200 rounded-xl p-3 w-full font-medium"
              />
            </div>
            <div className="w-28">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                className="border border-gray-200 rounded-xl p-3 w-full font-bold text-center"
              />
            </div>
          </div>

          {/* ATTACHMENT URL */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-gray-500 block">
                Receipt / Attachment URL
              </label>
              {attachmentUrl && (
                <a
                  href={attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold text-blue-500 uppercase hover:underline"
                >
                  Test Link ↗
                </a>
              )}
            </div>
            <input
              type="text"
              placeholder="https://storage.com/receipt.pdf"
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium h-16 resize-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold shadow-lg"
            >
              Record Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseModal;
