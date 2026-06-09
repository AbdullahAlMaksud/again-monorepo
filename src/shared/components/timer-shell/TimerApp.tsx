"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { BackgroundCanvas } from "../background";
import { FooterTagline, ScreenTitle, VerticalNav } from "../ui";
import { ROUTE_ACCENT_COLORS, type TimerRoute } from "../../navigation";

interface TimerAppProps {
  activeRoute: TimerRoute;
  children: ReactNode;
}

export default function TimerApp({ activeRoute, children }: TimerAppProps) {
  const accentColor = ROUTE_ACCENT_COLORS[activeRoute];
  const isClockRoute = activeRoute === "clock";

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      <BackgroundCanvas accentColor={accentColor} />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(14,14,15,0.75) 100%)",
        }}
      />

      <VerticalNav />

      {isClockRoute ? (
        children
      ) : (
        <motion.div
          key={activeRoute}
          className="relative z-10 flex flex-col items-center"
          style={{ width: "min(440px, 96vw)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ScreenTitle accentColor={accentColor} />
          {children}
        </motion.div>
      )}

      {!isClockRoute && <FooterTagline />}
    </div>
  );
}
