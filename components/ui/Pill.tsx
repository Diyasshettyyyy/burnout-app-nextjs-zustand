"use client";

interface PillProps {
  label: string;
  color: string;
  soft: string;
}

export default function Pill({ label, color, soft }: PillProps) {
  return (
    <span
      style={{
        background: soft,
        color,
        borderRadius: 100,
        padding: "4px 14px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.3,
      }}
    >
      {label}
    </span>
  );
}