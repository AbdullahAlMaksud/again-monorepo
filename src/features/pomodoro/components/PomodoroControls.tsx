"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface PomodoroControlsProps {
  color: string;
  isRunning: boolean;
  onReset: () => void;
  onStartStop: () => void;
  onZero: () => void;
  sessions: number;
}

export default function PomodoroControls({
  color,
  isRunning,
  onReset,
  onStartStop,
  onZero,
  sessions,
}: PomodoroControlsProps) {
  const { t } = useTranslation("common");

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onReset}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
        style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
        aria-label={t("actions.reset")}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      <motion.button
        onClick={onStartStop}
        whileTap={{ scale: 0.94 }}
        className="w-16 h-16 rounded-full flex items-center justify-center font-medium text-sm transition-all"
        style={{
          background: color,
          color: "#0e0e0f",
          boxShadow: isRunning ? `0 0 32px ${color}55` : "none",
          fontFamily: "var(--font-body)",
        }}
        aria-label={isRunning ? t("actions.pause") : t("actions.start")}
      >
        {isRunning ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginLeft: 2 }}
          >
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </motion.button>

      <button
        onClick={onZero}
        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-opacity hover:opacity-70"
        style={{
          background: "var(--surface-2)",
          color: "var(--text-muted)",
          fontFamily: "var(--font-display)",
        }}
        aria-label="Reset all to zero"
      >
        {sessions}
      </button>
    </div>
  );
}
