export const THEME_OPTIONS = [
  {
    id: "light",
    label: "Light",
    description: "Clean neutrals with sunshine yellow and orange",
    colors: ["#FCFBF8", "#FFBD18", "#FF6B35"],
    brandForeground: "#202631",
  },
  {
    id: "dark",
    label: "Dark",
    description: "A restrained, comfortable low-light workspace",
    colors: ["#17191D", "#FFC52E", "#FF8252"],
    brandForeground: "#17191D",
  },
  {
    id: "forest",
    label: "Green Forest",
    description: "Soft sage surfaces and forest-green accents",
    colors: ["#F4F7F2", "#2F6A47", "#FFCB56"],
    brandForeground: "#FFFFFF",
  },
  {
    id: "ocean",
    label: "Blue Ocean",
    description: "Cool coastal surfaces with a clear ocean blue",
    colors: ["#F3F8FC", "#2879A8", "#FFC94F"],
    brandForeground: "#FFFFFF",
  },
  {
    id: "dune",
    label: "Dune",
    description: "Sand-toned surfaces and warm amber details",
    colors: ["#F8F3E9", "#9A6016", "#EABD51"],
    brandForeground: "#FFFFFF",
  },
] as const;

export type AppTheme = (typeof THEME_OPTIONS)[number]["id"];

export const DEFAULT_THEME: AppTheme = "light";

export function isAppTheme(value: string | null): value is AppTheme {
  return THEME_OPTIONS.some((theme) => theme.id === value);
}

export function getAppTheme(value: string | null): AppTheme {
  if (isAppTheme(value)) return value;
  // Backward compatibility with the original two-theme preference.
  if (value === "dark") return "dark";
  return DEFAULT_THEME;
}
