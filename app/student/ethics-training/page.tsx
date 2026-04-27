"use client";

import { useStudentData } from "@/hooks/use-student-data";
import { EthicsModule } from "@/types";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";

export default function EthicsTrainingPage() {
  const { ethicsModules, updateEthicsModule } = useStudentData();

  const completedModulesCount = ethicsModules.filter(
    (m) => m.status === "completed",
  ).length;
  const totalModules = ethicsModules.length;

  const modPct = totalModules > 0 ? Math.min((completedModulesCount / totalModules) * 100, 100) : 0;

  const handleStartReview = (module: EthicsModule) => {
    toast.info(`Opening review materials for ${module.name}`);
  };

  const handleBookAssessment = (module: EthicsModule) => {
    updateEthicsModule(module.id, {
      status: "assessment-pending",
    });
    toast.success(`Assessment booked for ${module.name} successfully.`);
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
              Ethics Modules focus on developing your core competencies in professional integrity, objectivity, and ethical behavior. You must complete the modules, reviewing the materials and passing the assessment for each to fulfill Pillar 3 prerequisites.
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
              {ethicsModules.map((module) => (
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
                      {module.status === "completed" && (
                        <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                          Completed
                        </span>
                      )}
                      {module.status === "in-progress" && (
                        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                          In Progress
                        </span>
                      )}
                      {module.status === "not-started" && (
                        <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-1 rounded">
                          Not Started
                        </span>
                      )}
                      {module.status === "assessment-pending" && (
                        <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 leading-snug mb-3 font-normal">
                      {module.description ||
                        "Complete the review materials and assessment"}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleStartReview(module)}
                      className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                      Review Materials
                    </button>
                    <button
                      onClick={() => handleBookAssessment(module)}
                      disabled={module.status === "not-started" || module.status === "completed" || module.status === "assessment-pending"}
                      className="flex-1 px-3 py-2 text-xs font-medium text-white rounded hover:shadow-sm transition-shadow cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor:
                          module.status === "not-started" || module.status === "completed" || module.status === "assessment-pending"
                            ? undefined
                            : "var(--color-icab-red)",
                      }}>
                      {module.status === "completed"
                        ? "Completed"
                        : module.status === "assessment-pending"
                        ? "Assessment Booked"
                        : "Take Assessment"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
