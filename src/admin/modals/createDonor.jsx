import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import createDonor from "../services/functions/createDonor";

const CreateDonorModal = ({ onClose }) => {
  const { donors, setDonors } = useAdminStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [privacyPreference, setPrivacyPreference] =
    useState("SHOW_NAME_PUBLICLY");
  const [error, setError] = useState(null);

  const privacyOptions = [
    { label: "Show Name", value: "SHOW_NAME_PUBLICLY" },
    { label: "Keep Private", value: "SHOW_ID_ONLY" },
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
      setError(result.error || "Something went wrong");
      return;
    }

    const newDonor = {
      id: result.id,
      donor_public_id: result.donor_public_id,
      first_name: firstName,
      last_name: lastName,
      email,
      privacy_preference: privacyPreference,
      phone,
      notes,
      created_at: new Date().toISOString(),
    };

    setDonors([...(donors || []), newDonor]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-20 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Add New Donor</h2>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 rounded-xl p-2 w-full"
                placeholder="John"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-600 mb-1 block">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 rounded-xl p-2 w-full"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full"
              placeholder="07..."
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1 block">
              Privacy Preference
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
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border border-gray-300 rounded-xl p-2 w-full h-20"
              placeholder="Any additional info..."
            />
          </div>

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200 text-sm"
            >
              Create Donor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDonorModal;
