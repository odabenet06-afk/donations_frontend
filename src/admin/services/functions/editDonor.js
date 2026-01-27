import useAdminStore from "../store/adminStore";

const editDonor = async (
  first_name,
  last_name,
  email,
  privacy_preference,
  phone,
  notes,
  donor_public_id
) => {
  const { token } = useAdminStore.getState();
  const response = await fetch("https://" + import.meta.env.VITE_API_URL + "/admin/edit-donor", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      donorData: {
        first_name,
        last_name,
        email,
        privacy_preference,
        phone,
        notes,
        donor_public_id
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true };
};

export default editDonor;
