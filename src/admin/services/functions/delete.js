import useAdminStore from "../store/adminStore";

const deleteData = async (type, id, username) => {
  const { token } = useAdminStore.getState();
  const response = await fetch(
    `http://localhost:3000/admin/delete-${type}`,

    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        username: username,
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true };
};

export default deleteData;
