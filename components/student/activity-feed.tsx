"use client";

import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, FileText, Send, BookOpen, Shield } from 'lucide-react';
import { useStudentData } from '@/hooks/use-student-data';

export function ActivityFeed() {
  const { practicalPeriods, technicalModules, skillRecords, ethicsModules, ethicsApplications } = useStudentData();

  const activities: { id: string; title: string; date: Date; icon: any }[] = [];

  // Practical Periods
  practicalPeriods.forEach(p => {
    if (p.submittedAt) {
      activities.push({
        id: `pwe-sub-${p.id}`,
        title: `Submitted Work Experience: ${p.label}`,
        date: new Date(p.submittedAt),
        icon: Send
      });
    }
    if (p.approvedAt && p.status === 'approved') {
      activities.push({
        id: `pwe-app-${p.id}`,
        title: `Principal approved Work Experience: ${p.label}`,
        date: new Date(p.approvedAt),
        icon: CheckCircle2
      });
    }
  });

  // Skill Records
  skillRecords.forEach(s => {
    if (s.submittedAt) {
      activities.push({
        id: `sr-sub-${s.id}`,
        title: `Submitted Skill Record: ${s.periodLabel}`,
        date: new Date(s.submittedAt),
        icon: Send
      });
    }
    // Fallback date calculation for demo purposes if approvedAt is missing
    if (s.status === 'approved' && s.submittedAt) {
        const d = new Date(s.submittedAt);
        d.setDate(d.getDate() + 2);
        activities.push({
          id: `sr-app-${s.id}`,
          title: `Principal approved Skill Record: ${s.periodLabel}`,
          date: d,
          icon: CheckCircle2
        });
    }
  });

  // Technical Modules
  technicalModules.forEach(m => {
    if (m.status === 'completed' && m.lastAttemptAt) {
      activities.push({
        id: `tm-comp-${m.id}`,
        title: `Completed Technical Module: ${m.name}`,
        date: new Date(m.lastAttemptAt),
        icon: BookOpen
      });
    }
  });

  // Ethics Modules
  ethicsModules.forEach(m => {
    if (m.status === 'completed' && m.lastAttemptAt) {
      activities.push({
        id: `em-comp-${m.id}`,
        title: `Completed Ethics Module: ${m.name}`,
        date: new Date(m.lastAttemptAt),
        icon: Shield
      });
    }
  });

  // Ethics Applications
  ethicsApplications.forEach(a => {
    if (a.submittedAt) {
      activities.push({
        id: `ea-sub-${a.id}`,
        title: `Submitted Ethics Application: ${a.periodLabel}`,
        date: new Date(a.submittedAt),
        icon: Send
      });
    }
    if (a.approvedAt && a.status === 'approved') {
      activities.push({
        id: `ea-app-${a.id}`,
        title: `Principal approved Ethics App: ${a.periodLabel}`,
        date: new Date(a.approvedAt),
        icon: CheckCircle2
      });
    }
  });

  // Sort descending by date
  activities.sort((a, b) => b.date.getTime() - a.date.getTime());

  // Take top 5
  const topActivities = activities.slice(0, 5);

  return (
    <div className="space-y-4 mt-2">
      {topActivities.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-4">No recent activity found.</p>
      ) : (
        topActivities.map((a) => (
          <div key={a.id} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
              <a.icon className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 leading-snug">{a.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{format(a.date, 'MMM d, yyyy')}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
