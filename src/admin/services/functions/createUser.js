import useAdminStore from "../store/adminStore";

const createUser = async (username, password, role) => {
  const { token } = useAdminStore.getState();
  const response = await fetch("https://" + import.meta.env.VITE_API_URL + "/admin/create-user", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userData: {
        username,
        password,
        role,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true, id: data.id };
};

export default createUser;
