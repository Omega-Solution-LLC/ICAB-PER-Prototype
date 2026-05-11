import React, { useState } from 'react';
import { DataTable, ColumnDef } from '../shared/data-table';
import { StatusBadge } from '../shared/status-badge';
import { useAdminData } from '@/hooks/use-admin-data';
import { format } from 'date-fns';
import { ApprovalDetailSheet } from './approval-detail-sheet';
import { ApprovalPreviewRow } from './approvals-preview-table';

export type ApprovalQueueFilters = {
  searchValue: string;
  pillarFilter: string;
  statusFilter: string;
};

export function ApprovalQueueTable({ searchValue, pillarFilter, statusFilter }: ApprovalQueueFilters) {
  const { allPracticalPeriods, allTechnicalModules, allSkillRecords, allEthicsModules, allEthicsApplications, students } = useAdminData();
  const [selectedRecord, setSelectedRecord] = useState<ApprovalPreviewRow | null>(null);
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
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const normalizedSearch = searchValue.trim().toLowerCase();
  const filtered = combined.filter((row) => {
    const student = students.find(s => s.id === row.studentId);
    const studentName = student?.name?.toLowerCase() || '';
    const matchesSearch = !normalizedSearch || studentName.includes(normalizedSearch);
    const matchesPillar = pillarFilter === 'all' || row.recordKind === pillarFilter;
    const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
    return matchesSearch && matchesPillar && matchesStatus;
  });

  const columns: ColumnDef<ApprovalPreviewRow>[] = [
    {
      id: 'date',
      header: 'Submitted',
      cell: (row) => <span className="text-slate-600">{format(new Date(row.date as string), 'MMM d, yyyy')}</span>
    },
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
      header: 'Record Type',
      cell: (row) => row.type
    },
    {
      id: 'label',
      header: 'Details',
      cell: (row) => <span className="text-slate-600 truncate max-w-[250px] inline-block">{row.label || row.periodLabel}</span>
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <>
      <DataTable 
        columns={columns} 
        data={filtered} 
        onRowClick={(row) => setSelectedRecord(row as ApprovalPreviewRow)}
      />
      
      <ApprovalDetailSheet 
        record={selectedRecord} 
        onOpenChange={(open: boolean) => !open && setSelectedRecord(null)} 
      />
    </>
  );
}
