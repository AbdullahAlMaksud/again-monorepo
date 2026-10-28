# ⚙️ Again — Backend Server & Sync Engine

The high-performance backend API service, multi-device sync engine, and scheduled reminder dispatcher for the **Again** ecosystem. Built with **Node.js (LTS)**, **TypeScript**, **Hono / Express**, **Redis**, and **Better-Auth**.

<p align="left">
  <img src="https://img.shields.io/badge/pnpm-11.18.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/Node.js-22_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Hono-API_Framework-E36002?style=for-the-badge&logo=hono&logoColor=white" alt="Hono" />
  <img src="https://img.shields.io/badge/Redis-Worker_Queue-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Key Features](#key-features)
- [Directory Structure](#directory-structure)
- [Database Schema & Models](#database-schema--models)
- [Sync Engine Protocol](#sync-engine-protocol)
- [API Reference](#api-reference)
- [Environment Configuration](#environment-configuration)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment & Production](#deployment--production)
- [License](#license)

---

## 🔍 Overview

While `landing-portal` functions standalone as a 100% private, local-first web app, **`server`** provides the cloud companion layer for users who want:
1. **Multi-device synchronization**: Seamlessly sync recurring tasks between web, mobile (`mobile-app`), and desktop without losing local offline speed.
2. **Automated reminders**: Reliable background notification delivery (Web Push, APNs, FCM) when repeat intervals become due, even when the app is closed.
3. **Encrypted cloud backups**: Automated historical snapshots and restore points.
4. **Administrative oversight**: Secure telemetry and health inspection via `admin-portal`.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Clients
        W[landing-portal Web App]
        M[mobile-app iOS / Android]
        A[admin-portal Dashboard]
    end

    subgraph Server [again-server Engine]
        API[Hono REST & Sync API]
        Auth[Better-Auth Session Service]
        Queue[BullMQ / Redis Scheduler]
        Worker[Push & Email Dispatch Worker]
    end

    subgraph Storage
        DB[(PostgreSQL / MongoDB)]
        Cache[(Redis Cache & Queues)]
    end

    W <-->|Sync Tasks & History| API
    M <-->|Sync Tasks & Push Tokens| API
    A <-->|RBAC / Telemetry| API
    API --> Auth
    API --> DB
    Queue --> Cache
    Worker --> Queue
    Worker -->|Web Push / VAPID| W
    Worker -->|APNs / FCM| M
```

---

## ✨ Key Features

- **🔄 Local-First Cloud Sync Protocol**:
  - Incremental diff-based synchronization using monotonic versioning and last-write-wins (LWW) conflict resolution.
  - Zero-blocking client operations: clients write locally instantly and sync lazily in the background.

- **⏰ Automated Reminder Scheduling**:
  - Distributed job queue powered by **BullMQ** and **Redis**.
  - Recurring calculation worker dynamically evaluates timezone offsets and next due dates.
  - Supports Web Push (RFC 8291 / RFC 8292), Apple Push Notification service (APNs), and Firebase Cloud Messaging (FCM).

- **🔐 Robust Identity & Session Management**:
  - Backed by **Better-Auth** supporting email/password, magic links, and OAuth2 providers.
  - HttpOnly secure cookies, CSRF protection, and cryptographically signed session tokens.
  - Granular Role-Based Access Control (`user`, `operator`, `admin`).

- **🛡️ Enterprise-Grade Telemetry & Reliability**:
  - Request logging with correlation IDs via Pino.
  - Rate limiting, brute-force protection, and input validation using strict Zod schemas.
  - Healthcheck probes (`/health`, `/metrics`) ready for Kubernetes and container environments.

---

## 🗂️ Directory Structure

```text
server/
├── src/
│   ├── config/             # Zod-validated environment and system settings
│   ├── db/                 # Database connection pools, migrations, and seeds
│   ├── middlewares/        # Authentication, RBAC, logging, CORS, and rate limiting
│   ├── modules/
│   │   ├── auth/           # Better-Auth integration and user credential handlers
│   │   ├── tasks/          # Recurring tasks CRUD and completion logs
│   │   ├── sync/           # Diff synchronization and conflict resolution logic
│   │   ├── reminders/      # Queue scheduling and push dispatchers
│   │   ├── admin/          # Privileged endpoints for admin-portal
│   │   └── telemetry/      # System statistics and anonymized usage metrics
│   ├── workers/            # BullMQ background workers for notification dispatch
│   ├── types/              # Domain interfaces and request/response DTOs
│   └── index.ts            # Server entrypoint and route mounting
├── tests/                  # Unit and integration test suites
├── .env.example            # Environment variables template
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 🗄️ Database Schema & Models

### Task Entity (`tasks`)
| Column / Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `VARCHAR(64)` (PK) | Unique task identifier |
| `userId` | `VARCHAR(64)` (FK) | Owner account ID |
| `title` | `VARCHAR(255)` | Task title |
| `description` | `TEXT` | Optional notes or instructions |
| `category` | `VARCHAR(64)` | Category (e.g. `Home`, `Devices`, `Garden`) |
| `intervalValue` | `INTEGER` | Numeric frequency value |
| `intervalUnit` | `VARCHAR(16)` | `days`, `weeks`, `months`, `years` |
| `lastCompletedAt` | `DATE` | ISO string of most recent completion |
| `nextDueAt` | `DATE` | Computed next due date |
| `reminderEnabled`| `BOOLEAN` | Whether push reminders are active |
| `version` | `BIGINT` | Monotonic sync version counter |
| `updatedAt` | `TIMESTAMP` | Last updated timestamp |
| `archivedAt` | `TIMESTAMP` | Soft-deletion indicator |

### Completion History (`task_history`)
| Column / Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `VARCHAR(64)` (PK) | Unique completion event ID |
| `taskId` | `VARCHAR(64)` (FK) | Reference to parent task |
| `completedAt` | `DATE` | Date key of completion (`YYYY-MM-DD`) |
| `createdAt` | `TIMESTAMP` | Exact record creation timestamp |

---

## 🔄 Sync Engine Protocol

The client-server sync operates via two atomic endpoints:

1. **`POST /api/sync/pull`**:
   - Client sends its `lastSyncedVersion`.
   - Server returns all task records updated since that version, plus server timestamp.
2. **`POST /api/sync/push`**:
   - Client sends pending locally created, updated, or archived task changes.
   - Server validates, persists updates, increments task versions, and triggers reminder schedule updates.

---

## 📡 API Reference

All responses follow the standardized payload structure:
```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

### Authentication (`/api/auth`)
- `POST /api/auth/sign-up/email` — Register new user account.
- `POST /api/auth/sign-in/email` — Authenticate and receive session cookie.
- `POST /api/auth/sign-out` — Terminate current session.
- `GET  /api/auth/get-session` — Inspect active user session.

### Tasks & Sync (`/api/tasks`)
- `GET    /api/tasks` — List active user tasks.
- `POST   /api/tasks` — Create a new recurring task.
- `PATCH  /api/tasks/:id` — Update task details or interval settings.
- `POST   /api/tasks/:id/complete` — Mark task as completed today and compute next due date.
- `DELETE /api/tasks/:id` — Archive or permanently remove task.
- `POST   /api/sync/pull` — Retrieve incremental delta changes.
- `POST   /api/sync/push` — Submit client mutations.

### Notifications & Reminders (`/api/reminders`)
- `POST /api/reminders/register-device` — Save Web Push / FCM / APNs subscription token.
- `DELETE /api/reminders/devices/:token` — Unregister device token.

### Health & Admin (`/api/admin`)
- `GET /health` — Service readiness probe.
- `GET /api/admin/metrics` — Aggregate metrics for `admin-portal`.

---

## ⚙️ Environment Configuration

Create a `.env` file in `server/`:

```bash
cp .env.example .env
```

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | HTTP port the server listens on | `8080` |
| `NODE_ENV` | Environment mode (`development`, `production`) | `development` |
| `DATABASE_URL` | PostgreSQL connection string or MongoDB URI | `postgresql://user:pass@localhost:5432/again_db` |
| `REDIS_URL` | Redis instance for BullMQ workers and caching | `redis://localhost:6379` |
| `BETTER_AUTH_SECRET` | Cryptographic secret for signing sessions | `generate with: openssl rand -base64 32` |
| `TRUSTED_ORIGINS` | Comma-separated list of allowed client origins | `http://localhost:3000,http://localhost:3001` |
| `VAPID_PUBLIC_KEY` | Web Push VAPID public key | `BN45...` |
| `VAPID_PRIVATE_KEY` | Web Push VAPID private key | `xK92...` |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 20.9+** or **22 LTS**
- **pnpm 11+**
- **Redis** (running locally or in Docker: `docker run -p 6379:6379 redis:alpine`)
- **PostgreSQL / MongoDB**

### 1. Install Dependencies

```bash
cd server
pnpm install
```

### 2. Run Database Migrations

```bash
pnpm db:migrate
```

### 3. Start Development Server & Worker

```bash
# Starts the API server with hot-reload
pnpm dev

# (Optional) Run the background reminder worker concurrently
pnpm worker:dev
```

The API will be available at [http://localhost:8080](http://localhost:8080).

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts server in watch mode with `tsx` |
| `pnpm build` | Compiles TypeScript to `dist/` |
| `pnpm start` | Runs compiled production server |
| `pnpm worker` | Starts the BullMQ reminder queue worker |
| `pnpm test` | Executes unit and integration test suites |
| `pnpm lint` | Runs ESLint |

---

## 🐳 Deployment & Production

### Containerization with Docker

```bash
# Build the production image
docker build -t again-server:latest .

# Run container
docker run -p 8080:8080 --env-file .env.production again-server:latest
```

---

## 📄 License

This package is licensed under the **MIT License**.
