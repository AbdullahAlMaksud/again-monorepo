"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TimerRing } from "../../../shared/components";
import type { PomodoroPhase } from "../config";

interface PomodoroTimerDisplayProps {
  color: string;
  isRunning: boolean;
  minutes: string;
  phase: PomodoroPhase;
  progress: number;
  seconds: string;
}

export default function PomodoroTimerDisplay({
  color,
  isRunning,
  minutes,
  phase,
  progress,
  seconds,
}: PomodoroTimerDisplayProps) {
  const { t } = useTranslation("pomodoro");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={phase}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <TimerRing progress={progress} size={280} color={color} isRunning={isRunning}>
          <div className="flex flex-col items-center gap-1">
            <div
              className="tabular-nums font-light tracking-tighter"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "4.5rem",
                color: "var(--text-primary)",
                letterSpacing: "-0.04em",
              }}
            >
              <span>{minutes}</span>
              <motion.span
                animate={{ opacity: isRunning ? [1, 0.2, 1] : 1 }}
                transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
                style={{ color }}
              >
                :
              </motion.span>
              <span>{seconds}</span>
            </div>
            <span
              className="text-xs uppercase tracking-widest"
              style={{
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
              }}
            >
              {t(`phases.${phase}`)}
            </span>
          </div>
        </TimerRing>
      </motion.div>
    </AnimatePresence>
  );
}
