import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteTitle = "Again — A Minimal Recurring Task Tracker";
const siteDescription = "Again is a minimal recurring task tracker for home maintenance, device care, and everyday upkeep. Track repeat intervals, due dates, and completion history in a private, local-first workspace.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: siteTitle,
    template: "%s | Again",
  },
  description: siteDescription,
  applicationName: "Again",
  keywords: [
    "recurring task tracker",
    "repeat task planner",
    "home maintenance tracker",
    "personal maintenance log",
    "task due date tracker",
    "completion history",
    "offline task app",
    "local-first productivity",
  ],
  authors: [{ name: "Again" }],
  creator: "Again",
  publisher: "Again",
  category: "productivity",
  alternates: siteUrl ? { canonical: "/" } : undefined,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Again",
    title: siteTitle,
    description: siteDescription,
    ...(siteUrl ? { url: siteUrl } : {}),
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Again — Recurring Task Tracker" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: "Again",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <Script
          id="again-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const value = localStorage.getItem("again.theme") || localStorage.getItem("recur.theme"); const allowed = ["light", "dark", "forest", "ocean", "dune"]; const theme = allowed.includes(value) ? value : "light"; document.documentElement.dataset.theme = theme; document.documentElement.classList.toggle("dark", theme === "dark"); } catch {} })();`,
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
