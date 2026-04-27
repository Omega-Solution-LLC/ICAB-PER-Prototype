"use client";

import React from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { StudentDetailHeader } from '@/components/admin/student-detail-header';
import { ReviewPracticalTab } from '@/components/admin/review-practical-tab';
import { ReviewTechnicalTab } from '@/components/admin/review-technical-tab';
import { ReviewSkillsTab } from '@/components/admin/review-skills-tab';
import { ReviewEthicsTrainingTab } from '@/components/admin/review-ethics-training-tab';
import { ReviewEthicsApplicationTab } from '@/components/admin/review-ethics-application-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminData } from '@/hooks/use-admin-data';

export default function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const { students } = useAdminData();
  const student = students.find(s => s.id === resolvedParams.id);

  if (!student) {
    return <div className="p-10 text-center">Student not found</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title={`${student.name}'s Journey`} 
        subtitle="Review progress and approve submissions" 
      />

      <StudentDetailHeader studentId={student.id} />

      <Tabs defaultValue="practical" className="mt-8">
        <TabsList className="bg-slate-100/80 p-1 w-full justify-start overflow-x-auto h-auto flex-wrap gap-1 border border-slate-200">
          <TabsTrigger value="practical" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Work Experience</TabsTrigger>
          <TabsTrigger value="technical" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Technical Development</TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Professional Skill Development</TabsTrigger>
          <TabsTrigger value="ethics-training" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Ethics Training</TabsTrigger>
          <TabsTrigger value="ethics-application" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Ethics Application</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="practical" className="mt-0 outline-none">
            <ReviewPracticalTab studentId={student.id} />
          </TabsContent>
          <TabsContent value="technical" className="mt-0 outline-none">
            <ReviewTechnicalTab />
          </TabsContent>
          <TabsContent value="skills" className="mt-0 outline-none">
            <ReviewSkillsTab studentId={student.id} />
          </TabsContent>
          <TabsContent value="ethics-training" className="mt-0 outline-none">
            <ReviewEthicsTrainingTab />
          </TabsContent>
          <TabsContent value="ethics-application" className="mt-0 outline-none">
            <ReviewEthicsApplicationTab studentId={student.id} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
