export const COUNTDOWN_COLOR = "#6dba7f";

export const COUNTDOWN_PRESETS = [
  { seconds: 60 },
  { seconds: 300 },
  { seconds: 600 },
  { seconds: 900 },
  { seconds: 1800 },
  { seconds: 2700 },
];

export function formatCountdownTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  return { h, m, sec };
}
