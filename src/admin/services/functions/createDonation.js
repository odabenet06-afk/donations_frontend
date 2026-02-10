import useAdminStore from "../store/adminStore";

const createDonation = async (donationData) => {
  const { token } = useAdminStore.getState();

  const safeDonationData = {
    ...donationData,
    amount: Number(donationData.amount),
    date: new Date(donationData.date || Date.now()).toISOString(),
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
    }
  );

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error || data.message };
  }
  return { success: true, id: data.id };
};

export default createDonation;
