"use client";

import type { Theme } from "@/lib/theme";
import type { Log } from "@/lib/store";
import { calcBurnout } from "@/lib/burnout";

interface HeatmapProps {
  logs: Log[];
  t: Theme;
}

export default function Heatmap({ logs, t }: HeatmapProps) {
  const today = new Date();

  // Start date: last 28 days
  const start = new Date(today);
  start.setDate(start.getDate() - 27);

  // Month + year label
  const monthLabel = start.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Map date -> burnout score
  const scoreMap: Record<string, number> = {};
  logs.forEach((l) => {
    scoreMap[l.date] = calcBurnout([l]);
  });

  // Generate 28 cells
  const cells = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    const date = d.toISOString().split("T")[0];
    return { date, score: scoreMap[date] ?? null };
  });

  const colorFor = (score: number | null) => {
    if (score === null) return t.border;
    if (score < 35) return t.green;
    if (score < 65) return t.yellow;
    return t.red;
  };

  return (
    <div>
      {/* Timeline label */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: t.muted,
          marginBottom: 10,
        }}
      >
        Burnout Heatmap — {monthLabel}
      </div>

      {/* Heatmap container (size constrained) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 18px)",
          gap: 6,
          justifyContent: "start",
        }}
      >
        {cells.map(({ date, score }) => (
          <div
            key={date}
            title={`${date}${score !== null ? ` · Burnout score: ${score}` : ""}`}
            style={{
              width: 22,
              height: 22,
              borderRadius: 4,
              background: colorFor(score),
              opacity: score === null ? 0.4 : 1,
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        ))}
      </div>
    </div>
  );
}