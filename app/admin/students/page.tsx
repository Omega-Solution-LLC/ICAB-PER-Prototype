"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SearchableFilterBar } from '@/components/shared/searchable-filter-bar';
import { StudentsTable } from '@/components/admin/students-table';
import { useAdminData } from '@/hooks/use-admin-data';

export default function StudentsOverviewPage() {
  const { students } = useAdminData();
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredStudents = students.filter(s => {
    // Demo mocking: everyone is 'active' anyway
    const matchesSearch = s.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                          s.studentNumber.toLowerCase().includes(searchValue.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Students Overview" 
        subtitle="Monitor progress and manage all your supervised students" 
      />

      <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
        <SearchableFilterBar 
          searchPlaceholder="Search by name or ID..."
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          filters={[
            {
              id: 'status',
              placeholder: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'Active', value: 'active' },
                { label: 'At Risk', value: 'at-risk' },
                { label: 'Transferred', value: 'transferred' },
              ]
            }
          ]}
        />
        
        <StudentsTable data={filteredStudents} />
      </div>
    </div>
  );
}
