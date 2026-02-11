import useAdminStore from "../store/adminStore";

const createDonation = async (donationData) => {
  const { token } = useAdminStore.getState();

  const safeDonationData = {
    amount: Number(donationData.amount),
    currency: donationData.currency,
    donor_id: donationData.donor_id,
    donor_name: donationData.donor_name,
    donation_purpose: donationData.donation_purpose || "",
    receipt_number: donationData.receipt_number || "",
  };

  const response = await fetch(
    "https://" + import.meta.env.VITE_API_URL + "/admin/create-donation",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ donationData: safeDonationData }),
    },
  );

  const data = await response.json();
  if (!response.ok) {
    return {
      success: false,
      error: data.error || data.message || "Validation Error",
    };
  }
  return { success: true, id: data.id };
};

export default createDonation;
