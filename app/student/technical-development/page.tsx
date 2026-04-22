"use client";

import { AssessmentBookingDialog } from "@/components/shared/assessment-booking-dialog";
import { useStudentData } from "@/hooks/use-student-data";
import { TechnicalModule } from "@/types";
import { BookOpen, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function TechnicalDevelopmentPage() {
  const { technicalModules, updateTechnicalModule } = useStudentData();
  const [bookingModule, setBookingModule] = useState<
    TechnicalModule | undefined
  >();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const completedModulesCount = technicalModules.filter(
    (m) => m.status === "completed",
  ).length;
  const totalModules = technicalModules.length;

  const handleBookAssessment = (module: TechnicalModule) => {
    setBookingModule(module);
    setIsDialogOpen(true);
  };

  const handleStartReview = (module: TechnicalModule) => {
    toast.info(`Opening review materials for ${module.name}`);
  };

  const confirmBooking = async (date: string) => {
    if (!bookingModule) return;

    await new Promise((resolve) => setTimeout(resolve, 800));

    updateTechnicalModule(bookingModule.id, {
      status: "assessment-pending",
    });

    toast.success(`Lab assessment booked for ${date} successfully.`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ── Title ── */}
        <h1
          className="text-3xl font-semibold mb-6"
          style={{ color: "var(--color-icab-red)" }}>
          Technical Development
        </h1>

        {/* ── Progress summary ── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-sm inline-block" />
            <span>
              <span className="font-medium text-gray-900">Total modules:</span>{" "}
              <span className="text-gray-600">{totalModules}</span>
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-sm inline-block" />
            <span>
              <span className="font-medium text-gray-900">Completed:</span>{" "}
              <span className="text-gray-600">
                {completedModulesCount} of {totalModules}
              </span>
            </span>
          </div>
        </div>

        {/* ── Info section ── */}
        <div className="border border-gray-200 mb-6">
          {/* Header bar */}
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            About Technical Modules
          </div>

          {/* Body */}
          <div className="bg-gray-50 px-5 py-5">
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              IES 2 technical modules focus on developing your core competencies
              in accounting, audit, tax, and other specialist areas. You must
              complete the modules in sequence, with each building on the
              knowledge and skills developed in the previous module. Each module
              includes review materials and a lab assessment that must be
              successfully completed before you can progress to the next module.
            </p>
          </div>
        </div>

        {/* ── Modules Grid ── */}
        <div className="mb-6 border border-gray-200">
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            IES 2 Technical Modules
          </div>

          <div className="bg-gray-50 border-t-0 border-gray-200 px-5 py-6">
            <div className="grid grid-cols-2 gap-4">
              {technicalModules.map((module) => (
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
                    </div>
                    <p className="text-sm text-gray-700 leading-snug mb-3 font-normal">
                      {module.description ||
                        "Complete the review materials and lab assessment"}
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
                      disabled={module.status === "not-started"}
                      className="flex-1 px-3 py-2 text-xs font-medium text-white rounded hover:shadow-sm transition-shadow cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor:
                          module.status === "not-started"
                            ? undefined
                            : "var(--color-icab-red)",
                      }}>
                      {module.status === "completed"
                        ? "Completed"
                        : "Book Assessment"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Additional Resources ── */}
        <div className="border border-gray-200">
          {/* Header bar */}
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            Additional Resources
          </div>

          {/* Body */}
          <div className="bg-gray-50 px-5 py-5 space-y-3">
            <div className="border border-gray-200 bg-white p-4 flex items-end justify-between hover:shadow-sm transition-shadow">
              <div>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: "var(--color-icab-red)" }}>
                  Assessment guidance
                </p>
                <p className="text-sm text-gray-700 leading-snug font-normal">
                  Tips and guidance for preparing for your lab assessments
                </p>
              </div>
              <ChevronRight className="text-gray-300 shrink-0 w-5 h-5" />
            </div>

            <div className="border border-gray-200 bg-white p-4 flex items-end justify-between hover:shadow-sm transition-shadow">
              <div>
                <p
                  className="font-semibold text-sm mb-1"
                  style={{ color: "var(--color-icab-red)" }}>
                  Learning resources
                </p>
                <p className="text-sm text-gray-700 leading-snug font-normal">
                  Additional reading materials and reference documents
                </p>
              </div>
              <ChevronRight className="text-gray-300 shrink-0 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

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
