"use client";

import type { Log } from "@/lib/store";
import type { Theme } from "@/lib/theme";
import {
  calcBurnout,
  calcRecovery,
  genRecs,
  getWarnings,
  recLabel,
  riskMeta,
} from "@/lib/burnout";

import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";
import Pill from "@/components/ui/Pill";
import Donut from "@/components/charts/Donut";
import Sparkline from "@/components/charts/Sparkline";
import Heatmap from "@/components/charts/Heatmap";

interface Props {
  logs: Log[];
  t: Theme;
}

export default function Dashboard({ logs, t }: Props) {
  const burnout = calcBurnout(logs);
  const recovery = calcRecovery(logs);
  const risk = riskMeta(burnout, t);
  const recs = genRecs(burnout, recovery, logs);
  const warns = getWarnings(logs);
  const recent = logs.slice(-7);

  return (
    <div style={{ display: "grid", gap: 18, maxWidth: 1000, margin: "0 auto" }}>
      {warns.length > 0 && (
        <Card t={t} style={{ background: t.redSoft }}>
          <SectionLabel t={t}>Early Warnings</SectionLabel>
          {warns.map((w, i) => (
            <div key={i} style={{ fontSize: 13, color: t.red }}>
              · {w}
            </div>
          ))}
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
    <Card
  t={t}
  style={{
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
  }}
>
  <SectionLabel t={t}>Burnout Risk</SectionLabel>

  <Donut score={burnout} color={risk.color} />

  <div style={{ marginTop: 6 }}>
    <Pill label={risk.label} color={risk.color} soft={risk.soft} />
  </div>
</Card>

        <Card
  t={t}
  style={{
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
  }}
>
  <SectionLabel t={t}>Recovery</SectionLabel>

  <Donut score={recovery} color={t.lavender} />

  <div style={{ marginTop: 6 }}>
    <Pill
      label={recLabel(recovery)}
      color={t.lavender}
      soft={t.lavenderSoft}
    />
  </div>
</Card>
      </div>

<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
  <Card t={t}>
    <SectionLabel t={t}>Burnout Trend</SectionLabel>
    <Sparkline logs={logs} color={t.accent} />
  </Card>

  <Card t={t}>
    <SectionLabel t={t}>28-Day Heatmap</SectionLabel>
    <Heatmap logs={logs} t={t} />
  </Card>
</div>

      <Card t={t}>
        <SectionLabel t={t}>Top Recommendations</SectionLabel>
        {recs.slice(0, 2).map((r, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong style={{ color: r.color }}>{r.title}</strong>
            <div style={{ fontSize: 13 }}>{r.body}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}