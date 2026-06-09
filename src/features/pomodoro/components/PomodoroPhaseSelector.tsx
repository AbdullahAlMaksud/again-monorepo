"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  POMODORO_PHASE_KEYS,
  POMODORO_PHASES,
  type PomodoroPhase,
} from "../config";

interface PomodoroPhaseSelectorProps {
  phase: PomodoroPhase;
  onPhaseChange: (phase: PomodoroPhase) => void;
}

export default function PomodoroPhaseSelector({
  phase,
  onPhaseChange,
}: PomodoroPhaseSelectorProps) {
  const { t } = useTranslation("pomodoro");

  return (
    <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--surface)" }}>
      {POMODORO_PHASE_KEYS.map((item) => (
        <button
          key={item}
          onClick={() => onPhaseChange(item)}
          className="relative px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-colors"
          style={{
            fontFamily: "var(--font-body)",
            color: phase === item ? POMODORO_PHASES[item].color : "var(--text-muted)",
            background: "transparent",
          }}
        >
          {phase === item && (
            <motion.div
              layoutId="phase-pill"
              className="absolute inset-0 rounded-lg"
              style={{ background: "var(--surface-2)" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          <span className="relative z-10">{t(`phases.${item}`)}</span>
        </button>
      ))}
    </div>
  );
}
