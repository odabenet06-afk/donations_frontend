import useAdminStore from "../store/adminStore";

const fetchProjects = async () => {
  const { token } = useAdminStore.getState();

  try {
    const response = await fetch(`http://localhost:3000/admin/load-projects`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch");

    const result = await response.json();

    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export default fetchProjects;
