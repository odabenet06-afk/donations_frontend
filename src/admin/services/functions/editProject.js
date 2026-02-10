import useAdminStore from "../store/adminStore";

const editProject = async (name, description, status, startDate, endDate, id) => {
  const { token } = useAdminStore.getState();

  const formatValue = (val) => (val ? new Date(val).toISOString() : null);

  const response = await fetch(
    `https://${import.meta.env.VITE_API_URL}/admin/edit-project`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: String(id), 
        name,
        description: description || "",
        status,
        startDate: formatValue(startDate),
        endDate: formatValue(endDate),
      }),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error || "Validation failed" };
  }
  return { success: true };
};

export default editProject;
