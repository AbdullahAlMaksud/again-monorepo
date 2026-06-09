"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { type SupportedLanguage } from "./i18n";

const LANGUAGE_STORAGE_KEY = "pomodoro-language";

function isSupportedLanguage(value: string | null): value is SupportedLanguage {
  return value === "en" || value === "bn";
}

export default function I18nProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (!isSupportedLanguage(storedLanguage)) return;

    document.documentElement.lang = storedLanguage;
    void i18n.changeLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    const handleLanguageChange = (language: string) => {
      if (!isSupportedLanguage(language)) return;
      document.documentElement.lang = language;
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
