"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAppStore } from "@/lib/useAppStore";
import { THEMES } from "@/lib/theme";
import { calcBurnout, riskMeta } from "@/lib/burnout";

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/log-work", label: "Log Work" },
  { href: "/log-stress", label: "Log Stress" },
  { href: "/insights", label: "Insights" },
];

function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ---- RAW STATE FROM ZUSTAND ----
  const logs = useAppStore((s) => s.logs);
  const themeKey = useAppStore((s) => s.themeKey);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  // ---- DERIVED STATE (SAFE) ----
  const t = THEMES[themeKey];
  const burnout = calcBurnout(logs);
  const risk = riskMeta(burnout, t);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        fontFamily: "'Nunito', sans-serif",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: 240,
          background: t.sidebar,
          borderRight: `1px solid ${t.border}`,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          boxShadow: `4px 0 24px ${t.shadow}`,
        }}
      >
        {/* Brand */}
        <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${t.border}` }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>DevBurn</div>
          <div style={{ fontSize: 10, color: t.muted, fontWeight: 700 }}>
            BURNOUT ANALYZER
          </div>
        </div>

        {/* Navigation */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  padding: "12px 14px",
                  borderRadius: 14,
                  textDecoration: "none",
                  background: active ? t.accentSoft : "transparent",
                  color: active ? t.accent : t.muted,
                  fontWeight: active ? 800 : 600,
                  fontSize: 14,
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Status */}
        <div style={{ padding: "0 12px 14px" }}>
          <div style={{ background: risk.soft, borderRadius: 18, padding: "16px" }}>
            <div style={{ fontSize: 10, fontWeight: 700 }}>
              CURRENT STATUS
            </div>
            <div style={{ fontSize: 30, fontWeight: 900 }}>
              {burnout}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>
              {risk.label}
            </div>
            <div style={{ height: 6, background: "rgba(0,0,0,0.1)", borderRadius: 3 }}>
              <div
                style={{
                  width: `${burnout}%`,
                  height: "100%",
                  background: risk.color,
                }}
              />
            </div>
          </div>
        </div>

        {/* Theme toggle */}
        <div style={{ padding: "0 12px 24px" }}>
          <button
            onClick={toggleTheme}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: 14,
              border: `1.5px solid ${t.border}`,
              background: t.bgAlt,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {themeKey === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, minHeight: "100vh" }}>
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}