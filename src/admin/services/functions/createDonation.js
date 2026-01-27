import useAdminStore from "../store/adminStore";

const createDonation = async (donationData) => {
  const { token } = useAdminStore.getState();

  const response = await fetch("http://localhost:3000/admin/create-donation", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ donationData }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true, id: data.id };
};

export default createDonation;
