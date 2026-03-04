"use client";

import Insights from "@/components/pages/Insights";
import { useAppStore } from "@/lib/useAppStore";
import { THEMES } from "@/lib/theme";

export default function Page() {
  const logs = useAppStore((s) => s.logs);
  const themeKey = useAppStore((s) => s.themeKey);

  const t = THEMES[themeKey];

  return(
    <div
      style={{
        display: "grid",
        gap: 18,
        maxWidth: 1000,
        margin: "0 auto",
        width: "100%",
      }}
    >
     <Insights logs={logs} t={t} />
     </div>
  );
}