import React, { useState } from "react";
import useAdminStore from "../services/store/adminStore";
import editDonor from "../services/functions/editDonor";

const EditDonorModal = ({ onClose, donor }) => {
  const { donors, setDonors } = useAdminStore();

  const [firstName, setFirstName] = useState(donor?.first_name || "");
  const [lastName, setLastName] = useState(donor?.last_name || "");
  const [email, setEmail] = useState(donor?.email || "");
  const [phone, setPhone] = useState(donor?.phone || "");
  const [notes, setNotes] = useState(donor?.notes || "");
  const [privacyPreference, setPrivacyPreference] = useState(
    donor?.privacy_preference || "SHOW_NAME_PUBLICLY",
  );

  const [error, setError] = useState(null);

  const privacyOptions = [
    { label: "Show Name", value: "SHOW_NAME_PUBLICLY" },
    { label: "Keep Private", value: "SHOW_ID_ONLY" },
  ];

  const handleUpdate = async () => {
    const result = await editDonor(
      firstName,
      lastName,
      email,
      privacyPreference,
      phone,
      notes,
      donor.donor_public_id,
    );

    if (!result.success) {
      setError(result.error || "Failed to update donor");
      return;
    }

    const updatedDonor = {
      ...donor,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      notes: notes,
      privacy_preference: privacyPreference,
    };

    const updatedList = donors.map((d) =>
      d.id === donor.id ? updatedDonor : d,
    );

    setDonors(updatedList);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] bg-opacity-20 p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Edit Donor</h2>

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
              onClick={handleUpdate}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200 text-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDonorModal;
