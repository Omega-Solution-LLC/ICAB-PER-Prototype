import React from 'react';
import { DataTable } from '../shared/data-table';
import { ColumnDef } from '../shared/data-table';
import { AvatarWithName } from '../shared/avatar-with-name';
import { StudentStatusChip } from './student-status-chip';
import { Student } from '@/types';
import { Progress } from '@/components/ui/progress';
import { useAdminData } from '@/hooks/use-admin-data';
import { useRouter } from 'next/navigation';
import { EmptyState } from '../shared/empty-state';
import { Users } from 'lucide-react';

interface StudentsTableProps {
  data: Student[];
}

export function StudentsTable({ data }: StudentsTableProps) {
  const router = useRouter();
  const { allPracticalPeriods } = useAdminData();

  const columns: ColumnDef<Student>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Student Name',
      cell: (row) => (
        <AvatarWithName 
          name={row.name} 
          role={`ID: ${row.studentNumber}`} 
          avatarUrl={row.avatarUrl} 
        />
      )
    },
    {
      id: 'enrollmentDate',
      accessorKey: 'enrollmentDate',
      header: 'Enrolled',
    },
    {
      id: 'progress',
      header: 'PWE Progress',
      cell: (row) => {
        // Calculate progress just to show *something* 
        const periods = allPracticalPeriods.filter(p => p.studentId === row.id && p.status === 'approved');
        const totalPWE = periods.reduce((sum, p) => sum + p.daysWorked, 0);
        const percent = Math.min(100, (totalPWE / 450) * 100);
        return (
          <div className="flex items-center gap-3">
            <Progress value={percent} className="h-2 w-24" />
            <span className="text-xs text-slate-500 font-medium w-12">{totalPWE} / 450</span>
          </div>
        );
      }
    },
    {
      id: 'status',
      header: 'Status',
      cell: () => {
        // Mocking status logic - if recent enrollment, active
        const status = 'active'; // hardcoded for demo or derived
        return <StudentStatusChip status={status} />;
      }
    }
  ];

  return (
    <DataTable 
      columns={columns} 
      data={data} 
      onRowClick={(row) => router.push(`/admin/students/${row.id}`)}
      emptyState={<EmptyState icon={Users} title="No students found" action={undefined} />}
    />
  );
}
