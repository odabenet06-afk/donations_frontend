import { create } from "zustand";

const useDataStore = create((set) => ({
  storeData: null,
  setDataStore: (d) => set({ storeData: d }),
  language: "en",
  setLanguage: (l) => set({ language: l }),
}));

export default useDataStore;
