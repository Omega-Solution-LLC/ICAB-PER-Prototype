"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '@/components/shared/section-card';
import { useStudentData } from '@/hooks/use-student-data';
import { SkillEntryTimeline } from '@/components/student/skill-entry-timeline';
import { SkillEntryDialog } from '@/components/student/skill-entry-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SKILL_AREAS_SEED } from '@/lib/constants';

export default function SkillsDevelopmentPage() {
  const { student, addSkillRecord } = useStudentData();
  const [activeTabId, setActiveTabId] = useState(SKILL_AREAS_SEED[0].id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeSkill = SKILL_AREAS_SEED.find(s => s.id === activeTabId);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSaveSkill = async (data: Record<string, string>, periodLabel: string) => {
    if (!student || !activeSkill) return;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    addSkillRecord({
      studentId: student.id,
      skillAreaId: activeSkill.id,
      periodLabel,
      guidedAnswers: data
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Skills & IT Development" 
        subtitle="Document your IES 3 professional skills and competencies"
        action={
          <Button onClick={handleOpenDialog} className="bg-icab-red hover:bg-icab-wine text-white shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        }
      />

      <SectionCard title="About IES 3 Documentation" className="bg-slate-50/50 shadow-none border-dashed border-slate-300">
        <p className="text-sm text-slate-700 leading-relaxed">
          You must demonstrate competence across all five skill areas defined by the International Education Standards (IES 3) before applying for membership. 
          Use the tabs below to select a skill area and log scenarios from your practical experience that demonstrate your proficiency. 
          Your principal will review these entries during your performance appraisals.
        </p>
      </SectionCard>

      <Tabs defaultValue={SKILL_AREAS_SEED[0].id} onValueChange={setActiveTabId} className="w-full">
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <TabsList className="bg-slate-100/50 p-1 rounded-lg w-auto min-w-full flex sm:w-full justify-start sm:justify-center overflow-x-auto">
            {SKILL_AREAS_SEED.map((skill) => (
              <TabsTrigger 
                key={skill.id} 
                value={skill.id}
                className="data-[state=active]:bg-white data-[state=active]:text-icab-red data-[state=active]:shadow-sm rounded-md px-4 py-2 whitespace-nowrap text-xs sm:text-sm"
              >
                {skill.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {SKILL_AREAS_SEED.map((skill) => (
          <TabsContent key={skill.id} value={skill.id} className="mt-4 focus-visible:outline-none focus-visible:ring-0">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{skill.name}</h3>
                  <p className="text-sm text-slate-500">{skill.description}</p>
                </div>
                <Button onClick={handleOpenDialog} variant="outline" size="sm" className="mt-4 sm:mt-0 text-icab-red border-icab-rose/30 hover:bg-icab-blush/20 shadow-none">
                  <Plus className="mr-1.5 h-3.5 w-3.5" /> Log Scenario
                </Button>
             </div>
             
             <SkillEntryTimeline skillAreaId={skill.id} />
          </TabsContent>
        ))}
      </Tabs>

      {activeSkill && (
         <SkillEntryDialog 
           open={isDialogOpen} 
           onOpenChange={setIsDialogOpen}
           skillName={activeSkill.name}
           onSave={handleSaveSkill}
         />
      )}
    </div>
  );
}
