"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TimerRing } from "../../../shared/components";
import { COUNTDOWN_COLOR } from "../config";

interface CountdownTimerViewProps {
  h: string;
  isRunning: boolean;
  m: string;
  onEdit: () => void;
  progress: number;
  sec: string;
  showHours: boolean;
  timeLeft: number;
}

export default function CountdownTimerView({
  h,
  isRunning,
  m,
  onEdit,
  progress,
  sec,
  showHours,
  timeLeft,
}: CountdownTimerViewProps) {
  const { t } = useTranslation("common");

  return (
    <motion.div
      key="timer"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <TimerRing
        progress={progress}
        size={280}
        color={timeLeft === 0 ? "var(--border)" : COUNTDOWN_COLOR}
        isRunning={isRunning}
      >
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={onEdit}
            className="group flex flex-col items-center gap-1"
            aria-label={t("actions.editTime")}
          >
            <div
              className="tabular-nums font-light transition-opacity group-hover:opacity-70"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: showHours ? "3rem" : "4.5rem",
                color: timeLeft === 0 ? "var(--text-faint)" : "var(--text-primary)",
                letterSpacing: "-0.04em",
              }}
            >
              {showHours && (
                <>
                  <span>{h}</span>
                  <span style={{ color: COUNTDOWN_COLOR }}>:</span>
                </>
              )}
              <span>{m}</span>
              <motion.span
                animate={{ opacity: isRunning ? [1, 0.2, 1] : 1 }}
                transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
                style={{ color: COUNTDOWN_COLOR }}
              >
                :
              </motion.span>
              <span>{sec}</span>
            </div>
          </button>
          <span
            className="text-xs uppercase tracking-widest"
            style={{
              color: "var(--text-faint)",
              fontFamily: "var(--font-body)",
              fontSize: "0.6rem",
            }}
          >
            {timeLeft === 0 ? t("actions.done") : t("actions.tapToEdit")}
          </span>
        </div>
      </TimerRing>
    </motion.div>
  );
}
