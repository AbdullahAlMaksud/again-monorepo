# 🛡️ Again — Admin Portal

The administrative operations and system management dashboard for the **Again** recurring task tracking ecosystem. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, providing administrators and support operators with real-time insight into task telemetry, user quotas, reminder queue health, and cloud sync status.

<p align="left">
  <img src="https://img.shields.io/badge/pnpm-11.18.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Directory Structure](#architecture--directory-structure)
- [Environment Configuration](#environment-configuration)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
- [Contributing](#contributing)
- [License](#license)

---

## 🔍 Overview

While `landing-portal` serves as the private, client-side task workspace, **`admin-portal`** is designed for platform operators to monitor infrastructure, manage multi-tenant sync clusters, oversee scheduled reminder notifications, and inspect anonymized system telemetry.

It connects securely to the `server/` backend via authenticated REST & WebSocket endpoints using session-based HTTP-only cookies and cryptographic token verification.

---

## ✨ Key Features

- **📊 Central Analytics Dashboard**:
  - Real-time aggregate count of active workspaces, completed tasks, and recurring task intervals.
  - Frequency distribution charts (daily, weekly, monthly, quarterly, yearly recurrence rates).
  - System throughput metrics and error rates.

- **👥 User & Workspace Administration**:
  - Search, inspect, and manage registered user profiles.
  - Review connected device tokens (Web Push, iOS APNs, Android FCM).
  - Storage quota management and conflict audit reports.

- **⏰ Reminder Queue & Notification Inspector**:
  - Live view of upcoming scheduled task reminders across the Redis / BullMQ worker queue.
  - Delivery failure diagnostic logs (expired push subscriptions, unreachable endpoints).
  - Manual retry and dead-letter queue (DLQ) re-dispatch triggers.

- **🚩 Feature Flags & Remote Configuration**:
  - Dynamically enable or disable experimental features (e.g., CRDT sync engine, new themes, extended interval units).
  - Define rate-limits and client version deprecation warnings.

- **🔒 Audit Trail & Security Logs**:
  - Immutable logs for administrative actions (role updates, token revocations, manual database purges).
  - Geo-IP and session activity tracking for anomaly detection.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router with React Server Components)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode enabled)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Component Primitives**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/) patterns
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: Session-based client integrated with backend Better-Auth / JWT
- **Package Manager**: [pnpm](https://pnpm.io/) (`pnpm@11.x`)

---

## 🗂️ Architecture & Directory Structure

```text
admin-portal/
├── public/                 # Static branding assets and icons
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/         # Public auth routes (admin login, reset)
│   │   ├── (dashboard)/    # Authenticated operator routes
│   │   │   ├── analytics/  # Aggregated metrics & chart views
│   │   │   ├── flags/      # Remote feature flag toggles
│   │   │   ├── queues/     # BullMQ reminder queue inspector
│   │   │   ├── users/      # User accounts & device token manager
│   │   │   └── page.tsx    # Operations overview dashboard
│   │   ├── layout.tsx      # Root application shell
│   │   └── globals.css     # Global theme variables & Tailwind v4 imports
│   ├── components/
│   │   ├── layout/         # Sidebar, header, navigation, and user menu
│   │   ├── metrics/        # KPI cards, charts, and distribution tables
│   │   └── ui/             # Reusable shadcn/ui component primitives
│   ├── lib/
│   │   ├── api-client.ts   # Typed fetch wrapper with cookie credentials
│   │   ├── auth-client.ts  # Session status and admin permissions client
│   │   └── utils.ts        # Formatting, date helpers, and class mergers
│   └── types/              # Domain interfaces and API payload contracts
├── .env.example            # Environment template
├── package.json            # Package dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env.local` before starting the development server:

```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API (`server/`) | `http://localhost:8080` |
| `NEXT_PUBLIC_SITE_URL` | URL where this admin portal is hosted | `http://localhost:3001` |
| `NEXT_PUBLIC_APP_ENV` | Deployment environment (`development`, `staging`, `production`) | `development` |

---

## 🚀 Getting Started

Ensure you have **Node.js 20.9+** and **pnpm** installed.

### 1. Install Dependencies

```bash
cd admin-portal
pnpm install
```

### 2. Start the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3001](http://localhost:3001) in your browser.

> [!NOTE]
> The backend server (`../server`) must be running to authenticate and populate live telemetry and user lists.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts local Next.js dev server on port 3001 |
| `pnpm build` | Compiles production-optimized web bundle |
| `pnpm start` | Serves the production build |
| `pnpm lint` | Runs ESLint analysis |
| `pnpm typecheck` | Validates TypeScript types across the codebase |

---

## 🔐 Role-Based Access Control (RBAC)

Access levels enforced by the portal and backend:

| Role | Dashboard & Metrics | Reminder Queues | User Directory | Feature Flags & Admin Actions |
| :--- | :---: | :---: | :---: | :---: |
| **Viewer / Auditor** | Read-Only | Read-Only | Read-Only | Denied |
| **Operator** | Read-Write | Inspect & Retry | Read-Write | Denied |
| **Super Admin** | Full Access | Full Access | Full Access | Full Access |

---

## 🤝 Contributing

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/admin-improvements
   ```
2. Verify TypeScript and linting:
   ```bash
   pnpm typecheck && pnpm lint
   ```
3. Commit with standard conventional commits and open a Pull Request.

---

## 📄 License

This package is licensed under the **MIT License**.
