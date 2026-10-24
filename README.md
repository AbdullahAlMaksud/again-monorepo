# Ghorial (ঘড়িয়াল) — Minimalist Focus Timer & Productivity Suite

**Short Description:** A clean, distraction-free focus timer, digital clock, and productivity companion built with Next.js 16, React 19, Tailwind CSS v4, and native Bengali & English typography.

<p align="left">
  <img src="https://img.shields.io/badge/pnpm-11.18.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.4-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## Table of Contents

- [About](#about)
- [Features](#features)
  - [Pomodoro Timer](#1-pomodoro-timer)
  - [Lap Stopwatch](#2-lap-stopwatch)
  - [Countdown Timer](#3-countdown-timer)
  - [Digital Clock](#4-digital-clock)
  - [Themes](#themes)
  - [Bilingual Typography & i18n](#bilingual-typography--i18n)
  - [Audio & Desktop Notifications](#audio--desktop-notifications)
  - [Keyboard Shortcuts](#keyboard-shortcuts)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**Ghorial** (ঘড়িয়াল) is an open-source, beautifully crafted productivity web application created to help you maintain momentum, track focus periods, and stay mindful of time without clutter or distractions.

Inspired by classical minimalism and modern Swiss design principles, Ghorial combines a Pomodoro technique timer, precision lap stopwatch, flexible countdown timer, and aesthetic full-screen clock into a cohesive, fluid web interface. It delivers zero-latency client-side interaction, Web Audio API sound synthesis, and first-class bilingual support for English and Bengali speakers.

---

## Features

### 1. Pomodoro Timer
- **Auto-Cycle Progression:** Automatically alternates between focus sessions (default 25 min) and short breaks (5 min). After completing 4 focus cycles, transitions into an extended long break (30 min).
- **Customizable Intervals:** Tap-to-edit duration adjustments for Focus, Short Break, and Long Break phases.
- **Visual Session Dots:** Visual progress tracker showing completed sessions in the current 4-session block.
- **Circular Progress Meter:** Smooth SVG ring visualizing time remaining with phase-specific color coding.
- **Quick Controls:** Start, Pause, Reset to default durations, and Zero out state with one click.

### 2. Lap Stopwatch
- **High-Precision Tracking:** Real-time timing showing minutes, seconds, and hundredths of a second (centiseconds).
- **Lap Recording:** Split time recording with relative lap deltas to track lap-by-lap variances.
- **Fastest & Slowest Lap Highlighting:** Color-coded badges instantly pinpoint personal best and slowest laps.
- **Scrollable Lap Log:** Clean review of all recorded intervals.

### 3. Countdown Timer
- **Configurable Durations:** Set hours, minutes, and seconds using quick preset buttons or custom inputs.
- **Preset Quick-Picks:** Instant buttons for common durations (e.g., 5 min, 10 min, 15 min, 25 min, 45 min, 60 min).
- **Audio Alarm Trigger:** Synthesized bell chime sounds when the countdown completes.

### 4. Digital Clock
- **Minimalist Full-Screen Display:** Uncluttered digital clock designed for desk setups, second monitors, and ambient study environments.
- **12-Hour & 24-Hour Modes:** Toggle easily between standard AM/PM and military time.
- **Localized Date & Numerals:** Displays the date in English or Bengali script depending on the chosen language.
- **Pulsing Colon Separator:** Subtle, hypnotic breathing animation on seconds ticks.

---

### Themes

Ghorial features 5 carefully calibrated color palettes designed to minimize eye fatigue during extended work sessions:

| Theme | Identifier | Description |
|---|---|---|
| **Emerald** | `emerald` | Deep dark obsidian backdrop with radiant mint and emerald accents (Default) |
| **Dark** | `dark` | Monochromatic slate and neutral gray tones for ultimate nighttime focus |
| **Light** | `light` | Crisp, high-contrast white and stone layout for well-lit daylight spaces |
| **Nature Green Light** | `nature-green-light` | Gentle matcha and botanical pastel tones on a soft paper background |
| **Natural Green** | `natural-green` | Rich forest green and earthy organic undertones |

> **Pro Tip:** Press <kbd>D</kbd> anywhere in the application to instantly cycle through all themes.

---

### Bilingual Typography & i18n
- **Native Dual Language Support:** Instant language switching between English and Bengali (বাংলা).
- **Curated Typography:** 
  - English: **DM Sans** for legible UI elements & **DM Mono** for tabular numbers.
  - Bengali: **Anek Bangla** for authentic, culturally balanced typography.
- **Numeral Localisation:** Complete conversion between Arabic numerals (`0-9`) and Bengali digits (`০-৯`).

### Audio & Desktop Notifications
- **Synthesized Audio:** Built with the browser's native **Web Audio API** (`AudioContext`) — no external MP3/WAV assets required, ensuring zero network latency and crisp playback.
- **Subtle Ticking:** Optional rhythmic audio feedback on minute transitions.
- **Browser Notifications:** Native HTML5 notifications inform you when focus or break sessions end, even when working in another tab or window.

### Keyboard Shortcuts

| Key | Action |
|---|---|
| <kbd>D</kbd> | Cycle through available themes |
| <kbd>F</kbd> | Toggle full-screen mode |
| <kbd>Space</kbd> | Start / Pause active timer |

---

## Tech Stack

| Category | Technology | Description |
|---|---|---|
| **Package Manager** | [pnpm](https://pnpm.io) (v11) | Fast, disk space efficient package management |
| **Framework** | [Next.js 16](https://nextjs.org) | App Router, Server Components & Turbopack bundler |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) | End-to-end static type safety |
| **Core Library** | [React 19](https://react.dev) | Concurrent features, modern hooks & performance |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | Modern CSS-first utility architecture |
| **UI Primitives** | [Radix UI](https://www.radix-ui.com) | Accessible, unstyled component primitives |
| **Animation** | [Framer Motion](https://www.framer.com/motion) | Fluid layout transitions and micro-interactions |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering) | Lightweight smooth scrolling engine |
| **Internationalisation** | [i18next](https://www.i18next.com) / [react-i18next](https://react.i18next.com) | Robust client-side translation framework |
| **Typography** | [Fontsource](https://fontsource.org) | Self-hosted DM Sans, DM Mono, and Anek Bangla fonts |
| **Icons** | [Lucide React](https://lucide.dev) | Consistent, lightweight vector icon library |

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or higher
- **pnpm**: `v10.x` or `v11.x` (`npm install -g pnpm`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdullahAlMaksud/ghorial-web.git
   cd ghorial-web
   ```

2. **Install project dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the local development server:**
   ```bash
   pnpm dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

---

### Environment Variables

Ghorial operates entirely client-side for its core timer features and does not require third-party API credentials to run locally. If you wish to extend the application with analytics or external storage, create a `.env.local` file in the root directory:

```env
# Optional environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Starts the Next.js development server with Turbopack |
| `pnpm build` | Compiles an optimized production build |
| `pnpm start` | Runs the compiled production build locally |
| `pnpm lint` | Runs ESLint to check for code quality and style issues |

---

## Project Structure

```
ghorial-web/
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── clock/          # Clock route (/clock)
│   │   ├── countdown/      # Countdown route (/countdown)
│   │   ├── pomodoro/       # Pomodoro timer route (/pomodoro)
│   │   ├── stopwatch/      # Stopwatch route (/stopwatch)
│   │   ├── globals.css     # Global styles & theme color tokens
│   │   ├── layout.tsx      # Root application layout with Fontsource imports
│   │   └── page.tsx        # Entry page (renders clock feature by default)
│   ├── features/           # Feature-sliced modules
│   │   ├── clock/          # Clock components, formatters & hooks
│   │   ├── countdown/      # Countdown state machine & presets
│   │   ├── pomodoro/       # Pomodoro phases, cycle dots & editors
│   │   └── stopwatch/      # Millisecond stopwatch & lap recorder
│   └── shared/             # Cross-cutting concerns & shared utilities
│       ├── components/     # UI primitives & application shell components
│       ├── hooks/          # Shared hooks (e.g., useTimerSound)
│       ├── i18n/           # i18next configuration & EN/BN translation files
│       ├── lib/            # Utility helpers (cn, formatters)
│       ├── navigation/     # Nav links and sidebar configurations
│       ├── providers/      # Compound providers (Theme, i18n, Audio)
│       └── theme/          # Theme registry, cycling logic & CSS mapping
├── package.json            # Project manifest & dependencies
├── pnpm-lock.yaml          # Pnpm dependency lockfile
├── pnpm-workspace.yaml     # Allowed build scripts configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## Deployment

### Deploy with Vercel (Recommended)

The easiest way to deploy Ghorial is using the [Vercel Platform](https://vercel.com):

1. Push your latest code to GitHub, GitLab, or Bitbucket.
2. Import the repository into your Vercel Dashboard.
3. Vercel automatically detects Next.js and pnpm:
   - **Build Command:** `pnpm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`
4. Click **Deploy**.

---

## Contributing

Contributions make the open-source community an incredible place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch:**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes:**
   ```bash
   git commit -m "feat: add some AmazingFeature"
   ```
4. **Push to the Branch:**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## Contact

**Abdullah Al Maksud**

- **Email:** [maksud.workspace@gmail.com](mailto:maksud.workspace@gmail.com)
- **Website:** [abdullahalmaksud.com](https://abdullahalmaksud.com)
- **LinkedIn:** [@AbdullahAlMaksud](https://linkedin.com/in/AbdullahAlMaksud)
- **GitHub:** [@AbdullahAlMaksud](https://github.com/AbdullahAlMaksud)

---

<p align="center">
  Crafted with care for focused work and intentional living.
</p>
