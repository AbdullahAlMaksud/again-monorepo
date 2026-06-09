"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PomodoroControls from "./PomodoroControls";
import PomodoroDurationEditor from "./PomodoroDurationEditor";
import PomodoroPhaseSelector from "./PomodoroPhaseSelector";
import PomodoroSessionDots from "./PomodoroSessionDots";
import PomodoroTimerDisplay from "./PomodoroTimerDisplay";
import {
  clampMinutes,
  DEFAULT_POMODORO_DURATIONS,
  formatPomodoroTime,
  POMODORO_PHASES,
  type PomodoroPhase,
} from "../config";
import { useTimerSound } from "../../../shared/hooks";

export default function PomodoroMode() {
  const { t } = useTranslation("pomodoro");
  const [phase, setPhase] = useState<PomodoroPhase>("focus");
  const [durations, setDurations] = useState<Record<PomodoroPhase, number>>(
    DEFAULT_POMODORO_DURATIONS,
  );
  const [timeLeft, setTimeLeft] = useState(
    DEFAULT_POMODORO_DURATIONS.focus * 60,
  );
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [completed, setCompleted] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Refs to avoid stale closures inside interval callback
  const phaseRef = useRef(phase);
  const durationsRef = useRef(durations);
  const sessionsRef = useRef(sessions);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    durationsRef.current = durations;
  }, [durations]);
  useEffect(() => {
    sessionsRef.current = sessions;
  }, [sessions]);

  const { playTick, playStart, notifyCompletion } = useTimerSound();

  const totalSeconds = durations[phase] * 60;
  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 0;
  const color = POMODORO_PHASES[phase].color;
  const { minutes, seconds } = formatPomodoroTime(timeLeft);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Auto-advance when a phase completes
  useEffect(() => {
    if (!completed) return;
    setCompleted(false);

    const currentPhase = phaseRef.current;
    const currentSessions = sessionsRef.current;
    const currentDurations = durationsRef.current;

    let nextSessions = currentSessions;
    let nextPhase: PomodoroPhase;

    if (currentPhase === "focus") {
      nextSessions = currentSessions + 1;
      // After every 4 focus sessions → long break, otherwise short break
      nextPhase = nextSessions % 4 === 0 ? "long" : "short";
    } else {
      nextPhase = "focus";
    }

    notifyCompletion(t("complete", { phase: t(`phases.${currentPhase}`) }));
    setSessions(nextSessions);
    setPhase(nextPhase);
    setTimeLeft(currentDurations[nextPhase] * 60);
  }, [completed, notifyCompletion, t]);

  const handleDurationChange = useCallback(
    (targetPhase: PomodoroPhase, value: string) => {
      const nextMinutes = clampMinutes(Number.parseInt(value, 10));
      setDurations((current) => ({ ...current, [targetPhase]: nextMinutes }));

      if (targetPhase === phase) {
        setTimeLeft(nextMinutes * 60);
        setIsRunning(false);
        stopInterval();
      }
    },
    [phase, stopInterval],
  );

  const handlePhaseChange = useCallback(
    (nextPhase: PomodoroPhase) => {
      setPhase(nextPhase);
      setTimeLeft(durations[nextPhase] * 60);
      setIsRunning(false);
      stopInterval();
    },
    [durations, stopInterval],
  );

  const handleStartStop = useCallback(() => {
    if (!isRunning) playStart();
    setIsRunning((value) => !value);
  }, [isRunning, playStart]);

  // Reset: restore 25/5/30 setup, go to focus phase, reset sessions
  const handleReset = useCallback(() => {
    setIsRunning(false);
    stopInterval();
    setDurations(DEFAULT_POMODORO_DURATIONS);
    setPhase("focus");
    setTimeLeft(DEFAULT_POMODORO_DURATIONS.focus * 60);
    setSessions(0);
    setCompleted(false);
  }, [stopInterval]);

  // Zero: stop + zero out timer and sessions, keep current phase & durations
  const handleZero = useCallback(() => {
    setIsRunning(false);
    stopInterval();
    setTimeLeft(0);
    setSessions(0);
    setCompleted(false);
  }, [stopInterval]);

  useEffect(() => {
    if (!isRunning) {
      stopInterval();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          stopInterval();
          setIsRunning(false);
          setCompleted(true);
          return 0;
        }
        if (current % 60 === 0) playTick();
        return current - 1;
      });
    }, 1000);

    return stopInterval;
  }, [isRunning, playTick, stopInterval]);

  return (
    <div className="flex flex-col items-center gap-8 select-none">
      <PomodoroPhaseSelector phase={phase} onPhaseChange={handlePhaseChange} />
      <PomodoroDurationEditor
        durations={durations}
        phase={phase}
        onDurationChange={handleDurationChange}
      />
      <PomodoroTimerDisplay
        color={color}
        isRunning={isRunning}
        minutes={minutes}
        phase={phase}
        progress={progress}
        seconds={seconds}
      />
      <PomodoroControls
        color={color}
        isRunning={isRunning}
        onReset={handleReset}
        onStartStop={handleStartStop}
        onZero={handleZero}
        sessions={sessions}
      />
      <PomodoroSessionDots color={color} sessions={sessions} />
    </div>
  );
}
