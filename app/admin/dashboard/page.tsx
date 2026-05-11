"use client";

import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '@/components/shared/section-card';
import { StatCard } from '@/components/shared/stat-card';
import { ChartCard } from '@/components/shared/chart-card';
import { useAdminData } from '@/hooks/use-admin-data';
import { Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { ApprovalsPreviewTable } from '@/components/admin/approvals-preview-table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { principal, students, allPracticalPeriods, allTechnicalModules, allSkillRecords, allEthicsModules, allEthicsApplications } = useAdminData();

  const submittedApprovalsCount =
    allPracticalPeriods.filter(p => p.status === 'submitted').length +
    allTechnicalModules.filter(m => m.status === 'submitted').length +
    allSkillRecords.filter(s => s.status === 'submitted').length +
    allEthicsModules.filter(m => m.status === 'submitted').length +
    allEthicsApplications.filter(s => s.status === 'submitted').length;

  const feedbackApprovalsCount =
    allPracticalPeriods.filter(p => p.status === 'changes-requested').length +
    allTechnicalModules.filter(m => m.status === 'changes-requested').length +
    allSkillRecords.filter(s => s.status === 'changes-requested').length +
    allEthicsModules.filter(m => m.status === 'changes-requested').length +
    allEthicsApplications.filter(s => s.status === 'changes-requested').length;

  const approvedApprovalsCount =
    allPracticalPeriods.filter(p => p.status === 'approved').length +
    allTechnicalModules.filter(m => m.status === 'approved').length +
    allSkillRecords.filter(s => s.status === 'approved').length +
    allEthicsModules.filter(m => m.status === 'approved').length +
    allEthicsApplications.filter(s => s.status === 'approved').length;

  const isPending = (status: string) => status === 'submitted' || status === 'changes-requested';

  const submissionDates = [
    ...allPracticalPeriods.map(p => p.submittedAt).filter(Boolean),
    ...allTechnicalModules.map(m => m.lastAttemptAt).filter(Boolean),
    ...allSkillRecords.map(s => s.submittedAt).filter(Boolean),
    ...allEthicsModules.map(m => m.lastAttemptAt).filter(Boolean),
    ...allEthicsApplications.map(a => a.submittedAt).filter(Boolean),
  ] as string[];

  const submissionsByMonth = submissionDates.reduce<Record<string, number>>((acc, date) => {
    const monthKey = format(new Date(date), 'yyyy-MM');
    acc[monthKey] = (acc[monthKey] || 0) + 1;
    return acc;
  }, {});

  const monthKeys = Object.keys(submissionsByMonth)
    .sort((a, b) => new Date(`${a}-01`).getTime() - new Date(`${b}-01`).getTime())
    .slice(-5);

  const lineChartData = monthKeys.map(key => ({
    month: format(new Date(`${key}-01`), 'MMM'),
    approvals: submissionsByMonth[key]
  }));

  const barChartData = [
    {
      name: 'Work Exp',
      completed: allPracticalPeriods.filter(p => p.status === 'approved').length,
      pending: allPracticalPeriods.filter(p => isPending(p.status)).length
    },
    {
      name: 'Technical',
      completed: allTechnicalModules.filter(m => m.status === 'approved').length,
      pending: allTechnicalModules.filter(m => isPending(m.status)).length
    },
    {
      name: 'Skills',
      completed: allSkillRecords.filter(s => s.status === 'approved').length,
      pending: allSkillRecords.filter(s => isPending(s.status)).length
    },
    {
      name: 'Ethics',
      completed:
        allEthicsModules.filter(m => m.status === 'approved').length +
        allEthicsApplications.filter(a => a.status === 'approved').length,
      pending:
        allEthicsModules.filter(m => isPending(m.status)).length +
        allEthicsApplications.filter(a => isPending(a.status)).length
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Principal Dashboard" 
        subtitle={`Welcome back, ${principal?.name}`} 
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Supervised" value={students.length} icon={Users} trend="Active students" />
        <StatCard label="Submitted" value={submittedApprovalsCount} icon={Clock} variant={submittedApprovalsCount > 0 ? "warning" : "default"} />
        <StatCard label="Changes Requested" value={feedbackApprovalsCount} icon={AlertTriangle} variant={feedbackApprovalsCount > 0 ? "warning" : "default"} />
        <StatCard label="Approved" value={approvedApprovalsCount} icon={CheckCircle} variant={approvedApprovalsCount > 0 ? "success" : "default"} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Submission Volume" subtitle="Student submissions across pillars">
          <div className="h-[280px] w-full pt-4 pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="approvals" stroke="#9e0b0f" strokeWidth={3} dot={{ r: 4, fill: '#9e0b0f' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Pillar Completion Status" subtitle="Aggregate student progress">
          <div className="h-[280px] w-full pt-4 pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '10px', fontSize: '12px'}} />
                <Bar dataKey="completed" stackId="a" fill="#16a34a" name="Approved/Completed" radius={[0, 0, 4, 4]} />
                <Bar dataKey="pending" stackId="a" fill="#d18a8c" name="Pending Review" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <SectionCard title="Recent Pending Approvals" description="Records awaiting your review" contentClassName="p-0 sm:p-0">
        <ApprovalsPreviewTable />
      </SectionCard>
    </div>
  );
}
