import useAdminStore from "../store/adminStore";

const createExpense = async (
  amount,
  currency,
  category,
  description,
  project_name,
  attachment_url,
) => {
  const { token } = useAdminStore.getState();
  const response = await fetch("https://" + import.meta.env.VITE_API_URL + "/admin/create-expense", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      expenseData: {
        amount,
        currency,
        category,
        description,
        project_name: project_name ? project_name : "General",
        attachment_url,
      },
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.error };
  }
  return { success: true, id: data.id };
};

export default createExpense;
