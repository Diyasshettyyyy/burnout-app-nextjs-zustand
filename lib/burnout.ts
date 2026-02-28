// src/lib/burnout.ts

import type { Log, StressLevel } from "./store";
import type { Theme } from "./theme";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const STRESS_VAL: Record<StressLevel, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
};

// ─────────────────────────────────────────────────────────────
// CORE CALCULATIONS
// ─────────────────────────────────────────────────────────────
export function calcBurnout(logs: Log[]): number {
  const recent = logs.slice(-7);
  if (!recent.length) return 0;

  const avgHours =
    recent.reduce((s, l) => s + (l.hours ?? 0), 0) / recent.length;
  const avgStress =
    recent.reduce(
      (s, l) => s + (l.stress ? STRESS_VAL[l.stress] : 1),
      0
    ) / recent.length;
  const avgBreaks =
    recent.reduce((s, l) => s + (l.breaks ?? 0), 0) / recent.length;

  return Math.round(
    Math.min(
      (avgHours / 12) * 40 +
        ((avgStress - 1) / 2) * 40 +
        Math.max(0, 20 - avgBreaks * 5),
      100
    )
  );
}

export function calcRecovery(logs: Log[]): number {
  const recent = logs.slice(-7);
  if (!recent.length) return 0;

  const avgBreaks =
    recent.reduce((s, l) => s + (l.breaks ?? 0), 0) / recent.length;
  const lowStressDays = recent.filter((l) => l.stress === "Low").length;
  const lowHourDays = recent.filter((l) => (l.hours ?? 0) <= 7).length;

  return Math.round(
    Math.min(
      avgBreaks * 10 +
        (lowStressDays / recent.length) * 35 +
        (lowHourDays / recent.length) * 25 +
        10,
      100
    )
  );
}

// ─────────────────────────────────────────────────────────────
// META / LABELS
// ─────────────────────────────────────────────────────────────
export function riskMeta(score: number, t: Theme) {
  if (score < 35)
    return { label: "Low Risk", color: t.green, soft: t.greenSoft };
  if (score < 65)
    return { label: "Moderate", color: t.yellow, soft: t.yellowSoft };
  return { label: "High Risk", color: t.red, soft: t.redSoft };
}

export function recLabel(score: number) {
  return score >= 70
    ? "Excellent"
    : score >= 50
    ? "Good"
    : score >= 30
    ? "Fair"
    : "Poor";
}

// ─────────────────────────────────────────────────────────────
// RECOMMENDATIONS
// ─────────────────────────────────────────────────────────────
export function genRecs(burnout: number, recovery: number, logs: Log[]) {
  const recent = logs.slice(-7);
  const avgHours = recent.length
    ? recent.reduce((s, l) => s + (l.hours ?? 0), 0) / recent.length
    : 0;
  const avgBreaks = recent.length
    ? recent.reduce((s, l) => s + (l.breaks ?? 0), 0) / recent.length
    : 0;
  const highStressDays = recent.filter((l) => l.stress === "High").length;

  const out: {
    icon: string;
    title: string;
    body: string;
    color: string;
  }[] = [];

  if (avgHours > 9)
    out.push({
      icon: "⏰",
      title: "Overtime Alert",
      body: `Averaging ${avgHours.toFixed(
        1
      )}h/day. Try capping at 8h to protect your energy.`,
      color: "#e07b5a",
    });

  if (avgBreaks < 2)
    out.push({
      icon: "☕",
      title: "Take More Breaks",
      body: "Aim for at least 2 short breaks daily — even 5 minutes helps.",
      color: "#8b7ec8",
    });

  if (highStressDays >= 3)
    out.push({
      icon: "🧘",
      title: "Stress Pattern",
      body: `${highStressDays} high-stress days this week. A short mindfulness routine can help.`,
      color: "#e0956a",
    });

  if (burnout >= 65)
    out.push({
      icon: "🚨",
      title: "Act Now",
      body: "Burnout risk is high. Talk to your team about workload balance.",
      color: "#d45a6a",
    });

  if (recovery >= 70)
    out.push({
      icon: "🌟",
      title: "Great Recovery!",
      body: "Your habits are paying off. Keep maintaining healthy boundaries.",
      color: "#5aab8a",
    });

  if (!out.length)
    out.push({
      icon: "✅",
      title: "All Good!",
      body: "Keep logging daily to build a picture of your wellbeing over time.",
      color: "#5aab8a",
    });

  return out;
}

// ─────────────────────────────────────────────────────────────
// WARNINGS
// ─────────────────────────────────────────────────────────────
export function getWarnings(logs: Log[]): string[] {
  const recent = logs.slice(-7);
  const warnings: string[] = [];

  if (recent.filter((l) => (l.hours ?? 0) > 10).length >= 3)
    warnings.push("3+ days worked over 10 hours this week");

  if (recent.filter((l) => l.stress === "High").length >= 4)
    warnings.push("High stress reported 4 or more days in a row");

  if (calcBurnout(logs) > 70)
    warnings.push("Burnout score is critically high — take action");

  return warnings;
}