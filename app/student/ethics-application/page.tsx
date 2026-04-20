"use client";

import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { AlertBanner } from '@/components/shared/alert-banner';
import { EthicsApplicationForm } from '@/components/student/ethics-application-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function EthicsApplicationPage() {
  const router = useRouter();

  const handleSubmitApplication = async (data: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 1000));
    console.log("Submitted data", data);
    toast.success("Final Ethics Application submitted successfully! Your Principal will review it.");
    router.push('/student/dashboard');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <PageHeader 
        title="Ethics Application" 
        subtitle="Apply for membership by demonstrating your overall ethical competence"
      />

      <AlertBanner variant="success" title="You are eligible to apply">
        You have successfully completed the required Practical Experience (450 days), Technical Modules, and Ethics Scenarios.
      </AlertBanner>

      <EthicsApplicationForm onSubmit={handleSubmitApplication} />
    </div>
  );
}
