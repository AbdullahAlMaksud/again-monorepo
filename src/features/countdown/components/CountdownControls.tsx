"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { COUNTDOWN_COLOR } from "../config";

interface CountdownControlsProps {
  isRunning: boolean;
  onEdit: () => void;
  onReset: () => void;
  onStartStop: () => void;
  timeLeft: number;
  totalSeconds: number;
}

export default function CountdownControls({
  isRunning,
  onEdit,
  onReset,
  onStartStop,
  timeLeft,
  totalSeconds,
}: CountdownControlsProps) {
  const { t } = useTranslation("common");

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onReset}
        disabled={timeLeft === totalSeconds}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70 disabled:opacity-20"
        style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
        aria-label={t("actions.reset")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      <motion.button
        onClick={onStartStop}
        whileTap={{ scale: 0.94 }}
        disabled={timeLeft === 0}
        className="w-16 h-16 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
        style={{
          background: COUNTDOWN_COLOR,
          color: "#0e0e0f",
          boxShadow: isRunning ? `0 0 32px ${COUNTDOWN_COLOR}55` : "none",
        }}
        aria-label={isRunning ? t("actions.pause") : t("actions.start")}
      >
        {isRunning ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </motion.button>

      <button
        onClick={onEdit}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
        style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
        aria-label={t("actions.edit")}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      </button>
    </div>
  );
}
