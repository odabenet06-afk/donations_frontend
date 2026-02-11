import useAdminStore from "../store/adminStore";

const editDonor = async (
  first_name,
  last_name,
  email,
  privacy_preference,
  phone,
  notes,
  donor_public_id,
  id
) => {
  const { token } = useAdminStore.getState();

  if (!donor_public_id && !id) {
    return { success: false, error: "Donor identifier is missing" };
  }

  const response = await fetch(
    `https://${import.meta.env.VITE_API_URL}/admin/edit-donor`,
    {
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
          donor_public_id: donor_public_id || null,
          id: id || null,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Donor Edit Error Details:", data.error);
    return { success: false, error: data.error || "Validation failed" };
  }

  return { success: true };
};

export default editDonor;
