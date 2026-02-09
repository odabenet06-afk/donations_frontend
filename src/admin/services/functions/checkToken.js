import useAdminStore from "../store/adminStore";

const checkToken = async () => {
  const token = localStorage.getItem("token");
  const { setIsAuthorised, setRole, setUsername } = useAdminStore.getState();

  const response = await fetch(
    "https://" + import.meta.env.VITE_API_URL + "/admin/check-token",
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
    return { success: false, error: data.message };
  }
  setIsAuthorised(true);
  setRole(data.role);
  setUsername(data.username);
  return { success: true, role: data.role };
};

export default checkToken;
