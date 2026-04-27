import React from 'react';
import { ReviewTab } from '../shared/review-tab';
import { DataTable, ColumnDef } from '../shared/data-table';
import { StatusBadge } from '../shared/status-badge';
import { ApprovalActions } from '../shared/approval-actions';
import { FeedbackThread } from '../shared/feedback-thread';
import { useAdminData } from '@/hooks/use-admin-data';
import { PracticalExperiencePeriod } from '@/types';
import { toast } from 'sonner';

export function ReviewPracticalTab({ studentId }: { studentId: string }) {
  const { allPracticalPeriods, updatePracticalPeriod } = useAdminData();
  const periods = allPracticalPeriods.filter(p => p.studentId === studentId);

  const handleApprove = async (id: string, feedback: string) => {
    toast.success("Period approved successfully");
    updatePracticalPeriod(id, { status: 'approved', principalFeedback: feedback });
  };

  const handleRequestChanges = async (id: string, feedback: string) => {
    toast.success("Changes requested");
    updatePracticalPeriod(id, { status: 'changes-requested', principalFeedback: feedback });
  };

  const columns: ColumnDef<PracticalExperiencePeriod>[] = [
    { id: 'label', accessorKey: 'label', header: 'Period' },
    {
      id: 'dates',
      header: 'Dates',
      cell: (row) => <span className="text-sm">{row.startDate} to {row.endDate}</span>
    },
    { id: 'daysWorked', accessorKey: 'daysWorked', header: 'Total Days' },
    {
      id: 'auditDays',
      header: 'Audit Days',
      cell: (row) => <span className="text-sm whitespace-nowrap">Stat: {row.daysStatAudit} | Other: {row.daysOtherAudit}</span>
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      id: 'actions',
      header: '',
      cell: (row) => {
        if (row.status === 'submitted' || row.status === 'changes-requested') {
          return (
            <div className="flex justify-end">
              <ApprovalActions
                onApprove={(fb) => handleApprove(row.id, fb)}
                onRequestChanges={(fb) => handleRequestChanges(row.id, fb)}
              />
            </div>
          );
        }
        if (row.status === 'approved') {
          return <span className="text-sm text-slate-400 italic text-right block pr-4">Reviewed</span>;
        }
        return null;
      }
    }
  ];

  // Periods that have feedback to display below the table
  const periodsWithFeedback = periods.filter(p => p.principalFeedback);

  return (
    <ReviewTab title="Work Experience Review" description="Review and approve six-monthly work experience logs.">
      <DataTable columns={columns} data={periods} />

      {periodsWithFeedback.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Feedback Sent</h4>
          {periodsWithFeedback.map(period => (
            <div key={period.id} className="bg-white border rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-800">{period.label}</span>
                <StatusBadge status={period.status} />
              </div>
              <FeedbackThread feedback={period.principalFeedback} date="Previously sent" />
            </div>
          ))}
        </div>
      )}
    </ReviewTab>
  );
}

