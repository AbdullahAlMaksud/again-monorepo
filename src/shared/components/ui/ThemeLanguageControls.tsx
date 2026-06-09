"use client";

import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "../../i18n";
import { useAppTheme, THEMES, type AppTheme } from "../../theme";

export default function ThemeLanguageControls() {
  const { i18n, t } = useTranslation(["common", "nav"]);
  const { setTheme, theme } = useAppTheme();

  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="theme-select">
        {t("select.theme")}
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={(event) => setTheme(event.target.value as AppTheme)}
        className="h-10 rounded-xl border px-3 text-xs font-semibold outline-none"
        style={{
          background: "var(--nav-chip)",
          borderColor: "var(--nav-border)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
        }}
        aria-label={t("select.theme")}
      >
        {THEMES.map((item) => (
          <option key={item} value={item}>
            {t(`themes.${item}`, { ns: "nav" })}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="language-select">
        {t("select.language")}
      </label>
      <select
        id="language-select"
        value={i18n.resolvedLanguage ?? i18n.language}
        onChange={(event) => void i18n.changeLanguage(event.target.value as SupportedLanguage)}
        className="h-10 rounded-xl border px-3 text-xs font-semibold outline-none"
        style={{
          background: "var(--nav-chip)",
          borderColor: "var(--nav-border)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
        }}
        aria-label={t("select.language")}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <option key={language} value={language}>
            {t(`languages.${language}`, { ns: "nav" })}
          </option>
        ))}
      </select>
    </div>
  );
}
