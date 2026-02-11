import React, { useState } from "react";
import createExpense from "../services/functions/createExpense";
import useAdminStore from "../services/store/adminStore";

const CreateExpenseModal = ({ onClose }) => {
  const { expenses, setExpenses, projects, user, language } = useAdminStore();
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("MKD");
  const [category, setCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [error, setError] = useState(null);

  const [toggleProject, setToggleProject] = useState(false);
  const [toggleCategory, setToggleCategory] = useState(false);

  const dict = {
    en: {
      title: "Record Expense",
      project: "Project",
      selectProject: "Select Project",
      category: "Category",
      selectCategory: "Select Category",
      enterCategory: "Enter Category",
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
      categories: [
        "Salary",
        "Office materials",
        "Transportation",
        "Family support",
        "Project investment",
        "Other",
      ],
    },
    sq: {
      title: "Regjistro Shpenzimin",
      project: "Projekti",
      selectProject: "Zgjidh Projektin",
      category: "Kategoria",
      selectCategory: "Zgjidh Kategorinë",
      enterCategory: "Shkruaj Kategorinë",
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
      categories: [
        "Paga",
        "Materiale zyre",
        "Transporti",
        "Përkrahje familjare",
        "Investim në projekt",
        "Tjetër",
      ],
    },
    mk: {
      title: "Евидентирај трошок",
      project: "Проект",
      selectProject: "Избери проект",
      category: "Категорија",
      selectCategory: "Избери категорија",
      enterCategory: "Внеси категорија",
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
      categories: [
        "Плата",
        "Канцелариски материјали",
        "Транспорт",
        "Семејна поддршка",
        "Инвестиција во проект",
        "Друго",
      ],
    },
  };

  const lang = dict[language] || dict.en;

  const handleCreate = async () => {
    if (!amount || !category) {
      setError(lang.errorMsg);
      return;
    }
    const isOther = category === lang.categories[5];
    const selectedCategory = isOther ? otherCategory : category;

    const result = await createExpense(
      amount,
      currency.toUpperCase(),
      selectedCategory,
      description,
      projectName,
      attachmentUrl,
    );

    if (!result.success) {
      setError(result.error);
      return;
    }

    const newExpense = {
      id: result.id,
      amount,
      currency: currency.toUpperCase(),
      category: selectedCategory,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 border border-gray-100 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-5 text-slate-800 tracking-tight">
          {lang.title}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="relative">
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
                {category || lang.selectCategory}
              </span>
              <span className="text-gray-400 text-xs text-[10px]">▼</span>
            </button>
            {toggleCategory && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-40 overflow-y-auto">
                <div className="flex flex-col p-1">
                  {lang.categories.map((cat) => (
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

          {category === lang.categories[5] && (
            <div>
              <input
                className="w-full text-left border border-gray-200 rounded-xl p-3 bg-white font-medium flex justify-between items-center hover:border-gray-300 transition-colors"
                placeholder={lang.enterCategory}
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
              />
            </div>
          )}

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
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                className="border border-gray-200 rounded-xl p-3 w-full font-bold text-center"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-gray-500 block">
                {lang.attachment}
              </label>
              {attachmentUrl && (
                <a
                  href={attachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] font-bold text-blue-500 uppercase hover:underline"
                >
                  {lang.testLink}
                </a>
              )}
            </div>
            <input
              type="text"
              placeholder="https://..."
              value={attachmentUrl}
              onChange={(e) => setAttachmentUrl(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
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
  );
};

export default CreateExpenseModal;
