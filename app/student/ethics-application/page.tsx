"use client";

import { EthicsApplicationForm } from "@/components/student/ethics-application-form";
import { CheckCircle, History, Lock } from "lucide-react";
import { useStudentData } from "@/hooks/use-student-data";
import { useState } from "react";
import { toast } from "sonner";
import { StatusBadge } from "@/components/shared/status-badge";

const PERIODS = [
  "Year 1 - H1",
  "Year 1 - H2",
  "Year 2 - H1",
  "Year 2 - H2",
  "Year 3 - H1",
  "Year 3 - H2"
];

const ETHICS_QUESTIONS = [
  {
    id: "q1",
    label: "Ethical Leadership",
    description: "Describe an instance where you navigated an ethical dilemma with integrity.",
  },
  {
    id: "q2",
    label: "Independence",
    description: "Provide an example where you assessed and maintained independence in fact and appearance during an engagement.",
  },
  {
    id: "q3",
    label: "Professional Skepticism",
    description: "Explain a scenario where you applied professional skepticism effectively.",
  },
];

export default function EthicsApplicationPage() {
  const { ethicsApplications, addEthicsApplication } = useStudentData();
  const [selectedPeriod, setSelectedPeriod] = useState(PERIODS[1]); // Default to Year 1 - H2

  const currentApplication = ethicsApplications.find(a => a.periodLabel === selectedPeriod);

  const handleSubmitApplication = async (data: Record<string, string>) => {
    await new Promise((r) => setTimeout(r, 800));

    const today = new Date().toISOString().split('T')[0];

    addEthicsApplication({
      studentId: "stu-001",
      periodLabel: selectedPeriod,
      answers: data,
      submittedAt: today
    });

    toast.success(`Ethics Application for ${selectedPeriod} submitted successfully!`);
  };

  return (
    <div className="min-h-screen bg-white font-sans relative">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* ── Title ── */}
        <h1
          className="text-3xl font-semibold mb-6"
          style={{ color: "var(--color-icab-red)" }}>
          Bi-Annual Ethics Application
        </h1>

        {/* ── Eligibility & Period Selection ── */}
        <div className="border border-emerald-200 rounded-lg bg-emerald-50 px-5 py-4 mb-6 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-900">
                You are eligible to apply
              </h3>
              <p className="text-sm text-emerald-700 mt-1">
                You have successfully completed the required modules. Please submit your ethics reflection for the selected period.
              </p>
            </div>
          </div>
          <div className="shrink-0 bg-white border border-emerald-200 rounded-md p-1 shadow-sm">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="text-sm font-semibold text-emerald-900 bg-transparent border-none outline-none cursor-pointer px-2 py-1"
            >
              {PERIODS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Application Form or Read Only ── */}
        {!currentApplication ? (
          <>
            <div className="border border-gray-200 mb-6">
              <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
                Application Overview - {selectedPeriod}
              </div>
              <div className="bg-gray-50 px-5 py-5">
                <p className="text-sm text-gray-600 mb-4 font-normal">
                  Your Ethics Application demonstrates competence in three core areas of ethical practice. Provide detailed examples from your practical experience that show your understanding and application of each principle.
                </p>
              </div>
            </div>
            <EthicsApplicationForm onSubmit={handleSubmitApplication} />
          </>
        ) : (
          <div className="border border-gray-200 mb-6 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-700 text-white flex justify-between items-center px-5 py-3 text-sm font-semibold tracking-wide">
              <span>
                {currentApplication.status === 'approved' 
                  ? `Application Approved - ${selectedPeriod} (${new Date(currentApplication.approvedAt!).toLocaleDateString()})`
                  : `Application Submitted - ${selectedPeriod}`
                }
              </span>
              <StatusBadge status={currentApplication.status} />
            </div>
            <div className="bg-gray-50 px-5 py-5 space-y-6">
              {Object.entries(currentApplication.answers).map(([qId, answer]) => {
                const question = ETHICS_QUESTIONS.find(q => q.id === qId);
                return (
                  <div key={qId} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">
                      {question?.label || `Question ${qId}`}
                    </h4>
                    <p className="text-xs text-gray-600 mb-3 italic">
                      {question?.description}
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed bg-white p-4 border border-gray-100 rounded-md shadow-sm">
                      {answer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Application History ── */}
        <div className="border border-gray-200 mt-8 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex items-center gap-2">
            <History className="w-4 h-4 text-gray-600" />
            <h3 className="font-medium text-gray-900 text-sm">
              Application History
            </h3>
          </div>
          <div className="bg-white">
            {ethicsApplications.length === 0 ? (
              <p className="px-5 py-6 text-sm text-gray-500 text-center">No applications submitted yet.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-5 py-3 font-semibold text-gray-700">Period</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Submitted Date</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Approved Date</th>
                    <th className="px-5 py-3 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ethicsApplications.map(app => (
                    <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 font-medium text-gray-900">{app.periodLabel}</td>
                      <td className="px-5 py-3 text-gray-600">{app.submittedAt || "N/A"}</td>
                      <td className="px-5 py-3 text-gray-600">
                        {app.status === 'approved' && app.approvedAt 
                          ? new Date(app.approvedAt).toLocaleDateString() 
                          : "-"
                        }
                      </td>
                      <td className="px-5 py-3">
                        <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
