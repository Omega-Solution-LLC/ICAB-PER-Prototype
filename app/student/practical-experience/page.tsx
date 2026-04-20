"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '@/components/shared/section-card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/shared/data-table';
import { EmptyState } from '@/components/shared/empty-state';
import { Plus, Briefcase, Info } from 'lucide-react';
import { useStudentData } from '@/hooks/use-student-data';
import { PracticalPeriodForm, PracticalPeriodFormData } from '@/components/student/practical-period-form';
import { buildPracticalPeriodColumns } from '@/components/student/practical-period-columns';
import { PracticalSummaryCard } from '@/components/student/practical-summary-card';
import { CriticalAreasBanner } from '@/components/student/critical-areas-banner';
import { PracticalExperiencePeriod } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FeedbackThread } from '@/components/shared/feedback-thread';
import { toast } from 'sonner';

export default function PracticalExperiencePage() {
  const { student, practicalPeriods, addPracticalPeriod, updatePracticalPeriod, principalName, firmName, contractStartDate } = useStudentData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<PracticalExperiencePeriod | undefined>();
  const [feedbackPeriod, setFeedbackPeriod] = useState<PracticalExperiencePeriod | undefined>();

  const handleEdit = (period: PracticalExperiencePeriod) => {
    setEditingPeriod(period);
    setIsFormOpen(true);
  };

  const handleOpenNew = () => {
    setEditingPeriod(undefined);
    setIsFormOpen(true);
  };

  const handleViewFeedback = (period: PracticalExperiencePeriod) => {
    setFeedbackPeriod(period);
  };

  const handleSubmit = async (data: PracticalPeriodFormData) => {
    // simulated latency
    await new Promise(r => setTimeout(r, 600));

    if (data.id) {
      updatePracticalPeriod(data.id, {
        label: data.label,
        startDate: data.startDate,
        endDate: data.endDate,
        daysWorked: data.daysWorked,
        daysStatAudit: data.daysStatAudit,
        daysOtherAudit: data.daysOtherAudit,
        daysNonAudit: data.daysNonAudit,
      });
      toast.success("Period updated successfully!");
    } else {
      if (!student) return;
      addPracticalPeriod({
        studentId: student.id,
        label: data.label,
        startDate: data.startDate,
        endDate: data.endDate,
        daysWorked: data.daysWorked,
        daysStatAudit: data.daysStatAudit,
        daysOtherAudit: data.daysOtherAudit,
        daysNonAudit: data.daysNonAudit,
      });
      toast.success("New practical experience period added!");
    }
  };

  const columns = buildPracticalPeriodColumns({
    onEdit: handleEdit,
    onViewFeedback: handleViewFeedback,
  });

  const totalPWE = practicalPeriods
    .filter(p => p.status === 'approved')
    .reduce((sum, p) => sum + p.daysWorked, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Practical Experience" 
        subtitle="Log your six-monthly PWE records"
        action={
          <Button onClick={handleOpenNew} className="bg-icab-red hover:bg-icab-wine text-white shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Period
          </Button>
        }
      />

      <CriticalAreasBanner />

      <SectionCard 
        title="Work Experience Record" 
        description="View and manage your logged periods"
      >
        <DataTable 
          columns={columns} 
          data={practicalPeriods}
          emptyState={
            <EmptyState 
              icon={Briefcase} 
              title="No periods logged yet" 
              description="Start recording your practical experience by adding a new period."
              action={
                <Button variant="outline" onClick={handleOpenNew} className="mt-2 text-icab-red border-icab-red">
                  <Plus className="mr-2 h-4 w-4" /> Add Period
                </Button>
              }
            />
          }
        />
        <div className="mt-4 flex items-center text-sm text-slate-500">
          <Info className="h-4 w-4 mr-2" />
          Submitted and approved periods cannot be edited. If you need to make changes, request un-submission from your Principal.
        </div>
      </SectionCard>

      <PracticalSummaryCard totalDays={totalPWE} />

      <PracticalPeriodForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        defaultValues={editingPeriod}
        onSubmit={handleSubmit}
        firmName={firmName}
        principalName={principalName}
        articledshipStartDate={contractStartDate}
      />

      {/* Feedback Dialog */}
      <Dialog open={!!feedbackPeriod} onOpenChange={(open) => !open && setFeedbackPeriod(undefined)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>View Principal Feedback</DialogTitle>
          </DialogHeader>
          {feedbackPeriod && (
            <FeedbackThread 
              feedback={feedbackPeriod.principalFeedback} 
              principalName="M. Hasan FCA"
              date={feedbackPeriod.approvedAt || "Recently"}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
