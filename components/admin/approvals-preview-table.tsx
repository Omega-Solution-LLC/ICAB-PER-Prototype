import React from 'react';
import { DataTable } from '../shared/data-table';
import { ColumnDef } from '../shared/data-table';
import { StatusBadge } from '../shared/status-badge';
import { RecordStatus } from '@/types';
import { useAdminData } from '@/hooks/use-admin-data';
import Link from 'next/link';

export type ApprovalRecordKind = 'practical' | 'technical' | 'skills' | 'ethics-training' | 'ethics-application';

export type ApprovalPreviewRow = {
  studentId: string;
  recordKind: ApprovalRecordKind;
  type: string;
  label?: string;
  periodLabel?: string;
  status: RecordStatus;
  date?: string;
  feedback?: string;
  [key: string]: unknown;
};

export function ApprovalsPreviewTable() {
  const { allPracticalPeriods, allTechnicalModules, allSkillRecords, allEthicsModules, allEthicsApplications, students } = useAdminData();
  const fallbackStudentId = students[0]?.id;

  // Combine — include submitted (new) and changes-requested (awaiting student revision)
  const combined: ApprovalPreviewRow[] = [
    ...allPracticalPeriods.map(p => ({
      ...p,
      studentId: p.studentId,
      recordKind: 'practical' as const,
      type: 'Work Experience',
      date: p.submittedAt || new Date().toISOString(),
      feedback: p.principalFeedback
    })),
    ...allTechnicalModules.map(m => ({
      ...m,
      studentId: m.studentId || fallbackStudentId || 'unknown',
      recordKind: 'technical' as const,
      type: 'Technical Development',
      label: m.name,
      date: m.lastAttemptAt || new Date().toISOString(),
      feedback: m.employerFeedback
    })),
    ...allSkillRecords.map(s => ({
      ...s,
      studentId: s.studentId,
      recordKind: 'skills' as const,
      type: 'Professional Skill Development',
      date: s.submittedAt || new Date().toISOString(),
      feedback: s.principalFeedback
    })),
    ...allEthicsModules.map(m => ({
      ...m,
      studentId: m.studentId || fallbackStudentId || 'unknown',
      recordKind: 'ethics-training' as const,
      type: 'Ethics Training',
      label: m.name,
      date: m.lastAttemptAt || new Date().toISOString(),
      feedback: m.employerFeedback
    })),
    ...allEthicsApplications.map(s => ({
      ...s,
      studentId: s.studentId,
      recordKind: 'ethics-application' as const,
      type: 'Ethics Application',
      date: s.submittedAt || new Date().toISOString(),
      feedback: s.principalFeedback
    }))
  ].filter(r => r.status === 'submitted' || r.status === 'changes-requested')
   .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const data = combined.slice(0, 5); // Take top 5

  const columns: ColumnDef<ApprovalPreviewRow>[] = [
    {
      id: 'student',
      header: 'Student',
      cell: (row) => {
        const student = students.find(s => s.id === row.studentId);
        return <span className="font-medium text-slate-900">{student?.name || 'Unknown'}</span>;
      }
    },
    {
      id: 'type',
      accessorKey: 'type',
      header: 'Record Type',
    },
    {
      id: 'label',
      header: 'Details',
      cell: (row) => <span className="text-slate-600 truncate max-w-[200px] inline-block">{row.label || row.periodLabel}</span>
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      id: 'actions',
      header: '',
      cell: () => {
         return (
           <Link href="/admin/approvals" className="text-icab-red font-medium hover:text-icab-wine px-3 py-1.5 hover:bg-slate-100 rounded-md text-sm">Review</Link>
         )
      }
    }
  ];

  if (combined.length === 0) {
    return <div className="p-8 text-center text-slate-500 border border-dashed rounded-lg bg-slate-50/50">No pending approvals at this time.</div>;
  }

  return <DataTable columns={columns} data={data} />;
}
