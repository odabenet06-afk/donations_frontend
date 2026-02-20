import React, { useState } from "react";
import createCategory from "../services/functions/createCategory";
import useAdminStore from "../services/store/adminStore";

const CreateCategoryModal = ({ onClose }) => {
  const { categories, setCategories, language } = useAdminStore();

  const [en, setEn] = useState("");
  const [sq, setSq] = useState("");
  const [mk, setMk] = useState("");
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const dict = {
    en: {
      title: "Add New Category",
      enLabel: "English",
      sqLabel: "Shqip",
      mkLabel: "Македонски",
      cancel: "Cancel",
      create: "Create",
      successMsg: "Category added successfully!",
      genError: "Something went wrong",
    },
    sq: {
      title: "Shto Kategori të Re",
      enLabel: "Emri në Anglisht",
      sqLabel: "Emri në Shqip",
      mkLabel: "Emri në Maqedonisht",
      cancel: "Anulo",
      create: "Krijo",
      successMsg: "Kategoria u shtua me sukses!",
      genError: "Diçka shkoi keq",
    },
    mk: {
      title: "Додади нова категорија",
      enLabel: "Англиско име",
      sqLabel: "Албанско име",
      mkLabel: "Македонско име",
      cancel: "Откажи",
      create: "Креирај",
      successMsg: "Категоријата е успешно додадена!",
      genError: "Нешто тргна наопаку",
    },
  };

  const lang = dict[language] || dict.en;

  const handleCreate = async () => {
    // Validation
    if (!en || !sq || !mk) {
      setError("Please fill all fields");
      return;
    }

    const categoryData = { en, sq, mk };

    const result = await createCategory(categoryData);

    if (!result.success) {
      setError(result.error || lang.genError);
      return;
    }

    // Update global store
    const newCategory = {
      id: result.id,
      en,
      sq,
      mk,
    };

    setCategories([...(categories || []), newCategory]);
    setSuccess(true);
    setError(null);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-slate-800">{lang.title}</h2>

        <div className="flex flex-col gap-5">
          {/* English Input */}
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.enLabel}
            </label>
            <input
              type="text"
              placeholder="e.g. Electricity"
              value={en}
              onChange={(e) => setEn(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          {/* Albanian Input */}
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.sqLabel}
            </label>
            <input
              type="text"
              placeholder="p.sh. Rryma"
              value={sq}
              onChange={(e) => setSq(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          {/* Macedonian Input */}
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.mkLabel}
            </label>
            <input
              type="text"
              placeholder="пр. Струја"
              value={mk}
              onChange={(e) => setMk(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 text-sm font-bold text-center bg-green-50 py-2 rounded-lg">
              {lang.successMsg}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
            >
              {lang.cancel}
            </button>
            <button
              onClick={handleCreate}
              className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {lang.create}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;