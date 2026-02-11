import useAdminStore from "../store/adminStore";

const createDonor = async (
  first_name,
  last_name,
  email,
  privacy_preference,
  phone,
  notes,
) => {
  const { token } = useAdminStore.getState();
  const response = await fetch("https://" + import.meta.env.VITE_API_URL + "/admin/create-donor", {
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
      },
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true, id: data.id, public_id: data.public_id };
};

export default createDonor;
