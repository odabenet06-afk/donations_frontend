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
  const response = await fetch(
    "https://" + import.meta.env.VITE_API_URL + "/admin/create-expense",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        expenseData: {
          amount: Number(amount),
          currency: (currency || "MKD").toUpperCase(),
          category: category || "General",
          description: description || "",
          project_name: project_name || "General",
          attachment_url: attachment_url || null,
        },
      }),
    },
  );
  const data = await response.json();
  if (!response.ok) {
    console.error("Create Expense Backend Error:", data);
    return {
      success: false,
      error: data.error || data.message || "Unknown backend error",
    };
  }

  return { success: true, id: data.id };
};

export default createExpense;
