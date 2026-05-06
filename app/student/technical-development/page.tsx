"use client";

import { useStudentData } from "@/hooks/use-student-data";
import { TechnicalModule } from "@/types";
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { RecordStatus } from "@/types";

const TECHNICAL_MODULE_CATALOG = [
  { name: "Audit & Assurance", description: "Statutory audit principles" },
  { name: "Financial Management", description: "Corporate finance" },
  { name: "Management Accounting", description: "Costing and performance management" },
  { name: "Taxation", description: "Corporate and personal tax" },
  { name: "Financial accounting and report", description: "Advanced financial reporting" },
  { name: "Governance, risk management and internal control", description: "Enterprise risk and internal control" },
  { name: "Business laws and regulations", description: "Corporate law context" },
  { name: "Information and communication technologies", description: "IT audit and controls" },
  { name: "Business and organizational strategy", description: "Business strategy formulation" },
];

function getModuleStatus(records: TechnicalModule[]): RecordStatus {
  if (records.length === 0) return "not-started";
  if (records.every((r) => r.status === "approved")) return "approved";
  if (records.some((r) => r.status === "submitted")) return "submitted";
  return "in-progress";
}

export default function TechnicalDevelopmentPage() {
  const { technicalModules, updateTechnicalModule } = useStudentData();
  const [activeModule, setActiveModule] = useState<TechnicalModule | undefined>();
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [responseDraft, setResponseDraft] = useState("");
  const [viewModal, setViewModal] = useState<{ title: string; content: string } | null>(null);
  const [approvedPreview, setApprovedPreview] = useState<TechnicalModule | null>(null);
  const [selectedModuleName, setSelectedModuleName] = useState<string>(TECHNICAL_MODULE_CATALOG[0].name);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const approvedModulesCount = TECHNICAL_MODULE_CATALOG.filter((module) =>
    getModuleStatus(technicalModules.filter((item) => item.name === module.name)) === "approved",
  ).length;
  const totalModules = TECHNICAL_MODULE_CATALOG.length;
  const selectedModuleRecords = technicalModules.filter((module) => module.name === selectedModuleName);

  const modPct = Math.min((approvedModulesCount / totalModules) * 100, 100);

  const updateTabScrollState = () => {
    const container = tabsContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 1);
  };

  const scrollTabs = (direction: "left" | "right") => {
    const container = tabsContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: direction === "left" ? -280 : 280, behavior: "smooth" });
  };

  useEffect(() => {
    updateTabScrollState();
    window.addEventListener("resize", updateTabScrollState);
    return () => window.removeEventListener("resize", updateTabScrollState);
  }, []);

  const handleOpenResponse = (module: TechnicalModule) => {
    if (module.status === "approved") {
      setApprovedPreview(module);
      return;
    }
    setActiveModule(module);
    setResponseDraft(module.studentResponse || "");
    setIsResponseOpen(true);
  };

  const handleSaveResponse = async () => {
    if (!activeModule) return;
    const trimmedResponse = responseDraft.trim();
    if (!trimmedResponse) {
      toast.error("Response is required before submission.");
      return;
    }

    updateTechnicalModule(activeModule.id, {
      studentResponse: trimmedResponse,
      status: "submitted",
      attempts: (activeModule.attempts || 0) + 1,
      lastAttemptAt: new Date().toISOString().split("T")[0]
    });

    toast.success("Response submitted successfully. Waiting for employer review.");
    setIsResponseOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ── Title & Progress Bar ── */}
        <div className="mb-8">
          <h1
            className="text-3xl font-semibold mb-4"
            style={{ color: "var(--color-icab-red)" }}>
            Technical Development
          </h1>
          
          <div className="flex items-center gap-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-gray-600">{approvedModulesCount} / {totalModules} approved</span>
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
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Technical Assignment Workflow
          </div>
          <div className="bg-gray-50 px-5 py-5">
            <p className="text-sm text-gray-600 leading-relaxed font-normal">
              For each module, submit a written response to the assignment question.
              There is no auto-calculated score. Your employer reviews your response,
              gives feedback, and marks it approved.
            </p>
          </div>
        </div>

        {/* ── Module Selector ── */}
        <div className="mb-6 border border-gray-200">
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            IES 2 Technical Modules
          </div>
          <div className="bg-gray-50 border-t-0 border-gray-200 px-5 py-6">
            <div className="relative">
              <button
                type="button"
                onClick={() => scrollTabs("left")}
                disabled={!canScrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-slate-200 bg-white/95 shadow-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Scroll modules left"
              >
                <ChevronLeft className="h-5 w-5 text-slate-700" />
              </button>
              <button
                type="button"
                onClick={() => scrollTabs("right")}
                disabled={!canScrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full border border-slate-200 bg-white/95 shadow-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Scroll modules right"
              >
                <ChevronRight className="h-5 w-5 text-slate-700" />
              </button>
              <div
                ref={tabsContainerRef}
                onScroll={updateTabScrollState}
                className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
              {TECHNICAL_MODULE_CATALOG.map((module) => {
                const moduleRecords = technicalModules.filter((item) => item.name === module.name);
                const moduleStatus = getModuleStatus(moduleRecords);
                const isActive = selectedModuleName === module.name;
                return (
                  <button
                    key={module.name}
                    onClick={() => setSelectedModuleName(module.name)}
                    className={`border bg-white px-4 py-4 min-h-[96px] text-left transition-all whitespace-nowrap rounded-md shrink-0 ${
                      isActive
                        ? "border-icab-red shadow-sm ring-1 ring-icab-red/40"
                        : "border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm" style={{ color: "var(--color-icab-red)" }}>
                        {module.name}
                      </span>
                      <StatusBadge status={moduleStatus} />
                    </div>
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Technical Response Table ── */}
        <div className="mb-6 border border-gray-200">
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            {selectedModuleName} - Questions
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr>
                  <th className="text-white text-sm font-semibold text-center px-4 py-3 border-b border-r border-slate-700 bg-slate-800 w-[90px]">
                    Module
                  </th>
                  <th className="text-white text-sm font-semibold text-left px-4 py-3 border-b border-r border-slate-700 bg-slate-800 min-w-[420px]">
                    How did you
                  </th>
                  <th className="text-white text-sm font-semibold text-center px-4 py-3 border-b border-r border-slate-700 bg-slate-800 w-[140px]">
                    Response
                  </th>
                  <th className="text-white text-sm font-semibold text-center px-4 py-3 border-b border-r border-slate-700 bg-slate-800 w-[180px]">
                    Employer Feedback
                  </th>
                  <th className="text-white text-sm font-semibold text-center px-4 py-3 border-b bg-slate-800 w-[130px]">
                    Approved
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedModuleRecords.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500">
                      No questions configured yet for this module.
                    </td>
                  </tr>
                ) : selectedModuleRecords.map((module, index) => {
                  const hasResponse = !!module.studentResponse;
                  const hasFeedback = !!module.employerFeedback;
                  const isApproved = module.status === "approved";

                  return (
                    <tr key={module.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-base text-center font-semibold text-gray-900">{index + 1}</td>
                      <td className="px-4 py-4 text-base text-left text-gray-900 leading-snug">
                        {isApproved ? (
                          <button
                            onClick={() => setApprovedPreview(module)}
                            className="font-semibold text-gray-900 mb-1 text-left hover:text-blue-700"
                          >
                            {module.responseQuestion || "Question not set"}
                          </button>
                        ) : (
                          <p className="font-semibold text-gray-900 mb-1">{module.responseQuestion || "Question not set"}</p>
                        )}
                        <p className="text-sm text-gray-600">{module.name}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-center">
                        {isApproved ? (
                          <button
                            onClick={() => setApprovedPreview(module)}
                            className="text-blue-600 underline font-medium hover:text-blue-700"
                          >
                            View
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOpenResponse(module)}
                            className="text-blue-600 underline font-medium hover:text-blue-700"
                          >
                            {hasResponse ? "View / Edit" : "Add Response"}
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-center">
                        {hasFeedback ? (
                          <button
                            onClick={() =>
                              setViewModal({
                                title: `${module.name} - Employer Feedback`,
                                content: module.employerFeedback || "",
                              })
                            }
                            className="text-blue-600 underline font-medium hover:text-blue-700"
                          >
                            View
                          </button>
                        ) : (
                          <span className="text-gray-500">Pending</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {isApproved ? (
                          <button
                            onClick={() => setApprovedPreview(module)}
                            className="inline-flex items-center justify-center"
                            title="View approved response"
                          >
                            <CheckCircle2 className="h-7 w-7 text-green-600" />
                          </button>
                        ) : (
                          <StatusBadge status={module.status} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={isResponseOpen} onOpenChange={setIsResponseOpen}>
        <DialogContent className="sm:max-w-[760px]">
          <DialogHeader>
            <DialogTitle>{activeModule?.name} - Response</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <span className="font-semibold text-slate-900">Question: </span>
              {activeModule?.responseQuestion}
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-800">Response</label>
              <Textarea
                value={responseDraft}
                onChange={(e) => setResponseDraft(e.target.value)}
                className="mt-2 min-h-[180px]"
                placeholder="Write your response here..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" onClick={() => setIsResponseOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-icab-red hover:bg-icab-wine text-white" onClick={handleSaveResponse}>
                Submit Response
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewModal} onOpenChange={(open) => !open && setViewModal(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{viewModal?.title}</DialogTitle>
          </DialogHeader>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 whitespace-pre-wrap">
            {viewModal?.content || "No content available."}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!approvedPreview} onOpenChange={(open) => !open && setApprovedPreview(null)}>
        <DialogContent className="sm:max-w-[780px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Approved Response - {approvedPreview?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="rounded-md border border-rose-200 p-4">
              <p className="text-base font-semibold mb-2">Your response:</p>
              <p className="text-sm text-slate-800 whitespace-pre-wrap">
                {approvedPreview?.studentResponse || "No response found."}
              </p>
            </div>
            <div className="rounded-md border border-rose-200 p-4">
              <p className="text-base font-semibold mb-2">Employer feedback:</p>
              <p className="text-sm text-slate-800 whitespace-pre-wrap">
                {approvedPreview?.employerFeedback || "No feedback found."}
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Clicked from approved row preview.
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
