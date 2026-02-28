"use client";

import Insights from "@/components/pages/Insights";
import { useAppStore } from "@/lib/useAppStore";
import { THEMES } from "@/lib/theme";

export default function Page() {
  const logs = useAppStore((s) => s.logs);
  const themeKey = useAppStore((s) => s.themeKey);

  const t = THEMES[themeKey];

  return <Insights logs={logs} t={t} />;
}