export type TimerRoute = "pomodoro" | "stopwatch" | "countdown" | "clock";

export const TIMER_ROUTES: { id: TimerRoute; href: string }[] = [
  { id: "pomodoro", href: "/pomodoro" },
  { id: "stopwatch", href: "/stopwatch" },
  { id: "countdown", href: "/countdown" },
  { id: "clock", href: "/" },
];

export const ROUTE_ACCENT_COLORS: Record<TimerRoute, string> = {
  pomodoro: "#d4a843",
  stopwatch: "#7aa3c8",
  countdown: "#6dba7f",
  clock: "#d9d2c4",
};
