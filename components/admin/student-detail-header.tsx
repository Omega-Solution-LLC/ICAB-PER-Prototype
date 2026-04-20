import React from 'react';
import { StudentBanner } from '../shared/student-banner';
import { PillarProgressCard } from '../shared/pillar-progress-card';
import { useAdminData } from '@/hooks/use-admin-data';

export interface StudentDetailHeaderProps {
  studentId: string;
}

export function StudentDetailHeader({ studentId }: StudentDetailHeaderProps) {
  const { students, allPracticalPeriods, allTechnicalModules, allSkillRecords } = useAdminData();
  const student = students.find(s => s.id === studentId);

  if (!student) return null;

  // Practical Experience
  const periods = allPracticalPeriods.filter(p => p.studentId === student.id && p.status === 'approved');
  const totalPWE = periods.reduce((sum, p) => sum + p.daysWorked, 0);
  const practicalPercent = Math.min(100, Math.round((totalPWE / 450) * 100));

  // Technical Modules
  const techCompleted = allTechnicalModules.filter(m => m.status === 'completed').length;
  const techPercent = Math.min(100, Math.round((techCompleted / 11) * 100));

  // Skills
  const skillsApproved = allSkillRecords.filter(s => s.studentId === student.id && s.status === 'approved').length;
  // Let's assume 5 skills required
  const skillsPercent = Math.min(100, Math.round((skillsApproved / 5) * 100));

  return (
    <div className="space-y-6">
      <StudentBanner student={{
        ...student,
      }} />

      <div className="grid md:grid-cols-3 gap-4">
        <PillarProgressCard 
          title="Practical Experience" 
          description={`${totalPWE} of 450 days approved`}
          value={practicalPercent}
          href={`/admin/students/${student.id}?tab=practical`}
          actionLabel="Review records"
        />
        <PillarProgressCard 
          title="Technical Development" 
          description={`${techCompleted} of 11 modules complete`}
          value={techPercent}
          href={`/admin/students/${student.id}?tab=technical`}
          actionLabel="View progress"
        />
        <PillarProgressCard 
          title="Skills Development" 
          description={`${skillsApproved} skill areas approved`}
          value={skillsPercent}
          href={`/admin/students/${student.id}?tab=skills`}
          actionLabel="Review skills"
        />
      </div>
    </div>
  );
}
