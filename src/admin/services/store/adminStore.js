import { create } from "zustand";
import fetchDonations from "../functions/fetchDonations";
import fetchStats from "../functions/fetchStats";
import fetchLogs from "../functions/fetchLogs";
import fetchProjects from "../functions/fetchProjects";
import fetchDonors from "../functions/fetchDonors";
import fetchExpenses from "../functions/fetchExpenses";
import fetchUsers from "../functions/fetchUsers";

const useAdminStore = create((set) => ({
  isAuthorised: false,
  setIsAuthorised: (d) => set({ isAuthorised: d }),
  donations: null,
  stats: null,
  logs: null,
  loading: false,
  error: null,
  token: null,
  projects: null,
  donors: null,
  expenses: null,
  users: null,
  language: "mk",

  loadDashboardData: async (year, month, search = "") => {
    set({ loading: true });
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const [donRes, statRes, logRes, prjcRes, dnrRes, expRes, usrRes] =
      await Promise.all([
        fetchDonations(year, month, search),
        fetchStats(),
        fetchLogs(),
        fetchProjects(),
        fetchDonors(year, month, search),
        fetchExpenses(year, month),
        fetchUsers(),
      ]);
    set({
      donations: donRes.data,
      stats: statRes.data,
      logs: logRes.data,
      loading: false,
      projects: prjcRes.data,
      donors: dnrRes.data,
      expenses: expRes.data,
      users: usrRes.data,
    });
  },

  setDonations: (d) => set({ donations: d }),
  setStats: (s) => set({ stats: s }),
  setToken: (d) => set({ token: d }),
  setLogs: (l) => set({ logs: l }),
  setProjects: (p) => set({ projects: p }),
  setDonors: (d) => set({ donors: d }),
  setExpenses: (e) => set({ expenses: e }),
  setUsers: (u) => set({ users: u }),
  setToken: (d) => set({ token: d }),
  setLanguage: (l) => set({ language: l }),
  role: null,
  setRole: (r) => set({ role: r }),
  username: null,
  setUsername: (u) => set({ username: u }),
  logOut: () => {
    set({
      isAuthorised: false,
      donations: null,
      stats: null,
      logs: null,
      loading: false,
      error: null,
      token: null,
      projects: null,
      donors: null,
    });
  },
}));

export default useAdminStore;
