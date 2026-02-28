"use client";

import { useState, useCallback } from "react";
import type { Theme } from "@/lib/theme";
import type { Log } from "@/lib/store";

import Card from "@/components/ui/Card";
import SectionLabel from "@/components/ui/SectionLabel";

interface LogWorkProps {
  addLog: (log: Log) => void;
  t: Theme;
}

export default function LogWork({ addLog, t }: LogWorkProps) {
  const TODAY = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(TODAY);
  const [hours, setHours] = useState<number>(8);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = useCallback(() => {
    if (hours < 0 || hours > 24) {
      setError("Hours must be between 0 and 24.");
      return;
    }

    addLog({ date, hours });
    setDone(true);
    setError("");

    setTimeout(() => setDone(false), 2500);
  }, [date, hours, addLog]);

  return (
    <Card t={t}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 800, fontSize: 20 }}>
          Log Work Hours
        </div>
        <div style={{ fontSize: 13, color: t.muted }}>
          Enter the number of hours worked today
        </div>
      </div>

      {done && (
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
          Work hours logged successfully
        </div>
      )}

      {error && (
        <div
          style={{
            background: t.redSoft,
            color: t.red,
            padding: "12px 16px",
            borderRadius: 14,
            marginBottom: 16,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

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
          marginBottom: 18,
        }}
      />

      <SectionLabel t={t}>Hours Worked</SectionLabel>
      <input
        type="number"
        min={0}
        max={24}
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 14,
          background: t.bgAlt,
          border: `1.5px solid ${t.border}`,
        }}
      />

      <button
        onClick={submit}
        style={{
          background: t.accent,
          color: "#fff",
          border: "none",
          padding: "15px 0",
          borderRadius: 16,
          fontSize: 15,
          fontWeight: 800,
          cursor: "pointer",
          marginTop: 20,
          width: "100%",
        }}
      >
        Save Work Log
      </button>
    </Card>
  );
}