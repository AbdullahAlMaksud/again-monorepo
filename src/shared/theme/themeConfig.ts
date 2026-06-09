export const THEMES = [
  "emerald",
  "dark",
  "light",
  "nature-green-light",
  "natural-green",
] as const;
export type AppTheme = (typeof THEMES)[number];

export const DEFAULT_THEME: AppTheme = "emerald";
