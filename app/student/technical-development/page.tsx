"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '@/components/shared/section-card';
import { useStudentData } from '@/hooks/use-student-data';
import { AnnualRequirementTracker } from '@/components/student/annual-requirement-tracker';
import { TechnicalModuleCard } from '@/components/student/technical-module-card';
import { AssessmentBookingDialog } from '@/components/shared/assessment-booking-dialog';
import { TechnicalModule } from '@/types';
import { toast } from 'sonner';

export default function TechnicalDevelopmentPage() {
  const { technicalModules, updateTechnicalModule } = useStudentData();
  const [bookingModule, setBookingModule] = useState<TechnicalModule | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const completedModulesCount = technicalModules.filter(m => m.status === 'completed').length;

  const handleBookAssessment = (module: TechnicalModule) => {
    setBookingModule(module);
    setIsDialogOpen(true);
  };

  const handleStartReview = (module: TechnicalModule) => {
    toast.info(`Opening review materials for ${module.name}`);
  };

  const confirmBooking = async (date: string) => {
    if (!bookingModule) return;
    
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    updateTechnicalModule(bookingModule.id, {
      status: 'assessment-pending',
    });
    
    toast.success(`Lab assessment booked for ${date} successfully.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Technical Development" 
        subtitle="Manage your IES 2 technical competencies and assessments"
      />

      <AnnualRequirementTracker completedThisYear={completedModulesCount} />

      <SectionCard 
        title="IES 2 Technical Modules" 
        description="Select a module to review its content or book a lab assessment. You must complete modules in sequence."
        contentClassName="bg-slate-50 border-t border-slate-100 p-4 sm:p-6"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {technicalModules.map(module => (
            <TechnicalModuleCard 
              key={module.id} 
              module={module} 
              onBookAssessment={handleBookAssessment}
              onStart={handleStartReview}
            />
          ))}
        </div>
      </SectionCard>

      <AssessmentBookingDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        moduleName={bookingModule?.name}
        moduleType="technical"
        onBook={confirmBooking}
      />
    </div>
  );
}
