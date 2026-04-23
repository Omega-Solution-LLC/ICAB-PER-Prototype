"use client";

import { StudentBanner } from "@/components/shared/student-banner";
import { ActivityFeed } from "@/components/student/activity-feed";
import { useStudentData } from "@/hooks/use-student-data";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ─── Arc Ring ─── */
function ArcProgress({
  value,
  size = 80,
  stroke = 7,
  color = "#e63946",
  trackColor = "#f1f5f9",
  showPercent = false,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  showPercent?: boolean;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(value, 0), 100);
  const dash = (pct / 100) * circ;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{
            transition: "stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)",
          }}
        />
      </svg>
      {showPercent && (
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-sm font-semibold" style={{ color }}>
            {Math.round(pct)}%
          </span>
        </div>
      )}
    </div>
  );
}

function Pill({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest"
      style={{ background: color + "18", color }}>
      {children}
    </span>
  );
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(value, 100)}%`, backgroundColor: color }}
      />
    </div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[8px] uppercase tracking-wider font-semibold text-slate-500 mb-0.5">
      {children}
    </p>
  );
}

function Card({
  children,
  className = "",
  style = {},
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accent?: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden relative ${className}`}
      style={style}>
      {children}
    </div>
  );
}

function DotGrid({ color }: { color: string }) {
  return (
    <div
      className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: "6px 6px",
      }}
    />
  );
}

export function DashboardSidebar() {
  const { student, practicalPeriods, technicalModules, ethicsScenarios } =
    useStudentData();
  if (!student) return null;

  const totalPWE = practicalPeriods
    .filter((p) => p.status === "approved")
    .reduce((sum, p) => sum + p.daysWorked, 0);
  const modulesPassed = technicalModules.filter(
    (m) => m.status === "completed",
  ).length;
  const ethicsPassed = ethicsScenarios.filter(
    (e) => e.status === "approved",
  ).length;

  const pwePct = Math.min((totalPWE / 450) * 100, 100);
  const modPct = Math.min((modulesPassed / 11) * 100, 100);
  const ethPct = Math.min((ethicsPassed / 2) * 100, 100);
  const daysLeft = Math.max(0, 450 - totalPWE);

  return (
    <div className="space-y-3 min-h-screen">
      <StudentBanner student={student} principalName="M. Hasan FCA" />

      {/* ══ ROW 1: Hero PWE (2/3) + Days Left (1/3) ══ */}
      <div className="grid grid-cols-3 gap-3">
        <Card
          className="col-span-2 p-4 relative"
          accent="var(--color-icab-red)">
          <DotGrid color="#e63946" />
          <div>
            <Kicker>Phase 1 · Practical Experience</Kicker>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-semibold text-slate-900">
                {totalPWE}
              </span>
              <span className="text-sm text-slate-600 font-normal">
                / 450 days
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              approved PWE days logged
            </p>
          </div>
        </Card>

        <Card
          className="p-4 flex flex-col justify-center"
          accent="var(--color-icab-red)">
          <div>
            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center mb-2">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <Kicker>Days Left</Kicker>
            <div className="text-3xl font-semibold text-slate-900 mt-1">
              {daysLeft}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">to hit 450 target</p>
          </div>
        </Card>
      </div>

      {/* ══ ROW 2: Technical + Ethics + stacked mini-stats ══ */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4" accent="var(--color-icab-red)">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <Pill color="var(--color-icab-red)">Phase 2</Pill>
          </div>
          <Kicker>Technical Dev</Kicker>
          <div className="text-2xl font-semibold text-slate-900 mb-3">
            {modulesPassed}
            <span className="text-sm font-normal text-slate-600"> /11</span>
          </div>
          <p className="text-xs text-slate-600 mb-4">modules completed</p>
          <div className="flex justify-center">
            <ArcProgress
              value={modPct}
              size={60}
              color="var(--color-icab-red)"
              showPercent={true}
            />
          </div>
        </Card>

        <Card className="p-4" accent="var(--color-icab-red)">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <Pill color="var(--color-icab-red)">Phase 3</Pill>
          </div>
          <Kicker>Ethics & Prof.</Kicker>
          <div className="text-2xl font-semibold text-slate-900 mb-3">
            {ethicsPassed}
            <span className="text-sm font-normal text-slate-600"> /2</span>
          </div>
          <p className="text-xs text-slate-600 mb-4">scenarios completed</p>
          <div className="flex justify-center">
            <ArcProgress
              value={ethPct}
              size={60}
              color="var(--color-icab-red)"
              showPercent={true}
            />
          </div>
        </Card>

        {/* Stacked mini stat chips */}
        <div className="flex flex-col gap-2">
          <Card
            className="p-3 flex items-center gap-2"
            accent="var(--color-icab-red)">
            <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <Award className="w-3 h-3 text-slate-600" />
            </div>
            <div>
              <Kicker>Modules</Kicker>
              <div className="text-lg font-semibold text-slate-900">
                {modulesPassed}
              </div>
            </div>
          </Card>
          <Card
            className="p-3 flex items-center gap-2"
            accent="var(--color-icab-red)">
            <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <Zap className="w-3 h-3 text-slate-600" />
            </div>
            <div>
              <Kicker>Ethics</Kicker>
              <div className="text-lg font-semibold text-slate-900">
                {ethicsPassed}
              </div>
            </div>
          </Card>
          <Card
            className="p-3 flex items-center gap-2"
            accent="var(--color-icab-red)">
            <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
              <Briefcase className="w-3 h-3 text-slate-600" />
            </div>
            <div>
              <Kicker>PWE Days</Kicker>
              <div className="text-lg font-semibold text-slate-900">
                {totalPWE}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ══ ROW 3: Deadlines + Overall progress ══ */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4" accent="var(--color-icab-red)">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
              <Target className="w-3 h-3 text-slate-600" />
            </div>
            <Kicker>Upcoming</Kicker>
          </div>
          <div className="space-y-2">
            {[
              { label: "H2 Log Submission", date: "Jul 31" },
              { label: "SBM Exam", date: "Aug 15" },
              { label: "Ethics Check", date: "Dec 31" },
            ].map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-700">{d.label}</span>
                <span className="text-slate-500 font-medium">{d.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-2 p-4" accent="var(--color-icab-red)">
          <Kicker>Overall Progress</Kicker>
          <p className="text-xs text-slate-600 mb-4">
            All three training phases
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Practical Experience",
                value: pwePct,
                points: `${totalPWE} / 450`,
                icon: Briefcase,
              },
              {
                label: "Technical Development",
                value: modPct,
                points: `${modulesPassed} / 11`,
                icon: BookOpen,
              },
              {
                label: "Ethics & Professionalism",
                value: ethPct,
                points: `${ethicsPassed} / 2`,
                icon: CheckCircle,
              },
            ].map((row) => {
              const IconComponent = row.icon;
              return (
                <div
                  key={row.label}
                  className="flex flex-col items-center gap-1">
                  <ArcProgress
                    value={row.value}
                    size={50}
                    stroke={5}
                    color="var(--color-icab-red)"
                    showPercent={true}
                  />
                  <span className="text-[10px] text-slate-700 font-medium text-center leading-tight">
                    {row.points}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ══ ROW 4: Activity Feed ══ */}
      <Card className="p-5" accent="var(--color-icab-red)">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
          </div>
          <Kicker>Recent Activity</Kicker>
        </div>
        <ActivityFeed />
      </Card>
    </div>
  );
}
