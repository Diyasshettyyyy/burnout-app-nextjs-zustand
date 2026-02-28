"use client";

import type { Theme } from "@/lib/theme";
import type { Log } from "@/lib/store";
import type { StressLevel } from "@/lib/store";

import {
  calcBurnout,
  calcRecovery,
  genRecs,
  riskMeta,
} from "@/lib/burnout";

import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import Sparkline from "@/components/charts/Sparkline";
import Heatmap from "@/components/charts/Heatmap";

interface Props {
  logs: Log[];
  t: Theme;
}

export default function Insights({ logs, t }: Props) {
  const burnout = calcBurnout(logs);
  const recovery = calcRecovery(logs);
  const recs = genRecs(burnout, recovery, logs);

  const recent = logs.slice(-7);
  const maxH = Math.max(...recent.map((l) => l.hours ?? 0), 1);

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* Weekly summary */}
      <Card t={t}>
        <SectionLabel t={t}>Weekly Report</SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {[
            {
              label: "Burnout Score",
              value: burnout,
              color: riskMeta(burnout, t).color,
              soft: riskMeta(burnout, t).soft,
            },
            {
              label: "Recovery",
              value: `${recovery}%`,
              color: t.lavender,
              soft: t.lavenderSoft,
            },
            {
              label: "Total Hours",
              value: `${recent.reduce(
                (s, l) => s + (l.hours ?? 0),
                0
              )}h`,
              color: t.accent,
              soft: t.accentSoft,
            },
            {
              label: "Days Logged",
              value: recent.length,
              color: t.green,
              soft: t.greenSoft,
            },
          ].map(({ label, value, color, soft }) => (
            <div
              key={label}
              style={{
                background: soft,
                borderRadius: 16,
                padding: "16px",
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color,
                  fontFamily: "Nunito, sans-serif",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color,
                  opacity: 0.75,
                  marginTop: 4,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Hours per day */}
        <SectionLabel t={t}>Hours per day (last 7 days)</SectionLabel>
        <div style={{ display: "grid", gap: 8 }}>
          {recent.map((l) => {
            const pct = ((l.hours ?? 0) / maxH) * 100;
            const col =
              (l.hours ?? 0) > 10
                ? t.red
                : (l.hours ?? 0) > 8
                ? t.yellow
                : t.green;

            return (
              <div
                key={l.date}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: t.muted,
                    width: 42,
                    fontWeight: 600,
                  }}
                >
                  {l.date.slice(5)}
                </span>

                <div
                  style={{
                    flex: 1,
                    height: 10,
                    background: t.bgAlt,
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: col,
                      borderRadius: 6,
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>

                <span
                  style={{
                    fontSize: 12,
                    color: t.muted,
                    width: 28,
                    fontWeight: 700,
                  }}
                >
                  {l.hours ?? 0}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Burnout trend */}
      <Card t={t}>
        <SectionLabel t={t}>Burnout Trend</SectionLabel>
        <Sparkline logs={logs} color={t.accent} />
      </Card>

      {/* Stress distribution */}
      <Card t={t}>
        <SectionLabel t={t}>Stress Distribution (7 days)</SectionLabel>

        <div
          style={{
            display: "flex",
            borderRadius: 12,
            overflow: "hidden",
            height: 32,
            marginBottom: 10,
          }}
        >
          {( ["Low", "Medium", "High"] as StressLevel[] ).map((sl) => {
            const cnt = recent.filter((l) => l.stress === sl).length;
            const pct = recent.length ? (cnt / recent.length) * 100 : 0;
            const cols: Record<StressLevel, string> = {
              Low: t.green,
              Medium: t.yellow,
              High: t.red,
            };

            return (
              pct > 0 && (
                <div
                  key={sl}
                  style={{
                    width: `${pct}%`,
                    background: cols[sl],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: "#fff",
                    fontWeight: 800,
                  }}
                >
                  {cnt}d
                </div>
              )
            );
          })}
        </div>
      </Card>

      {/* Heatmap */}
      <Card t={t}>
        <SectionLabel t={t}>Heatmap (28 days)</SectionLabel>
        <Heatmap logs={logs} t={t} />
      </Card>

      {/* Recommendations */}
      <Card t={t}>
        <SectionLabel t={t}>Smart Recommendations</SectionLabel>

        <div style={{ display: "grid", gap: 12 }}>
          {recs.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                background: t.bgAlt,
                borderRadius: 16,
                padding: "14px 16px",
              }}
            >
              <span style={{ fontSize: 24 }}>{r.icon}</span>
              <div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 14,
                    color: r.color,
                    marginBottom: 4,
                  }}
                >
                  {r.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: t.muted,
                    lineHeight: 1.6,
                  }}
                >
                  {r.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}