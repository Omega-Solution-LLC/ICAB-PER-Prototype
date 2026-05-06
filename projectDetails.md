# Project Details: ICAB PER Prototype

## Overview
**Name:** ICAB-PER-Prototype  
**Description:** A high-fidelity, interactive, **frontend-only** prototype of the Institute of Chartered Accountants of Bangladesh (ICAB) Professional Experience Record (PER) system. It demonstrates the complete workflow for students and principals (admins), entirely powered by in-memory demo data. 
**Development Status:** Prototype (No real backend or database. Data is stored in memory and `sessionStorage`, resetting on page refresh).

## Technology Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & custom ICAB palette
- **UI Components:** shadcn/ui & `@base-ui/react` primitives
- **Forms & Validation:** `react-hook-form` + `zod`
- **Data Visualization:** `recharts`
- **Icons:** `lucide-react`
- **State Management:** React Context (`auth-context`, `data-context`) and custom hooks.
- **Package Manager:** `pnpm`

## Architecture & Project Structure
The repository is split into features and shared UI primitives, following a strict component-based architecture:
- `app/`: Next.js App Router providing routing for the application. Separated into `app/admin/`, `app/student/`, and `app/login/`.
- `components/shared/`: Reusable UI primitives (e.g., `DataTable`, `PageHeader`, `FormField`, `StatusBadge`). Pages run thin by orchestrating these components.
- `components/admin/` & `components/student/`: Specific modular components tied closely to the respective user roles.
- `contexts/` & `hooks/`: Hold the in-memory application state and role-specific data selectors (`auth-context.tsx`, `use-student-data.ts`, etc.).
- `types/index.ts`: Strongly typed core data models (`Student`, `Principal`, `PracticalExperiencePeriod`, `SkillRecord`, `EthicsApplication`, etc.).

## Key Features & User Roles

### Role: Student (Trainee CA)
- **Dashboard:** Activity feeds, upcoming deadlines, and live progress rings per learning pillar.
- **Practical Experience:** Add/edit six-monthly Practical Work Experience (PWE) logs and view principal feedback.
- **Technical Development:** IES 2 module grid and assessment booking.
- **Skills & IT:** IES 3 skill entries through guided STAR-format forms.
- **Ethics Training:** Training module tracking and multi-step ethics scenarios/applications.
- **Profile:** Personal and firm details view.

### Role: Admin / Principal (Supervisor)
- **Dashboard:** Supervisor stats, approval velocity tracking, pillar completion charts, and live queue previews.
- **Student Overview:** Unified searchable directory of supervised students. Detailed view allowing tabbed review of all five progression pillars.
- **Approval Queue:** Centralized hub to approve or request changes across Practical, Skills, and Ethics submissions.
- **Reports:** Visualization of aggregate program metrics (practical completion, pipeline funnel, etc.).

## Getting Started
It is a purely frontend-driven project running locally for demonstration purposes:
```bash
pnpm install
pnpm dev
```
Accessible at `http://localhost:3000`. Mock credentials can be auto-filled from the login screen (e.g., `student@icab.org.bd` and `principal@icab.org.bd`).