"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  ROUTE_ACCENT_COLORS,
  TIMER_ROUTES,
  type TimerRoute,
} from "../../navigation";
import ThemeLanguageControls from "./ThemeLanguageControls";

interface TimerNavProps {
  activeRoute: TimerRoute;
}

export default function TimerNav({ activeRoute }: TimerNavProps) {
  const { t } = useTranslation(["common", "nav"]);

  return (
    <nav
      className="fullscreen-hidden fixed left-1/2 top-5  z-20 py-20 min-h-96 flex -translate-x-1/2 flex-wrap items-center justify-between gap-2 rounded-[10px] border p-2 shadow-2xl backdrop-blur-2xl sm:flex-nowrap"
      style={{
        width: "min(880px, calc(100vw - 24px))",
        background: "var(--nav-glass)",
        borderColor: "var(--nav-border)",
        boxShadow: "var(--nav-shadow)",
      }}
      aria-label={t("aria", { ns: "nav" })}
    >
      <div
        className="flex my-20 items-center rounded-2xl border px-3 py-2 text-sm font-semibold"
        style={{
          color: "var(--text-primary)",
          borderColor: "var(--nav-border)",
          background: "var(--nav-chip)",
          fontFamily: "var(--font-body)",
        }}
      >
        {t("brand")}
      </div>
      <p>sadasdasdsad</p>

      <div
        className="order-3 flex w-full gap-1 rounded-2xl border p-1 sm:order-none sm:w-auto sm:flex-1"
        style={{
          background: "var(--nav-control)",
          borderColor: "var(--nav-border)",
        }}
      >
        {TIMER_ROUTES.map(({ id, href }) => (
          <Link
            key={id}
            className="group relative flex-1 overflow-hidden rounded-xl px-3 py-3 text-xs font-semibold transition-colors sm:text-sm"
            href={href}
            style={{
              fontFamily: "var(--font-body)",
              color:
                activeRoute === id
                  ? "var(--nav-active-text)"
                  : "var(--text-muted)",
              background: "transparent",
              textAlign: "center",
            }}
            aria-current={activeRoute === id ? "page" : undefined}
          >
            {activeRoute === id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${ROUTE_ACCENT_COLORS[id]}, rgba(255,255,255,0.78))`,
                  boxShadow: `0 10px 34px ${ROUTE_ACCENT_COLORS[id]}36`,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {activeRoute !== id && (
              <span
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "var(--nav-chip)" }}
              />
            )}
            <span className="relative z-10 inline-flex items-center justify-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full transition-opacity"
                style={{
                  background:
                    activeRoute === id
                      ? "var(--nav-active-text)"
                      : ROUTE_ACCENT_COLORS[id],
                  opacity: activeRoute === id ? 0.8 : 0.45,
                }}
              />
              {t(`routes.${id}`, { ns: "nav" })}
            </span>
          </Link>
        ))}
      </div>

      <ThemeLanguageControls />
    </nav>
  );
}
