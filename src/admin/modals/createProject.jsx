import React, { useState } from "react";
import createProject from "../services/functions/createProject";
import useAdminStore from "../services/store/adminStore";

const CreateProjectModal = ({ onClose }) => {
  const { projects, setProjects, language } = useAdminStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("planned");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const dict = {
    en: {
      title: "Create New Project",
      name: "Name",
      desc: "Description",
      status: "Status",
      start: "Starting Date",
      end: "Ending Date",
      cancel: "Cancel",
      create: "Create",
      planned: "Planned",
      active: "Active",
      completed: "Completed",
      successMsg: "Project created successfully!",
      genError: "Something went wrong",
    },
    sq: {
      title: "Krijo Projekt të Ri",
      name: "Emri",
      desc: "Përshkrimi",
      status: "Statusi",
      start: "Data e Fillimit",
      end: "Data e Përfundimit",
      cancel: "Anulo",
      create: "Krijo",
      planned: "Planifikuar",
      active: "Aktiv",
      completed: "Përfunduar",
      successMsg: "Projekti u krijua me sukses!",
      genError: "Diçka shkoi keq",
    },
    mk: {
      title: "Креирај нов проект",
      name: "Име",
      desc: "Опис",
      status: "Статус",
      start: "Датум на почеток",
      end: "Датум на завршување",
      cancel: "Откажи",
      create: "Креирај",
      planned: "Планирано",
      active: "Активно",
      completed: "Завршено",
      successMsg: "Проектот е успешно креиран!",
      genError: "Нешто тргна наопаку",
    },
  };

  const lang = dict[language] || dict.en;

  const statusOptions = [
    { value: "planned", label: lang.planned },
    { value: "active", label: lang.active },
    { value: "completed", label: lang.completed },
  ];

  const handleCreate = async () => {
    const result = await createProject(
      name,
      description,
      status,
      startDate,
      endDate,
    );
    if (!result.success) {
      setError(result.error || lang.genError);
      return;
    }

    const newProject = {
      id: result.id,
      name,
      description,
      status,
      start_date: startDate,
      end_date: endDate,
    };

    setProjects([...(projects || []), newProject]);
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

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.name}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.desc}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full h-24 font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-2 block">
              {lang.status}
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all ${
                    status === opt.value
                      ? "bg-slate-900 border-slate-900 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                {lang.start}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                {lang.end}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
              />
            </div>
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

export default CreateProjectModal;