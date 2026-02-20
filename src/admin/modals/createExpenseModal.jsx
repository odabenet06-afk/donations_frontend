import React, { useState, useEffect, useRef } from "react";
import createExpense from "../services/functions/createExpense";
import useAdminStore from "../services/store/adminStore";
import CreateCategoryModal from "./createCategoryModal";
import x from "../../assets/icons/x.png";
import ConfirmDeleteModal from "./deleteModal";

const CreateExpenseModal = ({ onClose }) => {
  const {
    expenses,
    setExpenses,
    projects,
    user,
    language,
    categories: storeCategories,
  } = useAdminStore();

  const projectRef = useRef(null);
  const categoryRef = useRef(null);

  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("MKD");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [error, setError] = useState(null);

  const [toggleProject, setToggleProject] = useState(false);
  const [toggleCategory, setToggleCategory] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (projectRef.current && !projectRef.current.contains(event.target)) {
        setToggleProject(false);
      }

      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setToggleCategory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const handleDeleteCategory = (id) => {
    setDeleteCategoryId(id);
  };

  const dict = {
    en: {
      title: "Record Expense",
      project: "Project",
      selectProject: "Select Project",
      category: "Category",
      selectCategory: "Select Category",
      other: "Other +",
      amount: "Amount",
      currency: "Currency",
      attachment: "Receipt / Attachment URL",
      testLink: "Test Link ↗",
      description: "Description",
      cancel: "Cancel",
      record: "Record Expense",
      errorMsg: "Please fill in the amount, category",
      successMsg: "Changes saved successfully.",
      general: "General",
    },
    sq: {
      title: "Regjistro Shpenzimin",
      project: "Projekti",
      selectProject: "Zgjidh Projektin",
      category: "Kategoria",
      selectCategory: "Zgjidh Kategorinë",
      other: "Tjetër +",
      amount: "Shuma",
      currency: "Valuta",
      attachment: "Linku i dëshmisë / faturës",
      testLink: "Testo Linkun ↗",
      description: "Përshkrimi",
      cancel: "Anulo",
      record: "Regjistro",
      errorMsg: "Ju lutemi plotësoni shumën dhe kategorinë",
      successMsg: "Ndryshimet u ruajtën me sukses.",
      general: "Gjenerale",
    },
    mk: {
      title: "Евидентирај трошок",
      project: "Проект",
      selectProject: "Избери проект",
      category: "Категорија",
      selectCategory: "Избери категорија",
      other: "Друго +",
      amount: "Износ",
      currency: "Валута",
      attachment: "Линк до сметка / прилог",
      testLink: "Тестирај линк ↗",
      description: "Опис",
      cancel: "Откажи",
      record: "Зачувај трошок",
      errorMsg: "Ве молиме пополнете износ и категорија",
      successMsg: "Промените се успешно зачувани.",
      general: "Општо",
    },
  };

  const lang = dict[language] || dict.en;

  const getCategoryLabel = (catObj) => {
    if (typeof catObj === "string") return catObj;
    return catObj[language] || catObj.en;
  };

  const handleCreate = async () => {
    if (!amount || !category) {
      setError(lang.errorMsg);
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Amount must be a positive number");
      return;
    }

    const finalCurrency = (currency || "MKD").toUpperCase().trim();

    const finalCategory = typeof category === "object" ? category.en : category;

    const result = await createExpense(
      parsedAmount,
      finalCurrency,
      finalCategory,
      description?.trim() || "",
      projectName?.trim() || "General",
      attachmentUrl?.trim() || null,
    );

    if (!result.success) {
      setError(result.error);
      return;
    }

    const newExpense = {
      id: result.id,
      amount,
      currency: currency.toUpperCase(),
      category: finalCategory,
      description,
      project_name: projectName ? projectName : lang.general,
      attachment_url: attachmentUrl,
      created_by_username: user?.username || "Admin",
      created_at: new Date().toISOString(),
    };

    setExpenses([newExpense, ...(expenses || [])]);
    setSuccess(true);
    setError(null);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-5 text-slate-800 tracking-tight">
            {lang.title}
          </h2>

          <div className="flex flex-col gap-4">
            <div ref={projectRef} className="relative">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                {lang.project}
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
                  {projectName || lang.selectProject}
                </span>
                <span className="text-gray-400 text-[10px]">▼</span>
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

            <div ref={categoryRef} className="relative">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                {lang.category}
              </label>
              <button
                onClick={() => {
                  setToggleCategory(!toggleCategory);
                  setToggleProject(false);
                }}
                className="w-full text-left border border-gray-200 rounded-xl p-3 bg-white font-medium flex justify-between items-center hover:border-gray-300 transition-colors"
              >
                <span className={category ? "text-slate-900" : "text-gray-400"}>
                  {category ? getCategoryLabel(category) : lang.selectCategory}
                </span>
                <span className="text-gray-400 text-[10px]">▼</span>
              </button>
              {toggleCategory && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-40 overflow-y-auto">
                  <div className="flex flex-col p-1">
                    {storeCategories?.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex flex-row justify-between items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-lg m-0.5 cursor-pointer group"
                        onClick={() => {
                          setCategory(cat);
                          setToggleCategory(false);
                        }}
                      >
                        <p className="font-medium text-slate-700">
                          {getCategoryLabel(cat)}
                        </p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(cat.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded-md transition-all"
                        >
                          <img src={x} alt="delete" className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <button
                      className="text-left px-3 py-2 text-sm font-bold text-black rounded-lg m-0.5 border-t border-gray-100"
                      onClick={() => {
                        setToggleCategory(false);
                        setIsCategoryModalOpen(true);
                      }}
                    >
                      {lang.other}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-500 mb-1 block">
                  {lang.amount}
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
                  {lang.currency}
                </label>
                <div className="border border-gray-300 rounded-xl p-3 w-full font-medium">
                  {currency}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                {lang.description}
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
            {success && (
              <p className="text-green-400 mt-4 text-sm font-medium">
                {lang.successMsg}
              </p>
            )}

            <div className="flex justify-end gap-3 mt-2">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
              >
                {lang.cancel}
              </button>
              <button
                onClick={handleCreate}
                className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold shadow-lg active:scale-95 transition-all"
              >
                {lang.record}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isCategoryModalOpen && (
        <CreateCategoryModal onClose={() => setIsCategoryModalOpen(false)} />
      )}

      {deleteCategoryId && (
        <ConfirmDeleteModal
          type="category"
          id={deleteCategoryId}
          onCancel={() => setDeleteCategoryId(null)}
        />
      )}
    </>
  );
};

export default CreateExpenseModal;
