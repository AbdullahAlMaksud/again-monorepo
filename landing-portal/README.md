# 🔁 Again — Landing Portal & Web Workspace

A minimal, local-first recurring task tracker and upkeep workspace built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

<p align="left">
  <img src="https://img.shields.io/badge/pnpm-11.18.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-components-111827?style=for-the-badge" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Vitest-Passing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📋 Table of Contents

- [About Again](#about-again)
- [Why Again? (Not a Streak Tracker)](#why-again-not-a-streak-tracker)
- [Key Features](#key-features)
- [Design System & Theme Tokens](#design-system--theme-tokens)
- [Recurring Calculation Engine](#recurring-calculation-engine)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Testing Suite](#testing-suite)
- [Contributing](#contributing)
- [License](#license)

---

## 💡 About Again

**Again** helps people stay on top of the practical things that need doing again: home maintenance, device care, vehicle upkeep, and personal rituals.

Track repeat intervals, due dates, and completion history in a private, 100% local-first workspace. Add the things you maintain or repeat, record when they are completed, and let Again calculate the next due date based on real-world interval rules.

It works completely offline without requiring an account, sign-in, or internet connection.

---

## 🎯 Why Again? (Not a Streak Tracker)

Traditional habit trackers emphasize unbroken daily streaks. If you break your streak, you fail.

Real-world upkeep doesn't work that way:
- Replacing your air filter happens **every 90 days**.
- Descaling your coffee machine happens **every 30 days**.
- Backing up your laptop happens **every 2 weeks**.
- Watering delicate plants happens **every 7 days**.

If you do a task 2 days late, you shouldn't be penalized with a broken streak. Instead, **Again calculates the next due date forward from when you actually completed it**, keeping your schedule realistic and stress-free.

---

## ✨ Key Features

- **☀️ Today Dashboard**: Instant overview showing today's tasks, overdue items, and upcoming duties with quick-complete buttons.
- **⚙️ Dynamic Recurrence Engine**: Custom repeat intervals in **days**, **weeks**, **months**, or **years** with accurate month-end and leap-year date arithmetic.
- **📅 Historical Completion Log**: Complete log of every time a task was completed, showing upkeep timelines and frequency trends.
- **🏷️ Categories & Custom Notes**: Group tasks by Home, Devices, Vehicle, Garden, Health, or Custom tags with markdown-friendly notes.
- **🔍 Instant Filter & Search**: Global fast search (`Ctrl/⌘ + K`) filtering across titles, notes, and categories.
- **🔒 Private Local-First Storage**: Tasks and preferences stay strictly within your browser profile (`localStorage`), with zero telemetry or tracking.
- **📦 Data Portability (Backup & Restore)**: Export your entire workspace to clean JSON at any time or restore past backups (with backward compatibility for legacy `recur` schemas).
- **📱 Installable PWA Shell**: Includes Web App Manifest and Service Worker for instant offline reopening and homescreen installation.
- **♿ Accessible Motion & Typography**: Smooth Lenis scrolling automatically disabled when the user has `prefers-reduced-motion` enabled.

---

## 🎨 Design System & Theme Tokens

The UI follows a calm, focused productivity design: quiet neutral surfaces, energetic sunshine-yellow actions, warm orange accents, restrained hairline dividers, and 5 selectable themes.

### Available Themes

| Theme | Characteristic |
| :--- | :--- |
| **Light** | Soft white neutrals, sunshine yellow primary actions, and energetic orange accents. |
| **Dark** | Charcoal surfaces with warm yellow and orange highlights. |
| **Green Forest** | Pale sage surfaces, forest-green accents, and warm yellow details. |
| **Blue Ocean** | Cool coastal surfaces with ocean-blue accents and sunny highlights. |
| **Dune** | Sand-toned surfaces, amber accents, and warm neutral text. |

### Semantic CSS Color Tokens

| Token | Light Theme Value | Usage |
| :--- | :--- | :--- |
| `--background` | `#FCFBF8` | Primary application canvas |
| `--panel` | `#FFFFFF` | Elevated cards, dialogs, and sheets |
| `--ink` | `#202631` | Headings, body copy, and primary text |
| `--brand` | `#FF6B35` | Energetic orange accents and focus rings |
| `--lemon` | `#FFBD18` | Primary interactive buttons & active highlights |
| `--line` | `#E5E7EB` | Hairline borders and dividers |

---

## 🧮 Recurring Calculation Engine

The core date mathematics engine resides in `src/features/again/lib/date-utils.ts`:

- **Strict Day Anchoring**: Avoids timezone shifts by working with ISO date keys (`YYYY-MM-DD`).
- **Month-End Clamping**: If a task repeats every month and was completed on January 31, the next due date correctly resolves to February 28 (or 29 on leap years).
- **Leap Year Logic**: Four-year and century leap year rules are rigorously tested and verified.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Description |
| :--- | :--- |
| <kbd>N</kbd> | Open the New Task creation dialog (when not focusing an input) |
| <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> | Focus the global search input |
| <kbd>Escape</kbd> | Dismiss modals, sheets, or mobile drawer |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React Server Components)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, zero `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) with [Radix UI](https://www.radix-ui.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/)
- **Smooth Scrolling**: [Lenis](https://lenis.dev/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/) (`pnpm@11.x`)

---

## 🗂️ Project Structure

```text
landing-portal/
├── public/                       # Favicon, icons, manifest, and service worker (sw.js)
├── src/
│   ├── app/                      # App Router: root layout, manifest, robots, sitemap
│   │   ├── globals.css           # Tailwind v4 theme definitions and font variables
│   │   ├── layout.tsx            # App shell with smooth scroll and theme provider
│   │   └── page.tsx              # Mounts the AgainApp interface
│   ├── components/
│   │   ├── layout/               # Sidebar navigation, header, theme toggler
│   │   ├── ui/                   # Reusable shadcn/ui components (Button, Dialog, etc.)
│   │   └── smooth-scroll-provider.tsx # Accessible Lenis wrapper
│   ├── features/
│   │   └── again/                # Core domain feature folder
│   │       ├── components/       # Dashboard, task list, history view, form dialogs
│   │       ├── lib/              # Date arithmetic, local storage, validation, seed data
│   │       └── types/            # Task, interval, and theme domain interfaces
│   └── lib/                      # Common styling utilities (cn helper)
├── vitest.config.ts              # Unit test configuration
├── package.json                  # Workspace dependencies and scripts
└── tsconfig.json                 # TypeScript compiler options
```

---

## 🚀 Getting Started

Ensure you have **Node.js 20.9+** and **pnpm** installed.

### 1. Install Dependencies

```bash
cd landing-portal
pnpm install
```

### 2. Configure Environment (Optional)

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical deployment URL used for SEO & sitemaps | `http://localhost:3000` |

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts Next.js development server with hot-reloading |
| `pnpm build` | Compiles optimized static & server production bundle |
| `pnpm start` | Serves the production build |
| `pnpm lint` | Runs ESLint validation |
| `pnpm typecheck` | Checks TypeScript compilation without emitting files |
| `pnpm test` | Runs the full Vitest unit test suite |
| `pnpm test:watch` | Runs Vitest in interactive watch mode |

---

## 🧪 Testing Suite

The project includes unit tests for date logic, interval calculations, task schema validation, and theme configurations:

```bash
pnpm test
```

Test coverage includes:
- Interval addition (days, weeks, months, years).
- Month-end clamping (e.g., Jan 31 + 1 month = Feb 28).
- Leap-year boundary testing.
- JSON import validation and sanitization.

---

## 🤝 Contributing

1. Fork or clone the monorepo.
2. Create a clean feature branch: `git checkout -b feature/my-feature`.
3. Verify all tests and checks pass:
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm test
   ```
4. Submit a Pull Request.

---

## 📄 License

This package is licensed under the **MIT License**. See [LICENSE](./LICENSE).
