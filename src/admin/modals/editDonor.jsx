import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import editDonor from "../services/functions/editDonor";

const EditDonorModal = ({ onClose, donor }) => {
  const { donors, setDonors, language } = useAdminStore();
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState(donor?.first_name || "");
  const [lastName, setLastName] = useState(donor?.last_name || "");
  const [email, setEmail] = useState(donor?.email || "");
  const [phone, setPhone] = useState(donor?.phone || "");
  const [notes, setNotes] = useState(donor?.notes || "");
  const [privacyPreference, setPrivacyPreference] = useState(
    donor?.privacy_preference || "SHOW_NAME_PUBLICLY",
  );

  const [error, setError] = useState(null);

  const dict = {
    en: {
      title: "Edit Donor",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      privacy: "Privacy Preference",
      showName: "Show Name",
      keepPrivate: "Keep Private",
      notes: "Notes",
      cancel: "Cancel",
      save: "Save Changes",
      successMsg: "Changes saved successfully.",
      genError: "Failed to update donor",
    },
    sq: {
      title: "Ndrysho Donatorin",
      firstName: "Emri",
      lastName: "Mbiemri",
      email: "Email",
      phone: "Telefoni",
      privacy: "Preferenca e Privatësisë",
      showName: "Shfaq Emrin",
      keepPrivate: "Mbetet Privat",
      notes: "Shënime",
      cancel: "Anulo",
      save: "Ruaj Ndryshimet",
      successMsg: "Ndryshimet u ruajtën me sukses.",
      genError: "Dështoi përditësimi i donatorit",
    },
    mk: {
      title: "Уреди донатор",
      firstName: "Име",
      lastName: "Презиме",
      email: "Е-пошта",
      phone: "Телефон",
      privacy: "Приватност",
      showName: "Прикажи име",
      keepPrivate: "Остани приватен",
      notes: "Белешки",
      cancel: "Откажи",
      save: "Зачувај промени",
      successMsg: "Промените се успешно зачувани.",
      genError: "Неуспешно ажурирање на донаторот",
    },
  };

  const lang = dict[language] || dict.en;

  const privacyOptions = [
    { label: lang.showName, value: "SHOW_NAME_PUBLICLY" },
    { label: lang.keepPrivate, value: "SHOW_ID_ONLY" },
  ];

  const handleUpdate = async () => {
    if (!donor.donor_public_id && !donor.id) {
      setError("Donor identifier missing!");
      return;
    }

    const result = await editDonor(
      firstName,
      lastName,
      email,
      privacyPreference,
      phone,
      notes,
      donor.donor_public_id,
      donor.id,
    );

    if (!result.success) {
      setError(result.error || lang.genError);
      return;
    }

    const updatedDonor = {
      ...donor,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      notes,
      privacy_preference: privacyPreference,
    };

    const updatedList = donors.map((d) =>
      d.id === donor.id ? updatedDonor : d,
    );

    setDonors(updatedList);
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
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                {lang.firstName}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-500 mb-1 block">
                {lang.lastName}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.phone}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-2 block">
              {lang.privacy}
            </label>
            <div className="flex gap-2">
              {privacyOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPrivacyPreference(opt.value)}
                  className={`flex-1 py-3 px-3 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-all ${
                    privacyPreference === opt.value
                      ? "bg-slate-900 border-slate-900 text-white shadow-md"
                      : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-500 mb-1 block">
              {lang.notes}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border border-gray-200 rounded-xl p-3 w-full h-24 font-medium focus:ring-2 focus:ring-slate-900/5 outline-none transition-all resize-none"
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
              onClick={handleUpdate}
              className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
            >
              {lang.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDonorModal;
