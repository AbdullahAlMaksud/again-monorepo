"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";

type SmoothScrollProviderProps = Readonly<{ children: ReactNode }>;

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.12, smoothWheel: true, syncTouch: false }}>
      {children}
    </ReactLenis>
  );
}
