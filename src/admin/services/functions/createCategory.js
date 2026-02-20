import useAdminStore from "../store/adminStore";

const createCategory = async (categoryData) => {
  const { token } = useAdminStore.getState();

  const response = await fetch(
    "https://" + import.meta.env.VITE_API_URL + "/admin/create-category",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryData }),
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

export default createCategory;
