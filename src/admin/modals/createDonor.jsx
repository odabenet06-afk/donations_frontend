import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import createDonor from "../services/functions/createDonor";

const CreateDonorModal = ({ onClose }) => {
  const { donors, setDonors, language } = useAdminStore();
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [privacyPreference, setPrivacyPreference] = useState("SHOW_ID_ONLY");
  const [error, setError] = useState(null);

  const dict = {
    en: {
      title: "Add New Donor",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      privacy: "Privacy Preference",
      notes: "Notes",
      cancel: "Cancel",
      create: "Create Donor",
      successMsg: "Changes saved successfully.",
      errorMsg: "Something went wrong",
      optShow: "Show Name",
      optPrivate: "Keep Private",
      placeNotes: "Any additional info..."
    },
    sq: {
      title: "Shto Donator të Ri",
      firstName: "Emri",
      lastName: "Mbiemri",
      email: "Email",
      phone: "Telefoni",
      privacy: "Preferenca e Privatësisë",
      notes: "Shënime",
      cancel: "Anulo",
      create: "Krijo Donatorin",
      successMsg: "Ndryshimet u ruajtën me sukses.",
      errorMsg: "Diçka shkoi keq",
      optShow: "Shfaq Emrin",
      optPrivate: "Mbaje Privat",
      placeNotes: "Informacion shtesë..."
    },
    mk: {
      title: "Додади нов донатор",
      firstName: "Име",
      lastName: "Презиме",
      email: "Е-пошта",
      phone: "Телефон",
      privacy: "Приватност",
      notes: "Белешки",
      cancel: "Откажи",
      create: "Креирај донатор",
      successMsg: "Промените се успешно зачувани.",
      errorMsg: "Нешто тргна наопаку",
      optShow: "Прикажи име",
      optPrivate: "Чувај приватно",
      placeNotes: "Дополнителни информации..."
    }
  };

  const lang = dict[language] || dict.en;

  const privacyOptions = [
    { label: lang.optShow, value: "SHOW_NAME_PUBLICLY" },
    { label: lang.optPrivate, value: "SHOW_ID_ONLY" },
  ];

  const handleCreate = async () => {
    const result = await createDonor(
      firstName,
      lastName,
      email,
      privacyPreference,
      phone,
      notes,
    );

    if (!result.success) {
      setError(result.error || lang.errorMsg);
      return;
    }

    const newDonor = {
      id: result.id,
      donor_public_id: result.public_id,
      first_name: firstName,
      last_name: lastName,
      email,
      privacy_preference: privacyPreference,
      phone,
      notes,
      created_at: new Date().toISOString(),
    };

    setDonors([...(donors || []), newDonor]);
    setSuccess(true);
    setError(null);
    setTimeout(() => {
      setSuccess(false);
      onClose(); 
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-20 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">{lang.title}</h2>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                {lang.firstName}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 rounded-xl p-2 w-full text-sm"
                placeholder="John"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                {lang.lastName}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 rounded-xl p-2 w-full text-sm"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              {lang.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full text-sm"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              {lang.phone}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full text-sm"
              placeholder="07..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              {lang.privacy}
            </label>
            <div className="flex gap-2">
              {privacyOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setPrivacyPreference(opt.value)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    privacyPreference === opt.value
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-200"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              {lang.notes}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full h-20 text-sm"
              placeholder={lang.placeNotes}
            />
          </div>

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
          {success && (
            <p className="text-green-400 mt-4 text-sm font-medium">
              {lang.successMsg}
            </p>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm font-semibold"
            >
              {lang.cancel}
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200 text-sm"
            >
              {lang.create}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonorModal;