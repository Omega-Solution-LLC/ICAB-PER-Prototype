"use client";

import { SkillEntryDialog } from "@/components/student/skill-entry-dialog";
import { SkillEntryTimeline } from "@/components/student/skill-entry-timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStudentData } from "@/hooks/use-student-data";
import { SKILL_AREAS_SEED } from "@/lib/constants";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";

export default function SkillsDevelopmentPage() {
  const { student, skillRecords, addSkillRecord } = useStudentData();
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

  const completedSkillAreas = new Set(
    skillRecords.filter((s) => s.status === "approved").map((s) => s.skillAreaId)
  ).size;
  const totalSkillAreas = SKILL_AREAS_SEED.length;
  const skillPct = Math.min((completedSkillAreas / totalSkillAreas) * 100, 100);

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ── Title & Progress Bar ── */}
        <div className="mb-8">
          <h1
            className="text-3xl font-semibold mb-4"
            style={{ color: "var(--color-icab-red)" }}>
            Professional Skill Development
          </h1>
          
          <div className="flex items-center gap-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-gray-600">{completedSkillAreas} / {totalSkillAreas} skill areas</span>
              </div>
              <Progress value={skillPct} className="w-full">
                <ProgressTrack className="bg-gray-100 h-2.5">
                  <ProgressIndicator style={{ backgroundColor: "var(--color-icab-red)" }} />
                </ProgressTrack>
              </Progress>
            </div>
            <div className="text-3xl font-bold tracking-tight" style={{ color: "var(--color-icab-red)" }}>
              {Math.round(skillPct)}%
            </div>
          </div>
        </div>

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
          <div className="bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm mb-6">
            <TabsList className="grid w-full grid-cols-4 bg-transparent p-0 h-auto gap-1">
              {SKILL_AREAS_SEED.map((skill) => (
                <TabsTrigger
                  key={skill.id}
                  value={skill.id}
                  className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-sm rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition-all text-center h-full whitespace-normal break-words"
                  style={{
                    color:
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
              <div className="border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 border-b border-gray-100 bg-gray-50/50">
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
                    <Plus className="inline w-4 h-4 mr-1.5" /> Add New
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
