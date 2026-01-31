import React, { useState, useEffect } from "react";
import editDonationService from "../services/functions/editDonation";
import fetchDonors from "../services/functions/fetchDonors";
import useAdminStore from "../services/store/adminStore";

const EditDonationModal = ({ donation, onClose }) => {
  const { donations, setDonations, projects } = useAdminStore();

  const [amount, setAmount] = useState(donation?.amount || "");
  const [currency, setCurrency] = useState(donation?.currency || "MKD");
  const [purpose, setPurpose] = useState(
    donation?.donation_purpose || "General",
  );
  const [receipt, setReceipt] = useState(donation?.receipt_number || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [toggleProject, setToggleProject] = useState(false);
  const [donorSearch, setDonorSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedDonor, setSelectedDonor] = useState({
    donor_public_id: donation?.donor_id,
    first_name: donation?.donor_name.split(" ")[0] || "",
    last_name: donation?.donor_name.split(" ").slice(1).join(" ") || "",
  });

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

  const handleUpdate = async () => {
    if (!selectedDonor || !amount) {
      setError("Missing donor, or amount.");
      return;
    }

    const donorFullName =
      `${selectedDonor.first_name} ${selectedDonor.last_name}`.trim();

    const result = await editDonationService(
      donorFullName,
      receipt,
      purpose,
      selectedDonor.donor_public_id,
      currency.toUpperCase(),
      amount,
      donation.id,
    );

    if (!result.success) {
      setError(result.error);
      return;
    }

    const updatedDonations = donations.map((d) =>
      d.id === donation.id
        ? {
            ...d,
            amount,
            currency: currency.toUpperCase(),
            donor_name: donorFullName,
            donor_id: selectedDonor.donor_public_id,
            donation_purpose: purpose,
            receipt_number: receipt,
          }
        : d,
    );

    setDonations(updatedDonations);
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
        <h2 className="text-xl font-bold mb-4 text-slate-800">Edit Donation</h2>

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
                  <p className="text-[10px] text-blue-400 font-mono uppercase">
                    {selectedDonor.donor_public_id}
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
                placeholder="Search new donor..."
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
              <span className="text-slate-900">{purpose || "General"}</span>
              <span className="text-gray-400">▼</span>
            </button>

            {toggleProject && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md z-50 max-h-48 overflow-y-auto">
                <div className="flex flex-col p-1">
                  <button
                    className={`text-left px-3 py-2 text-sm transition-colors ${
                      purpose === "General" || !purpose
                        ? "bg-blue-50 rounded-xl text-blue-700 font-bold"
                        : "text-gray-600"
                    } hover:bg-gray-50 m-1`}
                    onClick={() => {
                      setPurpose("General");
                      setToggleProject(false);
                    }}
                  >
                    General
                  </button>

                  <div className="border-t border-gray-100 my-1 mx-2"></div>

                  {projects?.map((prj) => (
                    <button
                      key={prj.id}
                      className={`text-left px-3 py-2 text-sm transition-colors ${
                        prj.name === purpose
                          ? "bg-blue-50 rounded-xl text-blue-700 font-bold"
                          : "text-gray-600"
                      } hover:bg-gray-50 m-1`}
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
                className="border border-gray-300 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="border border-gray-300 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="border border-gray-300 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-blue-500 outline-none"
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
              onClick={handleUpdate}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDonationModal;
