"use client";

import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '@/components/shared/section-card';
import { InfoRow } from '@/components/shared/info-row';
import { Button } from '@/components/ui/button';
import { useAdminData } from '@/hooks/use-admin-data';
import { toast } from 'sonner';

export default function AdminProfile() {
  const { principal } = useAdminData();

  if (!principal) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <PageHeader 
        title="My Profile" 
        subtitle="Manage your personal and firm information"
        action={
          <Button onClick={() => toast.info("Update request sent to ICAB admin.")} variant="outline" className="text-icab-red border-icab-red hover:bg-icab-blush">
            Request Update
          </Button>
        }
      />

      <SectionCard title="Personal Information">
        <InfoRow label="Full Name" value={principal.name} />
        <InfoRow label="Email Address" value={principal.email} />
        <InfoRow label="Phone Number" value="+880 1711-556677" />
      </SectionCard>

      <SectionCard title="Firm & Designation">
        <InfoRow label="Accounting Firm" value={principal.firmName || "N/A"} />
        <InfoRow label="Designation" value={principal.designation || "N/A"} />
        <InfoRow label="Status" value={<span className="text-green-600 font-semibold px-2 py-1 bg-green-50 rounded">Active Supervisor</span>} />
      </SectionCard>
    </div>
  );
}
