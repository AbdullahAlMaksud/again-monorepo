"use client";

import { motion } from "framer-motion";

interface PomodoroSessionDotsProps {
  color: string;
  sessions: number;
}

export default function PomodoroSessionDots({ color, sessions }: PomodoroSessionDotsProps) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: i < sessions % 4 ? 8 : 6,
            height: i < sessions % 4 ? 8 : 6,
            background: i < sessions % 4 ? color : "var(--border)",
          }}
          animate={{ scale: i === (sessions % 4) - 1 && sessions > 0 ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.4 }}
        />
      ))}
      <span
        className="text-xs ml-1"
        style={{ color: "var(--text-faint)", fontFamily: "var(--font-body)" }}
      >
        x{Math.floor(sessions / 4) > 0 ? Math.floor(sessions / 4) + 1 : ""}
      </span>
    </div>
  );
}
