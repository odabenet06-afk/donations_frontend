import useAdminStore from "../store/adminStore";

const checkToken = async () => {
  const token = localStorage.getItem("token");
  const { setIsAuthorised, setRole, setUsername } = useAdminStore.getState();

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
      },
    );

    const data = await response.json();

    if (!response.ok) {
      setIsAuthorised(false);
      return { success: false, error: data.message };
    }

    setIsAuthorised(true);
    setRole(data.role);
    setUsername(data.username);

    return { success: true, role: data.role };
  } catch (err) {
    setIsAuthorised(false);
    return { success: false, error: err.message };
  }
};

export default checkToken;
