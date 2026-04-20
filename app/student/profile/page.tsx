"use client";

import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '@/components/shared/section-card';
import { InfoRow } from '@/components/shared/info-row';
import { Button } from '@/components/ui/button';
import { useStudentData } from '@/hooks/use-student-data';
import { toast } from 'sonner';

export default function StudentProfile() {
  const { student } = useStudentData();

  if (!student) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <PageHeader 
        title="My Profile" 
        subtitle="Manage your personal and contract information"
        action={
          <Button onClick={() => toast.info("Update request sent to ICAB admin.")} variant="outline" className="text-icab-red border-icab-red hover:bg-icab-blush">
            Request Update
          </Button>
        }
      />

      <SectionCard title="Personal Information">
        <InfoRow label="Full Name" value={student.name} />
        <InfoRow label="Email Address" value={student.email} />
        <InfoRow label="Phone Number" value="+880 1711-223344" />
      </SectionCard>

      <SectionCard title="Enrollment Details">
        <InfoRow label="Student Registration Number" value={student.studentNumber} />
        <InfoRow label="Enrollment Date" value={student.enrollmentDate} />
        <InfoRow label="Status" value={<span className="text-green-600 font-semibold px-2 py-1 bg-green-50 rounded">Active</span>} />
      </SectionCard>

      <SectionCard title="Firm & Principal">
        <InfoRow label="Accounting Firm" value={student.firmName} />
        <InfoRow label="Principal Name" value="M. Hasan FCA" />
        <InfoRow label="Contract Start Date" value={student.contractStartDate} />
        <InfoRow label="Contract End Date" value={student.contractEndDate} />
      </SectionCard>
    </div>
  );
}
