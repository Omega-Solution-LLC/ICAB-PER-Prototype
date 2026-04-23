# ICAB PER — Professional Experience Record Prototype

A high-fidelity, interactive, **frontend-only** prototype of the [Institute of Chartered Accountants of Bangladesh (ICAB)](https://www.icab.org.bd/) Professional Experience Record (PER) system. Built to demonstrate the full student and principal workflow to stakeholders — pixel-polished, fully navigable, and powered entirely by in-memory demo data.

> **Prototype status:** No real backend. No database. All data resets on page refresh. Session is held in `sessionStorage` only.

---

## 🚀 Getting Started

**Prerequisites:** Node.js ≥ 18, pnpm ≥ 8.

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/login`.

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Student (Trainee CA)** | `student@icab.org.bd` | `demo1234` |
| **Principal / Supervisor** | `principal@icab.org.bd` | `demo1234` |

Use the **"Demo Credentials"** quick-fill dropdown on the login page to avoid typing.

---

## ✨ Feature Tour

### Student Panel (`/student/…`)

| Page | What it demonstrates |
|---|---|
| **Dashboard** | Live progress rings per pillar, stat cards, upcoming deadlines, activity feed |
| **Practical Experience** | Add/edit six-monthly PWE log entries; sees approval status; feedback thread from principal |
| **Technical Development** | IES 2 module grid; book assessment simulation; annual requirement tracker |
| **Skills & IT** | IES 3 skill entries per area; guided STAR-format question form; status timeline |
| **Ethics Training** | Module checklist; assessment booking; attempt history table; exam-bar warning |
| **Ethics Scenarios** | Multi-step scenario wizard (dilemma → principles → guided questions); timeline with feedback |
| **Profile** | Read-only personal & firm details; request-update toast |

### Admin / Principal Panel (`/admin/…`)

| Page | What it demonstrates |
|---|---|
| **Dashboard** | Supervisory stats; approval velocity line chart; pillar completion bar chart; live approval queue preview |
| **Students Overview** | Filter + search; row click to student detail |
| **Student Detail** | Tabbed review of all five pillars; per-record approve / request-changes with feedback |
| **Approval Queue** | Cross-pillar unified queue; slide-out detail sheet with full record context |
| **Reports** | Four aggregate charts (practical completion, technical progress, ethics compliance, pipeline funnel); simulated export |
| **Profile** | Principal personal & firm details |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + ICAB custom palette |
| Components | shadcn/ui (Base UI primitives) |
| Forms | react-hook-form + zod |
| Charts | recharts |
| Icons | lucide-react |
| Toasts | sonner |
| Package manager | pnpm |

---

## 🧩 Component Architecture

This prototype follows a **strict reusable component architecture** defined in `gemini.md`. Every piece of UI is a composable component — pages are thin orchestrators (~50–120 lines each).

### Shared Primitives (`components/shared/`)

These are app-wide building blocks used across both panels:

| Component | Purpose |
|---|---|
| `<StatusBadge status />` | Single source of truth for all status pills |
| `<StatCard label value icon />` | Dashboard metric tiles |
| `<DataTable columns data />` | Every list view — never a raw `<table>` |
| `<SectionCard title description action />` | Every grouped content block |
| `<PageHeader title subtitle action />` | Every page top |
| `<EmptyState icon title description />` | Every empty list |
| `<FormField name label />` | Every form field — wraps react-hook-form |
| `<ProgressRing value label />` | SVG progress rings on dashboards |
| `<PillarProgressCard />` | Pillar status block (used in both panels) |
| `<StudentBanner student />` | Identity block (used in both panels) |
| `<FeedbackThread items />` | Principal feedback display (both panels) |
| `<GuidedQuestionForm questions />` | Skills & Ethics guided input (both pillars) |
| `<AssessmentBookingDialog />` | Assessment booking (Technical & Ethics) |
| `<ApprovalActions />` | Approve / Request-Changes footer (all admin review tabs) |
| `<ChartCard title />` | Recharts wrapper with consistent header |
| `<AlertBanner variant />` | Info/warning/danger/success alert strips |
| `<Wizard steps />` | Multi-step form (Ethics scenario) |
| `<SearchableFilterBar />` | Search + filter inputs (Students, Approvals) |
| `<ConfirmDialog />` | Destructive-action confirm pattern |
| `<InfoRow label value />` | Read-only label/value pairs |
| `<LoadingSkeleton variant />` | Consistent loading shapes |

**Rule enforced throughout:** if a UI pattern appears in two places → extract to `shared/`. No copy-pasted JSX, ever.

---

## 📁 Folder Structure

```
app/
  layout.tsx              # Root layout — fonts, providers, toaster
  page.tsx                # Redirect → /login
  not-found.tsx           # 404 page
  login/page.tsx          # Login with demo credential picker
  student/
    layout.tsx            # RouteGuard(student) + PanelLayout
    dashboard/page.tsx
    practical-experience/page.tsx
    technical-development/page.tsx
    skills-development/page.tsx
    ethics-training/page.tsx
    ethics-application/page.tsx
    profile/page.tsx
  admin/
    layout.tsx            # RouteGuard(admin) + PanelLayout
    dashboard/page.tsx
    students/page.tsx
    students/[id]/page.tsx
    approvals/page.tsx
    reports/page.tsx
    profile/page.tsx
components/
  ui/                     # shadcn Base UI primitives
  shared/                 # App-wide reusable building blocks (Rule 2)
  student/                # Student-panel compositions
  admin/                  # Admin-panel compositions
lib/
  auth.ts                 # Hardcoded login/session helpers
  demo-data.ts            # Seed data (Bangladesh-realistic names, dates)
  constants.ts            # Palette, nav items, module seeds, status variants
  utils.ts                # cn() and misc helpers
types/
  index.ts                # All TypeScript types
contexts/
  auth-context.tsx        # AuthProvider
  data-context.tsx        # DataProvider (in-memory mutable state)
hooks/
  use-session.ts
  use-student-data.ts
  use-admin-data.ts
```

---

## 🎨 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `icab-red` | `#9e0b0f` | Primary — buttons, headers, accents |
| `icab-wine` | `#a82427` | Hover state for primary |
| `icab-crimson` | `#b44346` | Secondary buttons, active states |
| `icab-clay` | `#bd5b5e` | Charts secondary, submitted status |
| `icab-rose` | `#d18a8c` | Tertiary accents |
| `icab-petal` | `#e0b0b1` | Chips, disabled states |
| `icab-blush` | `#f0d9d9` | Backgrounds, hover tints |
| `icab-slate` | `#4c4c4e` | Body text, secondary headings |

---

## ⚠️ Known Limitations

- **Data resets on refresh** — all mutations are held in React context (`DataContext`). This is intentional for a prototype.
- **No real authentication** — login is a hardcoded credential check. Do not use in production.
- **No API routes** — everything is client-side with seeded demo data.
- **No email / notifications** — toast messages simulate async side-effects.
- PDF generation and ICAB Lab assessment booking are simulated with toasts.

---

## 📚 Credits

- **ICAB** — Institute of Chartered Accountants of Bangladesh ([icab.org.bd](https://www.icab.org.bd/))
- IAESB / IFAC — IES 2, IES 3, IES 4 competency frameworks
- Design system inspired by ICAB's brand identity
- Component architecture based on Atomic Design principles
