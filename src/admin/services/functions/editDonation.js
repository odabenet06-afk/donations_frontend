import useAdminStore from "../store/adminStore";

export const editDonationService = async ({
  id,
  amount,
  currency,
  donor_id,
  donor_name,
  donation_purpose = "",
  receipt_number = "",
  project_id = null,
}) => {
  const { token } = useAdminStore.getState();


  const payload = {
    donationData: {
      id: Number(id), 
      amount: Number(amount), 
      currency: (currency?.toUpperCase() || "MKD").trim(),
      donor_id: String(donor_id).trim(),
      donor_name: (donor_name?.trim() || "Unknown"),
      donation_purpose: donation_purpose || "",
      receipt_number: receipt_number || "",
      project_id: project_id || null,
    },
  };

  try {
    const response = await fetch(
      `https://${import.meta.env.VITE_API_URL}/admin/edit-donation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Edit Donation Error:", data);
      return { success: false, error: data.error || data.message || "Validation failed" };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Edit Donation Exception:", err);
    return { success: false, error: err.message };
  }
};
