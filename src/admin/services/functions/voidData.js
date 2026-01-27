import useAdminStore from "../store/adminStore";

const voidData = async (type, id) => {
  const { token } = useAdminStore.getState();
  const response = await fetch(
    `http://localhost:3000/admin/void-${type}`,

    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true };
};

export default voidData;
