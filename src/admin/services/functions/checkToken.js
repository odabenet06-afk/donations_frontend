import useAdminStore from "../store/adminStore";

const checkToken = async () => {
  const { setIsAuthorised, setRole, setUsername, setToken } = useAdminStore.getState();
  const token = localStorage.getItem("token");

  if (!token) {
    setIsAuthorised(false);
    return { success: false, error: "No token found" };
  }

  try {
    const response = await fetch(
      `https://${import.meta.env.VITE_API_URL}/admin/check-token`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setIsAuthorised(false);
      localStorage.removeItem("token");
      return { success: false, error: data.message };
    }

    setIsAuthorised(true);
    setToken(token);
    setRole(data.role);
    setUsername(data.username);

    return { success: true };
  } catch (err) {
    setIsAuthorised(false);
    localStorage.removeItem("token");
    return { success: false, error: err.message };
  }
};

export default checkToken;
