import React, { useState, useEffect } from "react";
import editDonationService from "../services/functions/editDonation";
import fetchDonors from "../services/functions/fetchDonors";
import useAdminStore from "../services/store/adminStore";

const EditDonationModal = ({ donation, onClose }) => {
  const { donations, setDonations, projects, language } = useAdminStore();

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

  const dict = {
    en: {
      title: "Edit Donation",
      donor: "Donor",
      change: "Change",
      searchPlaceholder: "Search new donor...",
      project: "Assigned Project",
      general: "General",
      amount: "Amount",
      currency: "Currency",
      receipt: "Receipt #",
      cancel: "Cancel",
      update: "Update",
      reqError: "Missing donor, or amount.",
      successMsg: "Changes saved successfully.",
    },
    sq: {
      title: "Ndrysho Donacionin",
      donor: "Donatori",
      change: "Ndrysho",
      searchPlaceholder: "Kërko donator të ri...",
      project: "Projekti i Caktuar",
      general: "Përgjithshme",
      amount: "Shuma",
      currency: "Valuta",
      receipt: "Nr. i faturës",
      cancel: "Anulo",
      update: "Përditëso",
      reqError: "Mungon donatori ose shuma.",
      successMsg: "Ndryshimet u ruajtën me sukses.",
    },
    mk: {
      title: "Уреди донација",
      donor: "Донатор",
      change: "Промени",
      searchPlaceholder: "Пребарај нов донатор...",
      project: "Доделен проект",
      general: "Општо",
      amount: "Износ",
      currency: "Валута",
      receipt: "Број на сметка",
      cancel: "Откажи",
      update: "Ажурирај",
      reqError: "Недостасува донатор или износ.",
      successMsg: "Промените се успешно зачувани.",
    },
  };

  const lang = dict[language] || dict.en;

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
      setError(lang.reqError);
      return;
    }

    const donorFullName =
      `${selectedDonor.first_name} ${selectedDonor.last_name}`.trim();

    const result = await editDonationService({
      id: donation.id,
      amount,
      currency,
      donor_id: selectedDonor.donor_public_id,
      donor_name: donorFullName,
      donation_purpose: purpose,
      receipt_number: receipt,
    });

    if (!result.success) {
      setError(result.error);
      return;
    }

    const updatedDonations = donations.map((d) =>
      d.id === donation.id
        ? {
            ...d,
            amount: Number(amount),
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
          {/* DONOR SEARCH & SELECTION */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.donor}
            </label>
            {selectedDonor ? (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                <div>
                  <p className="font-bold text-blue-900 leading-tight">
                    {selectedDonor.first_name} {selectedDonor.last_name}
                  </p>
                  <p className="text-[10px] text-blue-400 font-mono uppercase mt-1">
                    {selectedDonor.donor_public_id}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedDonor(null);
                    setDonorSearch("");
                  }}
                  className="text-xs font-bold bg-white text-blue-600 px-3 py-2 rounded-xl shadow-sm hover:bg-blue-100 transition"
                >
                  {lang.change}
                </button>
              </div>
            ) : (
              <input
                type="text"
                placeholder={lang.searchPlaceholder}
                value={donorSearch}
                onChange={(e) => setDonorSearch(e.target.value)}
                className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            )}

            {!selectedDonor && searchResults.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-slate-100 rounded-2xl mt-2 shadow-xl max-h-52 overflow-y-auto p-1">
                {searchResults.map((d) => (
                  <button
                    key={d.donor_public_id}
                    onClick={() => {
                      setSelectedDonor(d);
                      setSearchResults([]);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors mb-1 last:mb-0"
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
            )}
          </div>

          {/* PROJECT DROPDOWN */}
          <div className="relative">
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.project}
            </label>
            <button
              onClick={() => setToggleProject(!toggleProject)}
              className="w-full text-left border border-gray-200 rounded-xl p-3 bg-white font-medium flex justify-between items-center hover:border-gray-300 transition-colors"
            >
              <span className="text-slate-900">
                {purpose === "General" ? lang.general : purpose}
              </span>
              <span className="text-gray-400 text-xs">▼</span>
            </button>

            {toggleProject && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto p-1">
                <button
                  className={`w-full text-left px-4 py-3 text-sm transition-colors rounded-xl mb-1 ${
                    purpose === "General" || !purpose
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setPurpose("General");
                    setToggleProject(false);
                  }}
                >
                  {lang.general}
                </button>

                <div className="border-t border-gray-50 my-1 mx-2"></div>

                {projects?.map((prj) => (
                  <button
                    key={prj.id}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors rounded-xl mb-1 last:mb-0 ${
                      prj.name === purpose
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setPurpose(prj.name);
                      setToggleProject(false);
                    }}
                  >
                    {prj.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AMOUNT & CURRENCY */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                {lang.amount}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* RECEIPT */}
          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.receipt}
            </label>
            <input
              type="text"
              placeholder="REC-0000"
              value={receipt}
              onChange={(e) => setReceipt(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="px-6 py-3 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
            >
              {lang.cancel}
            </button>
            <button
              onClick={handleUpdate}
              className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {lang.update}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDonationModal;
