import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Log } from "./store";
import { ThemeKey } from "./theme";

interface AppState {
  
  logs: Log[];
  themeKey: ThemeKey;
  addLog: (log: Log) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set)=>({
  logs: [],
  themeKey: "light",

  addLog: (log) =>
    set((state) => {
      const index = state.logs.findIndex((l) => l.date === log.date);

      if (index !== -1) {
        const updated = [...state.logs];
        updated[index] = { ...updated[index], ...log };
        return { logs: updated };
      }

      return { logs: [...state.logs, log] };
    }),

  toggleTheme: () =>
    set((state) => ({
      themeKey: state.themeKey === "light" ? "dark" : "light",
    })),

}),
   {
      name: "devburn-storage", // localStorage key
    }
  )
);