"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_THEME, type AppTheme } from "./themeConfig";

const THEME_STORAGE_KEY = "pomodoro-theme";

interface ThemeContextValue {
  setTheme: (theme: AppTheme) => void;
  theme: AppTheme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isAppTheme(value: string | null): value is AppTheme {
  return (
    value === "emerald" ||
    value === "dark" ||
    value === "light" ||
    value === "nature-green-light" ||
    value === "natural-green"
  );
}

export function useAppTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useAppTheme must be used inside ThemeProvider");
  return value;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isAppTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "d" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        setTheme((current) => {
          const THEMES_LIST = [
            "emerald",
            "dark",
            "light",
            "nature-green-light",
            "natural-green",
          ] as const;
          const idx = THEMES_LIST.indexOf(
            current as (typeof THEMES_LIST)[number],
          );
          return THEMES_LIST[(idx + 1) % THEMES_LIST.length] as AppTheme;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo(() => ({ setTheme, theme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
