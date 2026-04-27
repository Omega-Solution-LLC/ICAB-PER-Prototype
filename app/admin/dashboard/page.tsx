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

export default function AdminDashboard() {
  const { principal, students, allPracticalPeriods, allSkillRecords, allEthicsApplications } = useAdminData();

  const pendingApprovalsCount = 
    allPracticalPeriods.filter(p => p.status === 'submitted').length +
    allSkillRecords.filter(s => s.status === 'submitted').length +
    allEthicsApplications.filter(s => s.status === 'submitted').length;

  const lineChartData = [
    { month: 'Jan', approvals: 12 },
    { month: 'Feb', approvals: 19 },
    { month: 'Mar', approvals: 15 },
    { month: 'Apr', approvals: 25 },
    { month: 'May', approvals: 8 },
  ];

  const barChartData = [
    { name: 'Work Exp', completed: 45, pending: 12 },
    { name: 'Technical', completed: 60, pending: 0 },
    { name: 'Skills', completed: 20, pending: 15 },
    { name: 'Ethics', completed: 30, pending: 5 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Principal Dashboard" 
        subtitle={`Welcome back, ${principal?.name}`} 
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Supervised" value={students.length} icon={Users} trend="Active students" />
        <StatCard label="Pending Approvals" value={pendingApprovalsCount} icon={Clock} variant={pendingApprovalsCount > 0 ? "warning" : "default"} />
        <StatCard label="Approvals This Month" value={8} icon={CheckCircle} trend="+2 from last month" />
        <StatCard label="Students At Risk" value={0} icon={AlertTriangle} variant="success" trend="No action needed" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Approval Velocity" subtitle="Submissions approved over time">
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
