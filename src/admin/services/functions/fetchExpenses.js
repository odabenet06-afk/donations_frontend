import useAdminStore from "../store/adminStore";

const fetchExpenses = async (year, month) => {
  const { token } = useAdminStore.getState();

  try {
    const response = await fetch(
      `https://${import.meta.env.VITE_API_URL}/admin/load-expenses?month=${month}&year=${year}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch");

    const result = await response.json();
    return { success: true, data: result.data };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

export default fetchExpenses;
