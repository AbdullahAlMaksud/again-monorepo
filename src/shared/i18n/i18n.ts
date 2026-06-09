import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import bnClock from "./locales/bn/clock.json";
import bnCommon from "./locales/bn/common.json";
import bnCountdown from "./locales/bn/countdown.json";
import bnNav from "./locales/bn/nav.json";
import bnPomodoro from "./locales/bn/pomodoro.json";
import bnStopwatch from "./locales/bn/stopwatch.json";
import enClock from "./locales/en/clock.json";
import enCommon from "./locales/en/common.json";
import enCountdown from "./locales/en/countdown.json";
import enNav from "./locales/en/nav.json";
import enPomodoro from "./locales/en/pomodoro.json";
import enStopwatch from "./locales/en/stopwatch.json";

export const SUPPORTED_LANGUAGES = ["en", "bn"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LOCALES: Record<SupportedLanguage, string> = {
  en: "en-US",
  bn: "bn-BD",
};

const resources = {
  en: {
    clock: enClock,
    common: enCommon,
    countdown: enCountdown,
    nav: enNav,
    pomodoro: enPomodoro,
    stopwatch: enStopwatch,
  },
  bn: {
    clock: bnClock,
    common: bnCommon,
    countdown: bnCountdown,
    nav: bnNav,
    pomodoro: bnPomodoro,
    stopwatch: bnStopwatch,
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    lng: "en",
    ns: ["common", "nav", "pomodoro", "countdown", "clock", "stopwatch"],
    defaultNS: "common",
    resources,
  });
}

export default i18n;
