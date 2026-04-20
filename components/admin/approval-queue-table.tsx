import React, { useState } from 'react';
import { DataTable, ColumnDef } from '../shared/data-table';
import { StatusBadge } from '../shared/status-badge';
import { useAdminData } from '@/hooks/use-admin-data';
import { format } from 'date-fns';
import { ApprovalDetailSheet } from './approval-detail-sheet';
import { ApprovalPreviewRow } from './approvals-preview-table';

export function ApprovalQueueTable() {
  const { allPracticalPeriods, allSkillRecords, allEthicsScenarios, students } = useAdminData();
  const [selectedRecord, setSelectedRecord] = useState<ApprovalPreviewRow | null>(null);

  // Combine — include submitted (new) and changes-requested (awaiting student revision)
  const combined = [
    ...allPracticalPeriods.map(p => ({ ...p, type: 'Practical Experience', date: p.submittedAt || new Date().toISOString() })),
    ...allSkillRecords.map(s => ({ ...s, type: 'Skill Record', date: s.submittedAt || new Date().toISOString() })),
    ...allEthicsScenarios.map(s => ({ ...s, type: 'Ethics Scenario', date: s.submittedAt || new Date().toISOString() }))
  ].filter(r => r.status === 'submitted' || r.status === 'changes-requested')
   .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
        data={combined} 
        onRowClick={(row) => setSelectedRecord(row as ApprovalPreviewRow)}
      />
      
      <ApprovalDetailSheet 
        record={selectedRecord} 
        onOpenChange={(open: boolean) => !open && setSelectedRecord(null)} 
      />
    </>
  );
}
