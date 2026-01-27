const fetchData = async (year, month, search) => {
  const response = await fetch(
    "https://" +
      import.meta.env.VITE_API_URL +
      "/api/load?year=" +
      year +
      "&month=" +
      month +
      (search ? "&search=" + search : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  if (!data.success) {
    return { success: false, data: null, error: data.error };
  }
  return { success: true, data: data.data };
};

export default fetchData;
