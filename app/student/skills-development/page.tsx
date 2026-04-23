"use client";

import { SkillEntryDialog } from "@/components/student/skill-entry-dialog";
import { SkillEntryTimeline } from "@/components/student/skill-entry-timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudentData } from "@/hooks/use-student-data";
import { SKILL_AREAS_SEED } from "@/lib/constants";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function SkillsDevelopmentPage() {
  const { student, addSkillRecord } = useStudentData();
  const [activeTabId, setActiveTabId] = useState(SKILL_AREAS_SEED[0].id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeSkill = SKILL_AREAS_SEED.find((s) => s.id === activeTabId);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSaveSkill = async (
    data: Record<string, string>,
    periodLabel: string,
  ) => {
    if (!student || !activeSkill) return;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    addSkillRecord({
      studentId: student.id,
      skillAreaId: activeSkill.id,
      periodLabel,
      guidedAnswers: data,
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ── Title ── */}
        <h1
          className="text-3xl font-semibold mb-6"
          style={{ color: "var(--color-icab-red)" }}>
          Skills & IT Development
        </h1>

        {/* ── Info section ── */}
        <div className="border border-gray-200 mb-6">
          {/* Header bar */}
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            About IES 3 Documentation
          </div>

          {/* Body */}
          <div className="bg-gray-50 px-5 py-5">
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              You must demonstrate competence across all five skill areas
              defined by the International Education Standards (IES 3) before
              applying for membership. Use the tabs below to select a skill area
              and log scenarios from your practical experience that demonstrate
              your proficiency. Your principal will review these entries during
              your performance appraisals.
            </p>
          </div>
        </div>

        {/* ── Tabs Section ── */}
        <Tabs
          defaultValue={SKILL_AREAS_SEED[0].id}
          onValueChange={setActiveTabId}
          className="w-full">
          <div className="border border-gray-200 border-b-0 bg-gray-50">
            <TabsList className="bg-gray-50 p-0 rounded-none w-full flex justify-start border-b border-gray-200 overflow-x-auto">
              {SKILL_AREAS_SEED.map((skill) => (
                <TabsTrigger
                  key={skill.id}
                  value={skill.id}
                  className="data-[state=active]:border-b-2 data-[state=active]:bg-transparent rounded-none px-4 py-3 whitespace-nowrap text-sm font-normal text-gray-600 border-b-2 border-transparent"
                  style={{
                    color:
                      activeTabId === skill.id
                        ? "var(--color-icab-red)"
                        : undefined,
                    borderBottomColor:
                      activeTabId === skill.id
                        ? "var(--color-icab-red)"
                        : undefined,
                  }}>
                  {skill.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {SKILL_AREAS_SEED.map((skill) => (
            <TabsContent
              key={skill.id}
              value={skill.id}
              className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="border border-t-0 border-gray-200 bg-white">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-5 py-5 border-b border-gray-200">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {skill.description}
                    </p>
                  </div>
                  <button
                    onClick={handleOpenDialog}
                    className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-white rounded hover:shadow-sm transition-shadow"
                    style={{ backgroundColor: "var(--color-icab-red)" }}>
                    <Plus className="inline w-4 h-4 mr-1.5" /> Log Scenario
                  </button>
                </div>

                <div className="px-5 py-6">
                  <SkillEntryTimeline skillAreaId={skill.id} />
                </div>
              </div>
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
    </div>
  );
}
