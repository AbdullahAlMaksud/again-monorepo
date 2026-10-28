import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Again — Recurring Task Tracker",
    short_name: "Again",
    description: "A minimal recurring task tracker for repeat tasks, due dates, and completion history. Private and local-first.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#fcfbf8",
    theme_color: "#ffbd18",
    categories: ["productivity", "utilities"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
