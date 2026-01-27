import useAdminStore from "../store/adminStore";

const createProject = async (
  name,
  description,
  status,
  start_date,
  end_date,
) => {
  const { token } = useAdminStore.getState();
  const response = await fetch("http://localhost:3000/admin/create-project", {
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
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true, id: data.id };
};

export default createProject;
