import React, { useState } from "react";
import createProject from "../services/functions/createProject"; // adjust path
import useAdminStore from "../services/store/adminStore";

const CreateProjectModal = ({ onClose }) => {
  const { projects, setProjects } = useAdminStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("planned");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    const result = await createProject(
      name,
      description,
      status,
      startDate,
      endDate,
    );
    if (!result.success) {
      setError(result.error || "Something went wrong");
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
    onClose();
  };

  const statusOptions = ["planned", "active", "completed"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-20 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Name
            </label>
            <input
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Description
            </label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Status
            </label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setStatus(opt)}
                  className={`flex-1 min-w-[80px] flex justify-center items-center py-2 px-3 rounded-xl border text-sm font-medium capitalize transition-all ${
                    status === opt
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Starting Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-xl p-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Ending Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-xl p-2 w-full"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
