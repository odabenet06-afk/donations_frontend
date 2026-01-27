import { create } from "zustand";

const useDataStore = create((set) => ({
  storeData: null,
  setDataStore: (d) => set({ storeData: d }),
}));

export default useDataStore;
