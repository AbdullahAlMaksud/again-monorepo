"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  formatClockDate,
  formatClockTime,
  getClockLocale,
  useCurrentTime,
} from "../hook";

export default function FullscreenClock() {
  const { i18n, t } = useTranslation(["clock", "common"]);
  const now = useCurrentTime();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const locale = getClockLocale(i18n.resolvedLanguage ?? i18n.language);
  const isBn = (i18n.resolvedLanguage ?? i18n.language) === "bn";
  const clockFont = isBn
    ? "'Anek Bangla', system-ui, sans-serif"
    : "var(--font-display)";

  useEffect(() => {
    const syncFullscreen = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    syncFullscreen();
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  };

  return (
    <section
      className="relative flex min-h-screen w-screen flex-col items-center justify-center px-6 pt-28 text-center select-none"
      aria-label={t("aria")}
    >
      <motion.button
        onClick={toggleFullscreen}
        whileTap={{ scale: 0.96 }}
        className="fixed right-5 z-30 inline-flex items-center gap-2  text-sm font-semibold shadow-2xl backdrop-blur-2xl cursor-pointer transition-opacity hover:opacity-85"
        style={{
          top: isFullscreen ? "1.25rem" : "1.75rem",
          borderColor: "rgba(255,255,255,0.16)",
          color: "var(--text-primary)",
          fontFamily: "var(--font-body)",
        }}
        aria-label={isFullscreen ? t("exitFullscreen") : t("openFullscreen")}
      >
        {isFullscreen ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3v5H3" />
            <path d="M16 3v5h5" />
            <path d="M8 21v-5H3" />
            <path d="M16 21v-5h5" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3H3v5" />
            <path d="M16 3h5v5" />
            <path d="M8 21H3v-5" />
            <path d="M16 21h5v-5" />
          </svg>
        )}
      </motion.button>

      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="tabular-nums font-light text-6xl sm:text-8xl md:text-9xl"
          style={{
            color: "var(--text-primary)",
            fontFamily: clockFont,
            letterSpacing: isBn ? "-0.01em" : "-0.04em",
          }}
        >
          {now ? formatClockTime(now, locale) : "--:--:--"}
        </div>

        <div
          className="rounded-full border px-5 py-2 text-sm font-medium sm:text-base"
          style={{
            borderColor: "var(--border)",
            background: "rgba(22, 22, 24, 0.65)",
            color: "var(--text-muted)",
            fontFamily: isBn
              ? "'Anek Bangla', system-ui, sans-serif"
              : "var(--font-body)",
          }}
        >
          {now ? formatClockDate(now, locale) : t("loading")}
        </div>
      </motion.div>
    </section>
  );
}
