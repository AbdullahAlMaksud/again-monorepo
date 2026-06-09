"use client";

import { useEffect, useState } from "react";
import { LANGUAGE_LOCALES, type SupportedLanguage } from "../../../shared/i18n";

export function getClockLocale(language: string) {
  return LANGUAGE_LOCALES[language as SupportedLanguage] ?? LANGUAGE_LOCALES.en;
}

export function formatClockDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
  });
}

export function formatClockTime(date: Date, locale: string) {
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function useCurrentTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return now;
}
