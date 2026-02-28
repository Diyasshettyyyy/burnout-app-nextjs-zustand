"use client";

import { useState, useCallback } from "react";
import type { Theme } from "@/lib/theme";
import type { StressLevel } from "@/lib/store";

import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";

interface Props {
  addLog: (log: { date: string; stress: StressLevel }) => void;
  t: Theme;
}

export default function LogStress({ addLog, t }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState<string>(today);
  const [level, setLevel] = useState<StressLevel>("Medium");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = useCallback(() => {
    addLog({ date, stress: level });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }, [date, level, addLog]);

  return (
    <Card t={t}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 800, fontSize: 20 }}>
          Log Stress Level
        </div>
        <div style={{ fontSize: 13, color: t.muted }}>
          Record your perceived stress level for the day
        </div>
      </div>

      {submitted && (
        <div
          style={{
            background: t.greenSoft,
            color: t.green,
            padding: "12px 16px",
            borderRadius: 14,
            marginBottom: 16,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Stress level recorded successfully.
        </div>
      )}

      <div style={{ marginBottom: 18 }}>
        <SectionLabel t={t}>Date</SectionLabel>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 14,
            background: t.bgAlt,
            border: `1.5px solid ${t.border}`,
            color: t.text,
          }}
        />
      </div>

      <SectionLabel t={t}>Stress Level</SectionLabel>

      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        {(["Low", "Medium", "High"] as StressLevel[]).map((value) => (
          <button
            key={value}
            onClick={() => setLevel(value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 14,
              background: level === value ? t.accentSoft : t.bgAlt,
              border: `2px solid ${level === value ? t.accent : t.border}`,
              fontWeight: 700,
              color: level === value ? t.accent : t.text,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          background: t.lavender,
          color: "#ffffff",
          border: "none",
          padding: "15px 0",
          borderRadius: 16,
          fontSize: 15,
          fontWeight: 800,
          cursor: "pointer",
          width: "100%",
        }}
      >
        Save Stress
      </button>
    </Card>
  );
}