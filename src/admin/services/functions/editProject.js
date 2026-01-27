import useAdminStore from "../store/adminStore";

const editProject = async (
  name,
  description,
  status,
  start_date,
  end_date,
  id,
) => {
  const { token } = useAdminStore.getState();
  const response = await fetch("https://" + import.meta.env.VITE_API_URL + "/admin/edit-project", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      status,
      start_date,
      end_date,
      id,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true };
};

export default editProject;
