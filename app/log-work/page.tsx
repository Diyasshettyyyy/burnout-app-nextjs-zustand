"use client";

import LogWork from "@/components/pages/LogWork";
import { useAppStore } from "@/lib/useAppStore";
import { THEMES } from "@/lib/theme";

export default function Page() {
  const addLog = useAppStore((s) => s.addLog);
  const themeKey = useAppStore((s) => s.themeKey);

  const t = THEMES[themeKey];

  return <LogWork addLog={addLog} t={t} />;
}