"use client";

import LogStress from "@/components/pages/LogStress";
import { useAppStore } from "@/lib/useAppStore";
import { THEMES } from "@/lib/theme";

export default function Page() {
  const addLog = useAppStore((s) => s.addLog);
  const themeKey = useAppStore((s) => s.themeKey);

  const t = THEMES[themeKey];

  return (
    <div
      style={{
        display: "grid",
        gap: 18,
        maxWidth: 1000,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <LogStress addLog={addLog} t={t} />
    </div>
  );
}