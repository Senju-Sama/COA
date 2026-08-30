import { create } from 'zustand';

interface SimState {
  simData: Record<string, any>;
  updateSimData: (key: string, data: any) => void;
  resetAll: () => void;
}

export const useSimStore = create<SimState>((set) => ({
  simData: {},
  updateSimData: (key, data) => set((state) => ({
    simData: {
      ...state.simData,
      [key]: {
        ...state.simData[key],
        ...data
      }
    }
  })),
  resetAll: () => set({ simData: {} })
}));
