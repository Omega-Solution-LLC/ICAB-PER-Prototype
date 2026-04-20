import React from 'react';
import { PracticalExperiencePeriod } from '@/types';
import { ColumnDef } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Edit, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface PracticalPeriodColumnsProps {
  onEdit: (period: PracticalExperiencePeriod) => void;
  onViewFeedback: (period: PracticalExperiencePeriod) => void;
}

export function buildPracticalPeriodColumns({ onEdit, onViewFeedback }: PracticalPeriodColumnsProps): ColumnDef<PracticalExperiencePeriod>[] {
  return [
    {
      id: 'label',
      header: 'Period',
      accessorKey: 'label',
      className: 'font-semibold',
    },
    {
      id: 'dates',
      header: 'Dates',
      cell: (row) => `${format(new Date(row.startDate), 'MMM yyyy')} - ${format(new Date(row.endDate), 'MMM yyyy')}`,
    },
    {
      id: 'daysWorked',
      header: 'Days Worked',
      accessorKey: 'daysWorked',
      className: 'font-medium',
    },
    {
      id: 'stat',
      header: 'Stat Audit',
      accessorKey: 'daysStatAudit',
    },
    {
      id: 'other',
      header: 'Other Audit',
      accessorKey: 'daysOtherAudit',
    },
    {
      id: 'nonAudit',
      header: 'Non-Audit',
      accessorKey: 'daysNonAudit',
    },
    {
      id: 'status',
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (row) => {
        const isLocked = row.status === 'approved' || row.status === 'submitted' || row.status === 'assessment-pending';
        return (
          <div className="flex items-center gap-1 justify-end">
            {row.principalFeedback && (
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onViewFeedback(row); }} title="View Feedback" className="h-8 w-8 p-0 text-icab-rose hover:text-icab-red hover:bg-icab-blush/50">
                <MessageSquare className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); onEdit(row); }} 
              disabled={isLocked}
              className="h-8 shadow-sm"
            >
              <Edit className="h-3.5 w-3.5 mr-1.5" />
              Edit
            </Button>
          </div>
        );
      },
      className: 'text-right pr-4'
    },
  ];
}
