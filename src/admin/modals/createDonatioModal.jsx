import React, { useState, useEffect } from "react";
import createDonation from "../services/functions/createDonation";
import fetchDonors from "../services/functions/fetchDonors";
import useAdminStore from "../services/store/adminStore";

const CreateDonationModal = ({ onClose }) => {
  const { donations, setDonations, projects } = useAdminStore();

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("MKD");
  const [purpose, setPurpose] = useState(null);
  const [receipt, setReceipt] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [toggleProject, setToggleProject] = useState(false);
  const [donorSearch, setDonorSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (donorSearch.trim().length > 1 && !selectedDonor) {
        const result = await fetchDonors("", "", donorSearch);
        if (result.success) setSearchResults(result.data);
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [donorSearch, selectedDonor]);

  const handleCreate = async () => {
    if (!selectedDonor || !amount) {
      setError("Missing donor, or amount.");
      return;
    }

    const donationData = {
      amount,
      currency: currency.toUpperCase(),
      donor_id: selectedDonor.donor_public_id,
      donation_purpose: purpose ? purpose : "General",
      receipt_number: receipt,
      donor_name: selectedDonor.first_name + " " + selectedDonor.last_name,
    };

    const result = await createDonation(donationData);

    if (!result.success) {
      setError(result.error);
      return;
    }

    const localNewDonation = {
      id: result.id,
      amount,
      currency: currency.toUpperCase(),
      donor_name: selectedDonor.first_name + " " + selectedDonor.last_name,
      donor_id: selectedDonor.donor_public_id,
      donation_purpose: purpose ? purpose : "General",
      receipt_number: receipt,
      created_at: new Date().toISOString(),
    };

    setDonations([localNewDonation, ...(donations || [])]);
      setSuccess(true);
    setError(null)
    setTimeout(() => {
      setSuccess(false);
      onClose(); 
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-slate-800">New Donation</h2>

        <div className="flex flex-col gap-4">
          {/* DONOR SEARCH & SELECTION */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Donor
            </label>
            {selectedDonor ? (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3 rounded-xl">
                <div>
                  <p className="font-bold text-blue-900 leading-tight">
                    {selectedDonor.first_name} {selectedDonor.last_name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedDonor(null);
                    setDonorSearch("");
                  }}
                  className="text-xs font-bold bg-blue-200 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-300 transition"
                >
                  Change
                </button>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Search name or ID..."
                value={donorSearch}
                onChange={(e) => setDonorSearch(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            )}

            {!selectedDonor && searchResults.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-slate-200 rounded-xl mt-1 shadow-md max-h-52 overflow-y-auto">
                <div className="flex flex-col p-1">
                  {searchResults.map((d) => (
                    <button
                      key={d.donor_public_id}
                      onClick={() => {
                        setSelectedDonor(d);
                        setSearchResults([]);
                      }}
                      className="text-left px-3 py-2 hover:bg-gray-50 rounded-xl transition-colors m-1"
                    >
                      <p className="font-bold text-sm text-slate-800">
                        {d.first_name} {d.last_name}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono uppercase">
                        {d.donor_public_id}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PROJECT DROPDOWN */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Assigned Project
            </label>
            <button
              onClick={() => setToggleProject(!toggleProject)}
              className="w-full text-left border border-gray-300 rounded-xl p-3 bg-white font-medium flex justify-between items-center"
            >
              <span className={purpose ? "text-slate-900" : "text-gray-400"}>
                {purpose || "Select a Project"}
              </span>
              <span className="text-gray-400">▼</span>
            </button>

            {toggleProject && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md z-50 max-h-48 overflow-y-auto">
                <div className="flex flex-col p-1">
                  {projects?.map((prj) => (
                    <button
                      key={prj.id}
                      className={`text-left px-3 py-2 text-sm transition-colors ${prj.name === purpose ? "bg-gray-100 rounded-xl text-slate-900 font-bold" : "text-gray-600"} hover:bg-gray-50 m-1`}
                      onClick={() => {
                        setPurpose(prj.name);
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

          {/* AMOUNT & CURRENCY */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-300 rounded-xl p-3 w-full font-medium"
              />
            </div>
            <div className="w-28">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                className="border border-gray-300 rounded-xl p-3 w-full font-medium"
              />
            </div>
          </div>

          {/* RECEIPT */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Receipt #
            </label>
            <input
              type="text"
              placeholder="REC-0000"
              value={receipt}
              onChange={(e) => setReceipt(e.target.value)}
              className="border border-gray-300 rounded-xl p-3 w-full font-medium"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          {success && (
            <p className="text-green-400 mt-4 text-sm font-medium">
              Changes saved successfully.
            </p>
          )}
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
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

export default CreateDonationModal;
