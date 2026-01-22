import {create} from 'zustand'

const useDataStore = create ((set) => ({
    data: null,
    setData: (newData) => set({data: newData}),
}))