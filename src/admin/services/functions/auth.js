import useAdminStore from "../store/adminStore";

const auth = async (username, password) => {
  const { setIsAuthorised, setToken, setRole, setUsername } =
    useAdminStore.getState();

  const response = await fetch("http://localhost:3000/admin/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    return { success: false, error: data.message };
  }
  console.log(data.token);
  setIsAuthorised(true);
  setToken(data.token);
  setRole(data.role);
  setUsername(data.username);
  return { success: true, role: data.role };
};

export default auth;
