"use client";

import { useState } from "react";
import { Briefcase, User, Calendar, Check, Circle, CheckCircle, XCircle } from "lucide-react";
import { useStudentData } from "@/hooks/use-student-data";
import { format } from "date-fns";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";

const initialPeriods = [
  {
    id: 1,
    startDate: "01 Jan 2024",
    endDate: "30 Jun 2024",
    atPrimaryATE: 81,
    onSecondmentATE: 0,
    onSecondmentUnauth: 0,
    total: 81,
    status: "Pending Confirmation",
    reviewer: "A Smith",
  },
  {
    id: 2,
    startDate: "01 Jul 2024",
    endDate: "31 Dec 2024",
    atPrimaryATE: 90,
    onSecondmentATE: 0,
    onSecondmentUnauth: 0,
    total: 90,
    status: "Approved",
    reviewer: "A Smith",
  },
];

export default function PracticalWorkExperience() {
  const { firmName, principalName, contractStartDate, contractEndDate } = useStudentData();
  
  const formattedStartDate = contractStartDate ? format(new Date(contractStartDate), "d MMM yyyy") : "";
  const formattedEndDate = contractEndDate ? format(new Date(contractEndDate), "d MMM yyyy") : "";

  const [periods, setPeriods] = useState(initialPeriods);

  // Match dashboard calculation logic
  const totalPWE = periods.reduce((sum, p) => sum + p.total, 0);
  const pwePct = Math.min((totalPWE / 450) * 100, 100);

  const handleAdd = () => {
    setPeriods((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        startDate: "New Entry",
        endDate: "—",
        atPrimaryATE: 0,
        onSecondmentATE: 0,
        onSecondmentUnauth: 0,
        total: 0,
        status: "Draft",
        reviewer: "—",
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-sans">
      {/* Title & Progress Bar */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Work Experience
        </h2>
        
        <div className="flex items-center gap-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
              <span className="text-sm font-medium text-gray-600">{totalPWE} / 450 days</span>
            </div>
            <Progress value={pwePct} className="w-full">
              <ProgressTrack className="bg-gray-100 h-2.5">
                <ProgressIndicator style={{ backgroundColor: "var(--color-icab-red)" }} />
              </ProgressTrack>
            </Progress>
          </div>
          <div className="text-3xl font-bold tracking-tight" style={{ color: "var(--color-icab-red)" }}>
            {Math.round(pwePct)}%
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-3 bg-[#eef2fc] text-slate-700 px-4 py-2.5 rounded-lg border border-blue-50/50">
              <Briefcase className="w-5 h-5 text-[#3b82f6]" fill="currentColor" strokeWidth={0} />
              <span className="font-medium text-[15px]">Employer Name: {firmName}</span>
            </div>
            
            <div className="flex items-center gap-3 bg-[#f5f3fa] text-slate-700 px-4 py-2.5 rounded-lg border border-purple-50/50">
              <User className="w-5 h-5 text-[#f59e0b]" fill="currentColor" strokeWidth={0} />
              <span className="font-medium text-[15px]">Partner Name: {principalName}</span>
            </div>

            <div className="pt-2">
              <h3 className="text-slate-800 font-semibold mb-3">Industry Type:</h3>
              <div className="space-y-3 pl-1">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#16a34a] stroke-[3] shrink-0" />
                  <span className="text-[15px] font-semibold text-slate-900 leading-snug">Firms (incl. sole practitioners)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-5 h-5 text-slate-800 stroke-[2] shrink-0" />
                  <span className="text-[15px] font-semibold text-slate-900 leading-snug">Approved Government Organizations and Regulatory, Autonomous and Semi-Autonomous Bodies/Organizations</span>
                </div>
                <div className="flex items-start gap-3">
                  <Circle className="w-5 h-5 text-slate-800 stroke-[2] shrink-0" />
                  <span className="text-[15px] font-semibold text-slate-900 leading-snug">Approved Corporates</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="bg-[#fff4e5] rounded-xl p-5 border border-orange-50 flex items-start gap-4 shadow-sm h-[calc(50%-6px)]">
              <Calendar className="w-6 h-6 text-[#f59e0b] shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-700 font-medium mb-1">Contract Start Date:</div>
                <div className="text-slate-900 font-bold text-lg">{formattedStartDate}</div>
              </div>
            </div>
            <div className="bg-[#eef2fc] rounded-xl p-5 border border-blue-50 flex items-start gap-4 shadow-sm h-[calc(50%-6px)]">
              <Calendar className="w-6 h-6 text-[#3b82f6] shrink-0 mt-0.5" />
              <div>
                <div className="text-slate-700 font-medium mb-1">Contract End Date:</div>
                <div className="text-slate-900 font-bold text-lg">{formattedEndDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="">
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Work experience records
            </p>
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-sm font-medium text-white rounded hover:shadow-sm transition-shadow"
              style={{ backgroundColor: "var(--color-icab-red)" }}>
              + Add work experience
            </button>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 align-bottom bg-gray-700"
                rowSpan={2}>
                Start date
              </th>
              <th
                className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 align-bottom bg-gray-700"
                rowSpan={2}>
                End date
              </th>
              <th
                className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 bg-gray-700"
                colSpan={4}>
                Work experience gained (in days)
              </th>
              <th
                className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 align-bottom bg-gray-700"
                rowSpan={2}>
                Total
              </th>
              <th
                className="text-white text-xs font-semibold text-center px-3 py-3 align-bottom bg-gray-700"
                rowSpan={2}>
                Approved
              </th>
            </tr>
            <tr>
              <th className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 bg-gray-700">
                Days Worked
              </th>
              <th className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 bg-gray-700">
                Days in Stat. Audit
              </th>
              <th className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 bg-gray-700">
                Days in Other Audit
              </th>
              <th className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 bg-gray-700">
                Days in Non-Audit Services
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Data rows */}
            {periods.map((p) => (
              <tr
                key={p.id}
                className="bg-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-3 text-sm text-gray-700 ">
                  {p.startDate}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 ">
                  {p.endDate}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 text-center ">
                  {p.atPrimaryATE}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 text-center ">
                  {p.onSecondmentATE}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 text-center ">
                  {p.onSecondmentUnauth}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 text-center ">
                  {p.onSecondmentUnauth}
                </td>

                <td className="px-3 py-3 text-sm text-center ">
                  <div className="font-semibold text-gray-900">
                    {p.total} day(s)
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{p.status}</div>
                </td>
                <td className="px-3 py-3 text-sm text-center">
                  {p.status.toLowerCase() === "approved" ? (
                    <div className="flex justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
