import useAdminStore from "../store/adminStore";

const editDonor = async (
  donor_name,
  receipt_number,
  donation_purpose,
  donor_id,
  currency,
  amount,
  id,
) => {
  const { token } = useAdminStore.getState();
  const response = await fetch(
    "https://" + import.meta.env.VITE_API_URL + "/admin/edit-donation",
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
          currency,
          amount,
          id,
        },
      }),
    },
  );

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true };
};

export default editDonor;
