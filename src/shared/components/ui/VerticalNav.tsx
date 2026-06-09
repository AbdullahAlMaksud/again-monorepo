"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Coffee,
  Timer,
  Hourglass,
  Languages,
  Palette,
  Sun,
  Moon,
  Leaf,
  Sprout,
  TreePine,
  Pin,
  PinOff,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAppTheme, THEMES, type AppTheme } from "../../theme";
import { type SupportedLanguage } from "../../i18n";
import { ROUTE_ACCENT_COLORS } from "../../navigation";
import Image from "next/image";
import logoSrc from "../../assets/logo/logo.png";

const ROUTE_ITEMS = [
  { id: "pomodoro" as const, href: "/pomodoro", Icon: Coffee },
  { id: "stopwatch" as const, href: "/stopwatch", Icon: Timer },
  { id: "countdown" as const, href: "/countdown", Icon: Hourglass },
] as const;

const THEME_ICONS: Record<string, typeof Sun> = {
  emerald: Leaf,
  dark: Moon,
  light: Sun,
  "nature-green-light": Sprout,
  "natural-green": TreePine,
};

/** Convert theme ID (with hyphens) to i18n key (with underscores) */
const themeI18nKey = (id: string) => id.replace(/-/g, "_");

export default function VerticalNav() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const pathname = usePathname();
  const { t, i18n } = useTranslation(["common", "nav"]);
  const { theme, setTheme } = useAppTheme();

  const currentLang = i18n.resolvedLanguage ?? i18n.language;
  const visible = pinned || hovered;

  const toggleLanguage = useCallback(() => {
    const next = currentLang === "en" ? "bn" : "en";
    void i18n.changeLanguage(next as SupportedLanguage);
  }, [i18n, currentLang]);

  useEffect(() => {
    if (pinned) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 100) {
        setHovered(true);
      } else if (e.clientX > 100) {
        setHovered(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pinned]);

  const isRouteActive = (href: string) => {
    if (href === "/pomodoro") return pathname === "/pomodoro";
    return pathname.startsWith(href);
  };

  const isClockActive = pathname === "/";
  const ThemeIcon = mounted ? (THEME_ICONS[theme] ?? Palette) : Palette;

  return (
    <TooltipProvider delayDuration={300}>
      <motion.nav
        initial={false}
        animate={{ x: visible ? 0 : -76 }}
        transition={{ type: "spring", stiffness: 400, damping: 36 }}
        className="fullscreen-hidden fixed left-4 top-1/2 z-50 flex flex-col items-center py-10 gap-1.5"
        style={{
          translateY: "-50%",
          width: 56,
          padding: 8,
          borderRadius: 28,
          background: "var(--nav-glass)",
          border: "1px solid var(--nav-border)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: "var(--nav-shadow)",
        }}
        aria-label={t("aria", { ns: "nav" })}
      >
        {/* Logo / Home → Clock */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="flex cursor-pointer items-center justify-center w-9 h-9 rounded-2xl transition-all"
              style={{
                color: isClockActive
                  ? "var(--nav-active-text)"
                  : "var(--text-primary)",
                background: isClockActive
                  ? ROUTE_ACCENT_COLORS.clock
                  : "var(--nav-chip)",
                boxShadow: isClockActive
                  ? `0 4px 16px ${ROUTE_ACCENT_COLORS.clock}55`
                  : "none",
              }}
            >
              <Image src={logoSrc} alt="Clock" width={16} height={16} />
            </Link>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-black text-white border border-black"
          >
            <p>{t("home", { ns: "nav" })}</p>
          </TooltipContent>
        </Tooltip>

        {/* Route nav items */}
        {ROUTE_ITEMS.map(({ id, href, Icon }) => {
          const active = isRouteActive(href);
          const accentColor = ROUTE_ACCENT_COLORS[id];
          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className="flex items-center justify-center w-9 h-9 rounded-2xl transition-all"
                  style={{
                    color: active
                      ? "var(--nav-active-text)"
                      : "var(--text-muted)",
                    background: active ? accentColor : "transparent",
                    boxShadow: active ? `0 4px 16px ${accentColor}55` : "none",
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-black text-white border border-black"
              >
                <p>{t(`routes.${id}`, { ns: "nav" })}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Separator */}
        <Separator
          className="my-0.5"
          style={{ width: 28, background: "var(--nav-border)" }}
        />

        {/* Language toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleLanguage}
              className="flex items-center cursor-pointer justify-center w-9 h-9 rounded-2xl transition-all hover:opacity-75"
              style={{ color: "var(--text-muted)", background: "transparent" }}
              aria-label={t("select.language")}
            >
              <Languages className="w-4 h-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-black text-white border border-black"
          >
            <p>{currentLang === "en" ? "বাংলা" : "English"}</p>
          </TooltipContent>
        </Tooltip>

        {/* Theme dropdown */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-2xl transition-all hover:opacity-75"
                  style={{
                    color: "var(--text-muted)",
                    background: "transparent",
                  }}
                  aria-label={t("select.theme")}
                >
                  <ThemeIcon className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-black text-white border border-black"
            >
              <p>{t("select.theme")}</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent
            side="right"
            align="center"
            className="min-w-32.5"
            style={{
              background: "var(--surface)",
              borderColor: "var(--nav-border)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              backdropFilter: "blur(12px)",
            }}
          >
            {THEMES.map((themeName) => {
              const TIcon = THEME_ICONS[themeName] ?? Palette;
              const isActive = theme === themeName;
              return (
                <DropdownMenuItem
                  key={themeName}
                  onClick={() => setTheme(themeName as AppTheme)}
                  className="gap-2 cursor-pointer"
                  style={{
                    color: isActive
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                    background: isActive ? "var(--nav-chip)" : "transparent",
                  }}
                >
                  <TIcon className="w-4 h-4" />
                  {t(`themes.${themeI18nKey(themeName)}`, { ns: "nav" })}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Separator */}
        <Separator
          className="my-0.5"
          style={{ width: 28, background: "var(--nav-border)" }}
        />

        {/* Pin / Unpin */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setPinned((p) => !p)}
              className="flex items-center justify-center w-9 h-9 rounded-2xl transition-all hover:opacity-75"
              style={{
                color: pinned ? "var(--text-primary)" : "var(--text-faint)",
                background: pinned ? "var(--nav-chip)" : "transparent",
              }}
              aria-label={pinned ? "Unpin navbar" : "Pin navbar"}
              aria-pressed={pinned}
            >
              {pinned ? (
                <Pin className="w-4 h-4" />
              ) : (
                <PinOff className="w-4 h-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-black text-white border border-black"
          >
            <p>{pinned ? "Unpin" : "Pin"}</p>
          </TooltipContent>
        </Tooltip>
      </motion.nav>
    </TooltipProvider>
  );
}
