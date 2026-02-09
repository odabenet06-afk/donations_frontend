import { create } from "zustand";

const useDataStore = create((set) => ({
  storeData: null,
  setDataStore: (d) => set({ storeData: d }),
  language: "sq",
  setLanguage: (l) => set({ language: l }),
}));

export default useDataStore;
