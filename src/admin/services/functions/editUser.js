import useAdminStore from "../store/adminStore";

const editUser = async (username, password, role, before) => {
  const { token } = useAdminStore.getState();
  const response = await fetch("http://localhost:3000/admin/edit-user", {
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
        before,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true };
};

export default editUser;
