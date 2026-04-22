"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import { EthicsScenarioWizard } from "@/components/student/ethics-scenario-wizard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStudentData } from "@/hooks/use-student-data";
import { EthicsScenario } from "@/types";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function EthicsTrainingPage() {
  const { ethicsScenarios, updateEthicsScenario } = useStudentData();
  const [activeScenario, setActiveScenario] = useState<EthicsScenario | null>(
    null,
  );

  const completedCount = ethicsScenarios.filter(
    (s) => s.status === "approved",
  ).length;
  const pieData = [
    { name: "Completed", value: completedCount, color: "#aa2a2d" },
    {
      name: "Remaining",
      value: Math.max(0, 2 - completedCount),
      color: "#f1f5f9",
    },
  ];

  const handleStartScenario = (scenario: EthicsScenario) => {
    setActiveScenario(scenario);
  };

  const handleScenarioComplete = () => {
    if (activeScenario) {
      updateEthicsScenario(activeScenario.id, { status: "submitted" });
    }
    setActiveScenario(null);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ── Title ── */}
        <h1
          className="text-3xl font-semibold mb-6"
          style={{ color: "var(--color-icab-red)" }}>
          Ethics Scenarios
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* ── Required Scenarios Section ── */}
            <div className="border border-gray-200 mb-6">
              {/* Header */}
              <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
                Required Scenarios
              </div>

              {/* Body */}
              <div className="bg-gray-50 px-5 py-5">
                <p className="text-sm text-gray-600 mb-4 font-normal">
                  Complete 2 predefined ethics scenarios to fulfill Pillar 3
                  prerequisites.
                </p>
                <div className="space-y-3">
                  {ethicsScenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 border border-gray-200 gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <h3 className="font-semibold text-gray-900">
                            {scenario.dilemma}
                          </h3>
                          <StatusBadge status={scenario.status} />
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 font-normal">
                          {scenario.description}
                        </p>
                      </div>
                      <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                        {scenario.status !== "approved" &&
                        scenario.status !== "submitted" ? (
                          <button
                            onClick={() => handleStartScenario(scenario)}
                            className="w-full px-4 py-2 text-sm font-medium text-white rounded hover:shadow-sm transition-shadow whitespace-nowrap"
                            style={{
                              backgroundColor: "var(--color-icab-red)",
                            }}>
                            Start Scenario
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded whitespace-nowrap">
                            View Submission
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* ── Progress Chart Section ── */}
            <div className="border border-gray-200">
              {/* Header */}
              <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
                Overall Progress
              </div>

              {/* Body */}
              <div className="bg-gray-50 px-5 py-5">
                <p className="text-xs text-gray-600 mb-4 font-normal">
                  2 Scenarios Required
                </p>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, "Scenarios"]} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm">
                  <span className="font-medium text-gray-900">Status</span>
                  <span
                    className="font-semibold"
                    style={{ color: "var(--color-icab-red)" }}>
                    {completedCount >= 2 ? "Requirement Met" : "In Progress"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Dialog Modal ── */}
        <Dialog
          open={!!activeScenario}
          onOpenChange={(open) => !open && setActiveScenario(null)}>
          <DialogContent className="sm:max-w-[700px] h-full sm:h-auto max-h-screen sm:max-h-[85vh] flex flex-col p-0 overflow-hidden">
            <DialogHeader className="px-6 py-4 border-b shrink-0">
              <DialogTitle>Scenario Wizard</DialogTitle>
              <DialogDescription className="sr-only">
                Complete the ethics scenario
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
              {activeScenario && (
                <EthicsScenarioWizard
                  scenario={activeScenario}
                  onComplete={handleScenarioComplete}
                  onCancel={() => setActiveScenario(null)}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
