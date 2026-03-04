"use client";

import { useState } from "react";
import type { Log } from "@/lib/store";
import { calcBurnout } from "@/lib/burnout";

interface SparklineProps {
  logs: Log[];
  color: string;
}

export default function Sparkline({ logs, color }: SparklineProps) {
  const recent = logs.slice(-10);
  const [hovered, setHovered] = useState<number | null>(null);

  if (recent.length < 2) {
    return (
      <div style={{ fontSize: 13, opacity: 0.6 }}>
        Log more days to view trend
      </div>
    );
  }

  const scores = recent.map((l) => calcBurnout([l]));

  const width = 400;      // wider chart
  const height = 140;     // taller chart (better visibility)
  const padding = 20;

  const max = Math.max(...scores, 1);

  const points = scores.map((s, i) => ({
    x: padding + (i / (scores.length - 1)) * (width - padding * 2),
    y: height - padding - (s / max) * (height - padding * 2),
    date: recent[i].date,
    value: s,
  }));

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: "visible" }}
      >
        {/* Line */}
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={10}
            fill={color}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {hovered !== null && (
        <div
          style={{
            position: "absolute",
            left: `${(points[hovered].x / width) * 100}%`,
            top: 0,
            transform: "translate(-50%, -120%)",
            background: "#111",
            color: "#fff",
            padding: "6px 10px",
            borderRadius: 8,
            fontSize: 11,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {points[hovered].date} · Score {points[hovered].value}
        </div>
      )}
    </div>
  );
}