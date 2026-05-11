"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SearchableFilterBar } from '@/components/shared/searchable-filter-bar';
import { ApprovalQueueTable } from '@/components/admin/approval-queue-table';

export default function ApprovalsQueuePage() {
  const [searchValue, setSearchValue] = useState("");
  const [pillarFilter, setPillarFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("submitted");

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Approval Queue" 
        subtitle="Review and process all pending student submissions across all pillars" 
      />

      <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
        <SearchableFilterBar 
          searchPlaceholder="Search approvals by student name..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filters={[
            {
              id: 'pillar',
              placeholder: 'Pillar',
              value: pillarFilter,
              onChange: setPillarFilter,
              options: [
                { label: 'Work Experience', value: 'practical' },
                { label: 'Technical Development', value: 'technical' },
                { label: 'Professional Skill Development', value: 'skills' },
                { label: 'Ethics Training', value: 'ethics-training' },
                { label: 'Ethics Application', value: 'ethics-application' },
              ]
            },
            {
              id: 'status',
              placeholder: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'Submitted', value: 'submitted' },
                { label: 'Changes Requested', value: 'changes-requested' },
                { label: 'Approved', value: 'approved' },
              ]
            }
          ]}
        />
        
        <ApprovalQueueTable 
          searchValue={searchValue}
          pillarFilter={pillarFilter}
          statusFilter={statusFilter}
        />
      </div>
    </div>
  );
}
