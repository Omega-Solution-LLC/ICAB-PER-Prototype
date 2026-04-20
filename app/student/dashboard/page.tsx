"use client";

import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StudentBanner } from '@/components/shared/student-banner';
import { PillarProgressCard } from '@/components/shared/pillar-progress-card';
import { StatCard } from '@/components/shared/stat-card';
import { ActivityFeed } from '@/components/student/activity-feed';
import { SectionCard } from '@/components/shared/section-card';
import { useStudentData } from '@/hooks/use-student-data';
import { Briefcase, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { InfoRow } from '@/components/shared/info-row';

export default function StudentDashboard() {
  const { student, practicalPeriods, technicalModules, ethicsScenarios } = useStudentData();

  if (!student) return null;

  // Calculate stats
  const totalPWE = practicalPeriods
    .filter(p => p.status === 'approved')
    .reduce((sum, p) => sum + p.daysWorked, 0);
    
  const modulesPassed = technicalModules.filter(m => m.status === 'completed').length;
  const ethicsPassed = ethicsScenarios.filter(e => e.status === 'approved').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Dashboard" 
        subtitle={`Welcome back, ${student.name.split(' ')[0]}`} 
      />
      
      <StudentBanner student={student} principalName="M. Hasan FCA" />

      <div className="grid md:grid-cols-3 gap-6">
        <PillarProgressCard 
          title="Phase 1: Practical Experience" 
          description="Log your 6-monthly PWE" 
          value={(totalPWE / 450) * 100}
          progressLabel={`${totalPWE}`}
          progressSublabel="Days Logged"
          href="/student/practical-experience"
          actionLabel="View Log"
        />
        <PillarProgressCard 
          title="Phase 2: Technical Development" 
          description="Complete your IES 2 modules" 
          value={(modulesPassed / 11) * 100}
          progressLabel={`${modulesPassed} / 11`}
          progressSublabel="Modules Passed"
          href="/student/technical-development"
          actionLabel="View Modules"
        />
        <PillarProgressCard 
          title="Phase 3: Ethics & Professionalism" 
          description="Pillar 3 completion" 
          value={(ethicsPassed / 2) * 100}
          progressLabel={`${ethicsPassed} / 2`}
          progressSublabel="Scenarios Done"
          href="/student/ethics-training"
          actionLabel="View Details"
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Approved PWE Days" value={totalPWE} icon={Briefcase} trend="Target: 450" />
        <StatCard label="Days Remaining" value={Math.max(0, 450 - totalPWE)} icon={Clock} variant="warning" />
        <StatCard label="Modules Complete" value={modulesPassed} icon={BookOpen} trend="Out of 11 modules" />
        <StatCard label="Ethics Scenarios" value={ethicsPassed} icon={CheckCircle} trend="Approved scenarios" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <ActivityFeed />
        <SectionCard title="Upcoming Deadlines" description="Stay on track with your PER">
          <div className="space-y-2">
            <InfoRow label="Year 1 H2 Log Submission" value="Jul 31, 2026" icon={Clock} />
            <InfoRow label="Strategic Business Management Exam" value="Aug 15, 2026" icon={BookOpen} />
            <InfoRow label="Ethics Application Check" value="Dec 31, 2026" icon={CheckCircle} />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
