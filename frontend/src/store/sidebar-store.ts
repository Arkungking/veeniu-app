import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  index: number;
  setIndex: (index: number) => void;
  reset: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      index: 0,
      setIndex: (index) => set({ index }),
      reset: () => set({ index: 0 }),
    }),
    { name: "sidebar-storage" },
  ),
);
