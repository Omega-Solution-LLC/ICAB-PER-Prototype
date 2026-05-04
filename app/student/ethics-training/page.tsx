"use client";

import { useStudentData } from "@/hooks/use-student-data";
import { EthicsModule } from "@/types";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { useState } from "react";
import { ModuleAssessmentDialog } from "@/components/shared/module-assessment-dialog";
import { AssessmentBookingDialog } from "@/components/shared/assessment-booking-dialog";

export default function EthicsTrainingPage() {
  const { ethicsModules, updateEthicsModule } = useStudentData();
  const [activeModule, setActiveModule] = useState<EthicsModule | undefined>();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const completedModulesCount = ethicsModules.filter(
    (m) => m.status === "completed",
  ).length;
  const totalModules = ethicsModules.length;

  const modPct = totalModules > 0 ? Math.min((completedModulesCount / totalModules) * 100, 100) : 0;

  const handleTakeAssessment = (module: EthicsModule) => {
    setActiveModule(module);
    setIsAssessmentOpen(true);
  };

  const handleBookExam = (module: EthicsModule) => {
    setActiveModule(module);
    setIsBookingOpen(true);
  };

  const handleCompleteAssessment = async (score: number) => {
    if (!activeModule) return;
    updateEthicsModule(activeModule.id, {
      status: "assessment-pending",
      score: score,
      lastAttemptAt: new Date().toISOString().split("T")[0]
    });
    toast.success(`Assessment completed successfully with a score of ${score}%! You can now book your exam.`);
  };

  const handleConfirmBooking = async (date: string) => {
    if (!activeModule) return;
    await new Promise((resolve) => setTimeout(resolve, 800));
    updateEthicsModule(activeModule.id, {
      status: "completed"
    });
    toast.success(`Exam successfully booked for ${date}.`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ── Title & Progress Bar ── */}
        <div className="mb-8">
          <h1
            className="text-3xl font-semibold mb-4"
            style={{ color: "var(--color-icab-red)" }}>
            Ethics Modules
          </h1>
          
          <div className="flex items-center gap-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-gray-600">{completedModulesCount} / {totalModules} modules</span>
              </div>
              <Progress value={modPct} className="w-full">
                <ProgressTrack className="bg-gray-100 h-2.5">
                  <ProgressIndicator style={{ backgroundColor: "var(--color-icab-red)" }} />
                </ProgressTrack>
              </Progress>
            </div>
            <div className="text-3xl font-bold tracking-tight" style={{ color: "var(--color-icab-red)" }}>
              {Math.round(modPct)}%
            </div>
          </div>
        </div>

        {/* ── Info section ── */}
        <div className="border border-gray-200 mb-6">
          {/* Header bar */}
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            About Ethics Modules
          </div>

          {/* Body */}
          <div className="bg-gray-50 px-5 py-5">
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              Ethics Modules focus on developing your core competencies in professional integrity, objectivity, and ethical behavior. You must complete the modules in sequence. For each module, you must first pass the inline assessment. Only after passing the assessment can you book the final exam to fulfill Pillar 3 prerequisites.
            </p>
          </div>
        </div>

        {/* ── Modules Grid ── */}
        <div className="mb-6 border border-gray-200">
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            Ethics Modules
          </div>

          <div className="bg-gray-50 border-t-0 border-gray-200 px-5 py-6">
            <div className="grid grid-cols-2 gap-4">
              {ethicsModules.map((module) => {
                const canTakeAssessment = module.status === "not-started" || module.status === "in-progress";
                const canBookExam = module.status === "assessment-pending";
                const isCompleted = module.status === "completed";

                return (
                  <div
                    key={module.id}
                    className="border border-gray-200 bg-white p-4 flex flex-col justify-between hover:shadow-sm transition-shadow">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "var(--color-icab-red)" }}>
                          {module.name}
                        </p>
                        {isCompleted && (
                          <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                            Completed
                          </span>
                        )}
                        {canTakeAssessment && (
                          <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded">
                            {module.status === "not-started" ? "Not Started" : "In Progress"}
                          </span>
                        )}
                        {canBookExam && (
                          <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                            Pending Exam
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 leading-snug mb-3 font-normal">
                        {module.description ||
                          "Complete the assessment, then book your exam."}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-200">
                      <button
                        onClick={() => handleTakeAssessment(module)}
                        disabled={!canTakeAssessment}
                        className={`flex-1 px-3 py-2 text-xs font-medium text-white rounded transition-shadow ${
                          canTakeAssessment
                            ? "hover:shadow-sm cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        style={canTakeAssessment ? { backgroundColor: "var(--color-icab-red)" } : {}}>
                        {canBookExam || isCompleted ? "Assessment Passed" : "Take Assessment"}
                      </button>
                      <button
                        onClick={() => handleBookExam(module)}
                        disabled={!canBookExam}
                        className={`flex-1 px-3 py-2 text-xs font-medium text-white rounded transition-shadow ${
                          canBookExam
                            ? "bg-blue-600 hover:shadow-sm cursor-pointer hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}>
                        {isCompleted ? "Exam Booked" : "Book Exam"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ModuleAssessmentDialog
        open={isAssessmentOpen}
        onOpenChange={setIsAssessmentOpen}
        moduleName={activeModule?.name}
        onComplete={handleCompleteAssessment}
      />

      <AssessmentBookingDialog
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        moduleName={activeModule?.name}
        moduleType="ethics"
        onBook={handleConfirmBooking}
      />
    </div>
  );
}
