"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TimerRing } from "../../../shared/components";
import { useTimerSound } from "../../../shared/hooks";
import type { Lap } from "../types";

export default function StopwatchMode() {
  const { t } = useTranslation("stopwatch");
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const startRef = useRef<number>(0);
  const accRef = useRef<number>(0);
  const animRef = useRef<number>(0);
  const { playStart, playTick } = useTimerSound();

  const COLOR = "#7aa3c8";

  const progress = ((elapsed % 60000) / 60000);

  const formatElapsed = (ms: number) => {
    const centiseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, "0");
    const minutes = Math.floor(ms / 60000).toString().padStart(2, "0");
    return { minutes, seconds, centiseconds };
  };

  const { minutes, seconds, centiseconds } = formatElapsed(elapsed);

  const tick = useCallback(function updateElapsed() {
    setElapsed(accRef.current + (Date.now() - startRef.current));
    animRef.current = requestAnimationFrame(updateElapsed);
  }, []);

  const handleStartStop = useCallback(() => {
    if (isRunning) {
      cancelAnimationFrame(animRef.current);
      accRef.current += Date.now() - startRef.current;
    } else {
      playStart();
      startRef.current = Date.now();
      animRef.current = requestAnimationFrame(tick);
    }
    setIsRunning((v) => !v);
  }, [isRunning, tick, playStart]);

  const handleLap = useCallback(() => {
    if (!isRunning && elapsed === 0) return;
    playTick();
    const lastLap = laps.length > 0 ? laps[laps.length - 1].elapsed : 0;
    setLaps((prev) => [
      ...prev,
      { index: prev.length + 1, elapsed, split: elapsed - lastLap },
    ]);
  }, [elapsed, isRunning, laps, playTick]);

  const handleReset = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    setIsRunning(false);
    setElapsed(0);
    setLaps([]);
    accRef.current = 0;
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const formatMs = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const cs = Math.floor((ms % 1000) / 10).toString().padStart(2, "0");
    if (m > 0) return `${m}:${(s % 60).toString().padStart(2, "0")}.${cs}`;
    return `${(s % 60).toString().padStart(2, "0")}.${cs}`;
  };

  const bestLap = laps.length > 1 ? Math.min(...laps.map((l) => l.split)) : null;
  const worstLap = laps.length > 1 ? Math.max(...laps.map((l) => l.split)) : null;

  return (
    <div className="flex flex-col items-center gap-8 select-none">
      {/* Ring */}
      <TimerRing
        progress={progress}
        size={280}
        color={COLOR}
        isRunning={isRunning}
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className="tabular-nums font-light"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "4rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
            }}
          >
            <span>{minutes}</span>
            <motion.span
              animate={{ opacity: isRunning ? [1, 0.2, 1] : 1 }}
              transition={{ duration: 1, repeat: isRunning ? Infinity : 0 }}
              style={{ color: COLOR }}
            >
              :
            </motion.span>
            <span>{seconds}</span>
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1rem",
              color: "var(--text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            .{centiseconds}
          </div>
        </div>
      </TimerRing>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLap}
          disabled={!isRunning && elapsed === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-20"
          style={{
            background: "var(--surface-2)",
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
          aria-label={t("lap")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </button>

        <motion.button
          onClick={handleStartStop}
          whileTap={{ scale: 0.94 }}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all"
          style={{
            background: COLOR,
            color: "#0e0e0f",
            boxShadow: isRunning ? `0 0 32px ${COLOR}55` : "none",
          }}
          aria-label={isRunning ? t("stop") : t("start")}
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
          onClick={handleReset}
          disabled={elapsed === 0 && !isRunning}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70 disabled:opacity-20"
          style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
          aria-label={t("reset")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* Laps */}
      <AnimatePresence>
        {laps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-xs"
            style={{ maxHeight: "12rem", overflowY: "auto" }}
          >
            <div className="flex flex-col gap-1 pb-1">
              {[...laps].reverse().map((lap) => (
                <motion.div
                  key={lap.index}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{ background: "var(--surface)" }}
                >
                  <span
                    className="text-xs"
                    style={{
                      color: "var(--text-faint)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {String(lap.index).padStart(2, "0")}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      fontFamily: "var(--font-display)",
                      color:
                        bestLap !== null && lap.split === bestLap
                          ? "#6dba7f"
                          : worstLap !== null && lap.split === worstLap
                          ? "#c07070"
                          : "var(--text-muted)",
                    }}
                  >
                    +{formatMs(lap.split)}
                  </span>
                  <span
                    className="text-xs"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {formatMs(lap.elapsed)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
