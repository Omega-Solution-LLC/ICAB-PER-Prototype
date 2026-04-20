"use client"

import { PageHeader } from "@/components/shared/page-header"
import { ReportExportButton } from "@/components/admin/report-export-button"
import { ChartCard } from "@/components/shared/chart-card"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, FunnelChart, Funnel, LabelList } from "recharts"
import { ICAB_PALETTE } from "@/lib/constants"
import { StatusBadge } from "@/components/shared/status-badge"
import type { RecordStatus } from "@/types"

// Mock Data
const practicalData = [
  { name: 'Year 1', completed: 42, inProgress: 15, notStarted: 10 },
  { name: 'Year 2', completed: 35, inProgress: 20, notStarted: 15 },
  { name: 'Year 3', completed: 25, inProgress: 10, notStarted: 35 },
];

const technicalData = [
  { name: 'Accounting', passed: 45, pending: 12, failed: 8 },
  { name: 'Audit', passed: 30, pending: 20, failed: 5 },
  { name: 'Tax', passed: 25, pending: 15, failed: 10 },
  { name: 'Business', passed: 40, pending: 10, failed: 2 },
];

type EthicsRow = {
  id: string;
  requirement: string;
  rate: string;
  status: RecordStatus;
}

const ethicsData: EthicsRow[] = [
  { id: '1', requirement: 'Learning Modules', rate: '85%', status: 'approved' as RecordStatus },
  { id: '2', requirement: 'Initial Assessment', rate: '72%', status: 'in-progress' as RecordStatus },
  { id: '3', requirement: 'Ethics Scenarios', rate: '60%', status: 'changes-requested' as RecordStatus },
  { id: '4', requirement: 'Final Assessment', rate: '45%', status: 'assessment-pending' as RecordStatus },
];

const ethicsColumns: ColumnDef<EthicsRow>[] = [
  { id: 'requirement', header: 'Requirement', accessorKey: 'requirement' },
  { id: 'rate', header: 'Compliance Rate', accessorKey: 'rate' },
  { id: 'status', header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
];

const pipelineData = [
  { value: 120, name: 'Registered', fill: ICAB_PALETTE.blush },
  { value: 95, name: 'Year 1 Complete', fill: ICAB_PALETTE.petal },
  { value: 65, name: 'Year 2 Complete', fill: ICAB_PALETTE.rose },
  { value: 45, name: 'Year 3 Complete', fill: ICAB_PALETTE.clay },
  { value: 30, name: 'Fully Certified', fill: ICAB_PALETTE.red },
];

export default function ReportsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <PageHeader 
        title="Reports & Analytics" 
        subtitle="Aggregate performance and compliance metrics across all supervised students."
        action={<ReportExportButton />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Practical Experience Completion" subtitle="By training year cohort">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={practicalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar dataKey="completed" name="Completed" stackId="a" fill={ICAB_PALETTE.red} radius={[0, 0, 4, 4]} />
              <Bar dataKey="inProgress" name="In Progress" stackId="a" fill={ICAB_PALETTE.clay} />
              <Bar dataKey="notStarted" name="Not Started" stackId="a" fill={ICAB_PALETTE.petal} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Technical Module Progress" subtitle="Pass/fail distribution by core subject">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={technicalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar dataKey="passed" name="Passed" stackId="a" fill={ICAB_PALETTE.red} radius={[0, 0, 4, 4]} />
              <Bar dataKey="pending" name="Pending" stackId="a" fill={ICAB_PALETTE.rose} />
              <Bar dataKey="failed" name="Failed" stackId="a" fill={ICAB_PALETTE.slate} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        
        <ChartCard title="Pipeline Overview" subtitle="Student progression funnel">
          <ResponsiveContainer width="100%" height={300}>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={pipelineData} isAnimationActive>
                <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Ethics Compliance Overview" subtitle="Aggregate compliance rates for IES 4 requirements">
          <div className="h-[300px] overflow-auto">
            <DataTable 
              columns={ethicsColumns} 
              data={ethicsData} 
              className="border-none shadow-none"
            />
          </div>
        </ChartCard>
      </div>
    </div>
  )
}
