import useDataStore from "../store/dataStore";
import fetchData from "../functions/fetchData.js";

let socket;

export function initReloadSocket() {
  const { setDataStore } = useDataStore();

  if (socket) return;

  const socketUrl = "ws://localhost:3000";

  console.log("Initializing WS:", socketUrl);

  socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    console.log("WS connected (reload)");
  };

  socket.onmessage = async (event) => {
    try {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;

      const response = await fetchData(currentYear, currentMonth);

      if (response.success) {
        setDataStore(response.data);
        console.log("Store updated via WS reload");
      } else {
        console.error("Failed to fetch data on reload", response.error);
      }
    } catch (e) {
      console.error("Invalid WS message", e);
    }
  };

  socket.onclose = () => {
    console.log("WS disconnected");
    socket = null;
  };

  socket.onerror = (err) => {
    console.error("WS error", err);
  };
}
