
export type StressLevel = "Low" | "Medium" | "High";

export interface Log {
  date: string;
  hours?: number;
  stress?: StressLevel;
  breaks?: number;
}

const TODAY = new Date();

export const SEED: Log[] = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - (13 - i));
  return {
    date: d.toISOString().split("T")[0],
    hours: 6 + Math.round(Math.random() * 5),
    stress: (["Low", "Medium", "High"] as StressLevel[])[
      Math.floor(Math.random() * 3)
    ],
    breaks: Math.floor(Math.random() * 4),
  };
});

export type Action = { type: "ADD"; payload: Log };

export function logsReducer(state: Log[], action: Action): Log[] {
  if (action.type === "ADD") {
    const idx = state.findIndex((l) => l.date === action.payload.date);

    if (idx >= 0) {
      const next = [...state];
      next[idx] = { ...next[idx], ...action.payload };
      return next;
    }

    return [...state, action.payload];
  }

  return state;
}