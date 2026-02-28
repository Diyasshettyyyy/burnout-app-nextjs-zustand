"use client";

import type { Theme } from "@/lib/theme";

interface Props {
  children: React.ReactNode;
  t: Theme;
}

export default function SectionLabel({ children, t }: Props) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: t.muted,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}