export type PomodoroPhase = "focus" | "short" | "long";

export const POMODORO_PHASES: Record<PomodoroPhase, { color: string }> = {
  focus: { color: "#d4a843" },
  short: { color: "#6dba7f" },
  long: { color: "#7aa3c8" },
};

export const DEFAULT_POMODORO_DURATIONS: Record<PomodoroPhase, number> = {
  focus: 25,
  short: 5,
  long: 30,
};

export const POMODORO_PHASE_KEYS = Object.keys(
  POMODORO_PHASES,
) as PomodoroPhase[];

export function clampMinutes(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(180, Math.max(1, Math.round(value)));
}

export function formatPomodoroTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return { minutes, seconds: secs };
}
