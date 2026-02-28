"use client";

import LogStress from "@/components/pages/LogStress";
import { useAppStore } from "@/lib/useAppStore";
import { THEMES } from "@/lib/theme";

export default function Page() {
  const addLog = useAppStore((s) => s.addLog);
  const themeKey = useAppStore((s) => s.themeKey);

  const t = THEMES[themeKey];

  return <LogStress addLog={addLog} t={t} />;
}