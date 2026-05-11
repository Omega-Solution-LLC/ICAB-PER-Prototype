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
      className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative ${className}`}
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
  const {
    student,
    principalName,
    practicalPeriods,
    technicalModules,
    skillRecords,
    ethicsModules,
    ethicsApplications,
  } = useStudentData();
  if (!student) return null;

  const totalPWE = practicalPeriods
    .filter((p) => p.status === "approved")
    .reduce((sum, p) => sum + p.daysWorked, 0);

  const techModuleNames = Array.from(
    new Set(technicalModules.map((m) => m.name)),
  );
  const modulesApproved = techModuleNames.filter((name) => {
    const records = technicalModules.filter((m) => m.name === name);
    return records.length > 0 && records.every((m) => m.status === "approved");
  }).length;

  const ethicsModuleNames = Array.from(
    new Set(ethicsModules.map((m) => m.name)),
  );
  const ethicsApproved = ethicsModuleNames.filter((name) => {
    const records = ethicsModules.filter((m) => m.name === name);
    return records.length > 0 && records.every((m) => m.status === "approved");
  }).length;

  const approvedSkillAreas = new Set(
    skillRecords
      .filter((record) => record.status === "approved")
      .map((record) => record.skillAreaId),
  );
  const totalSkillAreas = new Set(
    skillRecords.map((record) => record.skillAreaId),
  ).size;

  const approvedEthicsApps = ethicsApplications.filter(
    (app) => app.status === "approved",
  ).length;

  const pwePct = Math.min((totalPWE / 450) * 100, 100);
  const modPct =
    techModuleNames.length > 0
      ? Math.min((modulesApproved / techModuleNames.length) * 100, 100)
      : 0;
  const ethPct =
    ethicsModuleNames.length > 0
      ? Math.min((ethicsApproved / ethicsModuleNames.length) * 100, 100)
      : 0;
  const skillPct =
    totalSkillAreas > 0
      ? Math.min((approvedSkillAreas.size / totalSkillAreas) * 100, 100)
      : 0;
  const ethicsAppPct =
    ethicsApplications.length > 0
      ? Math.min((approvedEthicsApps / ethicsApplications.length) * 100, 100)
      : 0;
  const daysLeft = Math.max(0, 450 - totalPWE);

  return (
    <div className="space-y-5 min-h-screen">
      <StudentBanner student={student} principalName={principalName} />

      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-5">
        <div className="space-y-5">
          {/* ══ Snapshot ══ */}
          <Card className="p-5 relative" accent="var(--color-icab-red)">
            <DotGrid color="#e63946" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <Kicker>Training Snapshot</Kicker>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-semibold text-slate-900">
                    {totalPWE}
                  </span>
                  <span className="text-sm text-slate-600 font-normal">
                    / 450 days
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  approved work experience days
                </p>
              </div>
              <div className="flex gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 min-w-[130px]">
                  <Kicker>Days Left</Kicker>
                  <div className="text-2xl font-semibold text-slate-900 mt-1">
                    {daysLeft}
                  </div>
                  <p className="text-[10px] text-slate-500">to hit 450 target</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 min-w-[130px]">
                  <Kicker>Skills Approved</Kicker>
                  <div className="text-2xl font-semibold text-slate-900 mt-1">
                    {approvedSkillAreas.size}
                  </div>
                  <p className="text-[10px] text-slate-500">IES 3 records</p>
                </div>
              </div>
            </div>
          </Card>

          {/* ══ Pillar Cards ══ */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4" accent="var(--color-icab-red)">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <Kicker>Technical Development</Kicker>
                    <p className="text-xs text-slate-500">IES 2 modules</p>
                  </div>
                </div>
                <Pill color="var(--color-icab-red)">Phase 2</Pill>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-semibold text-slate-900">
                    {modulesApproved}
                    <span className="text-sm font-normal text-slate-600">
                      {techModuleNames.length > 0 ? ` /${techModuleNames.length}` : ""}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">modules approved</p>
                </div>
                <ArcProgress
                  value={modPct}
                  size={64}
                  color="var(--color-icab-red)"
                  showPercent={true}
                />
              </div>
            </Card>

            <Card className="p-4" accent="var(--color-icab-red)">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <Kicker>Ethics Training</Kicker>
                    <p className="text-xs text-slate-500">IES 4 modules</p>
                  </div>
                </div>
                <Pill color="var(--color-icab-red)">Phase 3</Pill>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-semibold text-slate-900">
                    {ethicsApproved}
                    <span className="text-sm font-normal text-slate-600">
                      {ethicsModuleNames.length > 0 ? ` /${ethicsModuleNames.length}` : ""}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">modules approved</p>
                </div>
                <ArcProgress
                  value={ethPct}
                  size={64}
                  color="var(--color-icab-red)"
                  showPercent={true}
                />
              </div>
            </Card>
          </div>

          {/* ══ Overall Progress ══ */}
          <Card className="p-5" accent="var(--color-icab-red)">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Kicker>Overall Progress</Kicker>
                <p className="text-xs text-slate-600">All program components</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Target className="w-4 h-4" />
                <span>Targets are auto-calculated</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Work Experience</span>
                  <span>{totalPWE} / 450 days</span>
                </div>
                <Bar value={pwePct} color="var(--color-icab-red)" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Technical Development</span>
                    <span>
                      {techModuleNames.length > 0
                        ? `${modulesApproved} / ${techModuleNames.length}`
                        : `${modulesApproved}`}
                    </span>
                  </div>
                  <Bar value={modPct} color="#b44346" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Professional Skills</span>
                    <span>
                      {totalSkillAreas > 0
                        ? `${approvedSkillAreas.size} / ${totalSkillAreas}`
                        : `${approvedSkillAreas.size}`}
                    </span>
                  </div>
                  <Bar value={skillPct} color="#a82427" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Ethics Training</span>
                    <span>
                      {ethicsModuleNames.length > 0
                        ? `${ethicsApproved} / ${ethicsModuleNames.length}`
                        : `${ethicsApproved}`}
                    </span>
                  </div>
                  <Bar value={ethPct} color="#9e0b0f" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Ethics Applications</span>
                    <span>
                      {ethicsApplications.length > 0
                        ? `${approvedEthicsApps} / ${ethicsApplications.length}`
                        : `${approvedEthicsApps}`}
                    </span>
                  </div>
                  <Bar value={ethicsAppPct} color="#d18a8c" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ══ Right Rail ══ */}
        <div className="space-y-5">
          <Card className="p-4" accent="var(--color-icab-red)">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <Kicker>Recent Activity</Kicker>
            </div>
            <ActivityFeed />
          </Card>

          <Card className="p-4" accent="var(--color-icab-red)">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <Kicker>Quick Stats</Kicker>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Technical Approved</span>
                  <span>{modulesApproved}</span>
                </div>
                <Bar value={modPct} color="var(--color-icab-red)" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Skills Approved</span>
                  <span>{approvedSkillAreas.size}</span>
                </div>
                <Bar value={skillPct} color="#b44346" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>Ethics Apps Approved</span>
                  <span>{approvedEthicsApps}</span>
                </div>
                <Bar value={ethicsAppPct} color="#d18a8c" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
