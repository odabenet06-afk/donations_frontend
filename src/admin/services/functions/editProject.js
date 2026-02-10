import useAdminStore from "../store/adminStore";

const editProject = async (
  name,
  description,
  status,
  startDate,
  endDate,
  id,
) => {
  const { token } = useAdminStore.getState();

  const formatValue = (val) => {
    if (!val) return null;
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d.toISOString();
  };

  const response = await fetch(
    `https://${import.meta.env.VITE_API_URL}/admin/edit-project`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description: description || "",
        status,
        startDate: formatValue(startDate),
        endDate: formatValue(endDate),
        id: Number(id),
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Zod Validation Error Details:", data.error);
    return { success: false, error: data.error || "Validation failed" };
  }
  return { success: true };
};

export default editProject;
