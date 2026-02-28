"use client";

import type { Theme } from "@/lib/theme";

interface CardProps {
  children: React.ReactNode;
  t: Theme;
  style?: React.CSSProperties;
}

export default function Card({ children, t, style = {} }: CardProps) {
  return (
    <div
      style={{
        background: t.surface,
        borderRadius: 24,
        padding: "24px 26px",
        border: `1px solid ${t.border}`,
        boxShadow: `0 4px 24px ${t.shadow}`,
        transition: "box-shadow 0.2s",
        ...style,
      }}
    >
      {children}
    </div>
  );
}