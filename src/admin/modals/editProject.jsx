import React, { useState } from "react";
import editProject from "../services/functions/editProject";
import useAdminStore from "../services/store/adminStore";

const EditProjectModal = ({ onClose, prjct }) => {
  const { projects, setProjects, language } = useAdminStore();


  const [name, setName] = useState(prjct?.name || "");
  const [description, setDescription] = useState(prjct?.description || "");
  const [status, setStatus] = useState(prjct?.status || "planned");
  const [startDate, setStartDate] = useState(
    prjct?.start_date ? prjct.start_date.slice(0, 10) : "",
  );
  const [endDate, setEndDate] = useState(
    prjct?.end_date ? prjct.end_date.slice(0, 10) : "",
  );
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const dict = {
    en: {
      title: "Edit Project",
      name: "Name",
      desc: "Description",
      status: "Status",
      start: "Starting Date",
      end: "Ending Date",
      save: "Save Changes",
      cancel: "Cancel",
      successMsg: "Changes saved successfully.",
      errorMsg: "Something went wrong",
      planned: "Planned",
      active: "Active",
      completed: "Completed"
    },
    sq: {
      title: "Redakto Projektin",
      name: "Emri",
      desc: "Përshkrimi",
      status: "Statusi",
      start: "Data e Fillimit",
      end: "Data e Mbarimit",
      save: "Ruaj Ndryshimet",
      cancel: "Anulo",
      successMsg: "Ndryshimet u ruajtën me sukses.",
      errorMsg: "Diçka shkoi keq",
      planned: "Planifikuar",
      active: "Aktiv",
      completed: "Përfunduar"
    },
    mk: {
      title: "Уреди Проект",
      name: "Име",
      desc: "Опис",
      status: "Статус",
      start: "Датум на почеток",
      end: "Датум на завршување",
      save: "Зачувај",
      cancel: "Откажи",
      successMsg: "Промените се успешно зачувани.",
      errorMsg: "Нешто тргна наопаку",
      planned: "Планирано",
      active: "Активен",
      completed: "Завршен"
    }
  };

  const lang = dict[language] || dict.en;

  const statusOptions = ["planned", "active", "completed"];

  const handleUpdate = async () => {

    const result = await editProject(
    name,          
    description,   
    status,        
    startDate,    
    endDate,       
    prjct.id
    );

    if (!result.success) {
      setError(result.error || lang.errorMsg);
      return;
    }

    const updatedProject = {
      id: prjct.id,
      name,
      description,
      status,
      start_date: startDate,
      end_date: endDate,
    };

    const updatedList = projects.map((p) =>
      p.id === prjct.id ? updatedProject : p,
    );

    setProjects(updatedList);
    setSuccess(true);
    setError(null);
    
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{lang.title}</h2>

        <div className="flex flex-col gap-4">
          {/* Project Name */}
          <div>
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1 block">
              {lang.name}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-3 w-full text-sm font-semibold outline-none focus:border-blue-400 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1 block">
              {lang.desc}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-3 w-full h-24 text-sm font-semibold outline-none focus:border-blue-400 transition-all resize-none"
            />
          </div>

          {/* Status Selection Buttons */}
          <div>
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 block">
              {lang.status}
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setStatus(opt)} // Sets English Value
                  className={`flex-1 min-w-[90px] py-2.5 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-all ${
                    status === opt
                      ? "bg-slate-900 border-slate-900 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {lang[opt]} {/* Displays Translated Label */}
                </button>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1 block">
                {lang.start}
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-3 w-full text-xs font-bold outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex-1">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1 ml-1 block">
                {lang.end}
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-3 w-full text-xs font-bold outline-none focus:border-blue-400"
              />
            </div>
          </div>

          {/* Messages */}
          {error && (
            <p className="text-red-500 text-[11px] font-bold text-center mt-2 uppercase tracking-tight">
              {error}
            </p>
          )}
          {success && (
            <div className="bg-green-50 border border-green-100 p-3 rounded-2xl">
              <p className="text-green-600 text-xs font-black text-center uppercase tracking-wide">
                {lang.successMsg}
              </p>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-gray-100 text-gray-500 font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
            >
              {lang.cancel}
            </button>
            <button
              onClick={handleUpdate}
              className="px-8 py-3 rounded-full bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {lang.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;