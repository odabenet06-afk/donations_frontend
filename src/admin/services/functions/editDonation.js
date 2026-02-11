import useAdminStore from "../store/adminStore";

const editDonationService = async (
  donor_name,
  receipt_number,
  donation_purpose,
  donor_id,
  currency,
  amount,
  id
) => {
  const { token } = useAdminStore.getState();

  if (!id) return { success: false, error: "Donation ID missing" };

  const response = await fetch(
    `https://${import.meta.env.VITE_API_URL}/admin/edit-donation`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        donationData: {
          donor_name,
          receipt_number,
          donation_purpose,
          donor_id,
          currency: currency?.toUpperCase() || "MKD",
          amount: Number(amount) || 0,
          id,
        },
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error || "Failed to update donation" };
  }
  return { success: true };
};

export default editDonationService;
