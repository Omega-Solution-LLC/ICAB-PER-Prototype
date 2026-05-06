"use client";
import React from 'react';

import { useState } from "react";
import { Briefcase, User, Calendar, Check, Circle, ShieldCheck } from "lucide-react";
import { useStudentData } from "@/hooks/use-student-data";
import { format } from "date-fns";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { PracticalPeriodForm, PracticalPeriodFormData } from "@/components/student/practical-period-form";
import { StatusBadge } from "@/components/shared/status-badge";
import { AuditEngagementForm, AuditEngagementFormData } from "@/components/student/audit-engagement-form";
import { toast } from "sonner";

export default function PracticalWorkExperience() {
  const { 
    firmName, 
    principalName, 
    contractStartDate, 
    contractEndDate,
    practicalPeriods,
    addPracticalPeriod,
    auditEngagements,
    addAuditEngagement
  } = useStudentData();
  
  const formattedStartDate = contractStartDate ? format(new Date(contractStartDate), "d MMM yyyy") : "";
  const formattedEndDate = contractEndDate ? format(new Date(contractEndDate), "d MMM yyyy") : "";

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isStatAuditFormOpen, setIsStatAuditFormOpen] = useState(false);
  const [isOtherAuditFormOpen, setIsOtherAuditFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("work");

  // General PWE Calculation
  const totalPWEDays = practicalPeriods.reduce((sum, p) => sum + (p.daysWorked || 0), 0);
  const pwePct = Math.min((totalPWEDays / 450) * 100, 100);

  // AQ Calculation using new data structure (or a combination)
  const legacyStatDays = practicalPeriods.reduce((sum, p) => sum + (p.daysStatAudit || 0), 0);
  const legacyOtherDays = practicalPeriods.reduce((sum, p) => sum + (p.daysOtherAudit || 0), 0);
  
  const statutoryAudits = (auditEngagements || []).filter(a => a.type === 'statutory');
  const otherAudits = (auditEngagements || []).filter(a => a.type === 'other');
  
  const formStatDays = statutoryAudits.reduce((sum, a) => sum + a.daysWorked, 0);
  const formOtherDays = otherAudits.reduce((sum, a) => sum + a.daysWorked, 0);

  const totalStatAuditDays = legacyStatDays + formStatDays;
  const totalOtherAuditDays = legacyOtherDays + formOtherDays;
  const totalAuditDays = totalStatAuditDays + totalOtherAuditDays;
  
  const statAuditPct = Math.min((totalStatAuditDays / 110) * 100, 100);
  const totalAuditPct = Math.min((totalAuditDays / 220) * 100, 100);

  const handleAddSubmit = async (data: PracticalPeriodFormData) => {
    addPracticalPeriod({
      studentId: 's1', // Prototype defaults to s1
      label: data.label,
      startDate: data.startDate,
      endDate: data.endDate,
      daysWorked: data.daysWorked,
      daysStatAudit: 0,
      daysOtherAudit: 0,
      daysNonAudit: 0,
      submittedAt: new Date().toISOString()
    });
    toast.success("Work experience period added successfully");
  };

  const handleAddStatAudit = async (data: AuditEngagementFormData) => {
      addAuditEngagement({
          studentId: 's1',
          type: 'statutory',
          ...data
      });
      toast.success("Statutory Audit added successfully");
  };

  const handleAddOtherAudit = async (data: AuditEngagementFormData) => {
    addAuditEngagement({
        studentId: 's1',
        type: 'other',
        ...data
    });
    toast.success("Other Audit added successfully");
};

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-sans space-y-8">
      {/* Title & General Progress */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Practical Work Experience (PWE)
        </h2>
        
        <div className="flex items-center gap-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall PWE Progress</span>
              <span className="text-sm font-medium text-gray-600">{totalPWEDays} / 450 days</span>
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
      <div>
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

      {/* Audit Qualification Progress Section */}
      <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
        <div className="bg-blue-50/50 px-5 py-4 border-b border-blue-100 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-900">Audit Qualification (AQ) Progress</h3>
            <p className="text-xs text-blue-700">Track your statutory and general audit experience separately.</p>
          </div>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Statutory Audit Work</span>
              <span className="text-sm font-medium text-slate-600">{totalStatAuditDays} / 110 days</span>
            </div>
            <Progress value={statAuditPct} className="w-full">
              <ProgressTrack className="bg-slate-100 h-2">
                <ProgressIndicator className="bg-blue-600" />
              </ProgressTrack>
            </Progress>
            <p className="text-xs text-slate-500 mt-2">Minimum 110 days required in Statutory Audit.</p>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Total Audit Work</span>
              <span className="text-sm font-medium text-slate-600">{totalAuditDays} / 220 days</span>
            </div>
            <Progress value={totalAuditPct} className="w-full">
              <ProgressTrack className="bg-slate-100 h-2">
                <ProgressIndicator className="bg-indigo-600" />
              </ProgressTrack>
            </Progress>
            <p className="text-xs text-slate-500 mt-2">Minimum 220 days total audit experience (Statutory + Other).</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("work")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "work" ? "border-icab-red text-icab-red" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          style={activeTab === "work" ? { borderColor: "var(--color-icab-red)", color: "var(--color-icab-red)" } : {}}
        >
          Work Experience Records
        </button>
        <button
          onClick={() => setActiveTab("stat")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "stat" ? "border-icab-red text-icab-red" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          style={activeTab === "stat" ? { borderColor: "var(--color-icab-red)", color: "var(--color-icab-red)" } : {}}
        >
          Statutory Audit
        </button>
        <button
          onClick={() => setActiveTab("other")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "other" ? "border-icab-red text-icab-red" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          style={activeTab === "other" ? { borderColor: "var(--color-icab-red)", color: "var(--color-icab-red)" } : {}}
        >
          Other Audit
        </button>
      </div>

      {activeTab === "work" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              Work experience records
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white rounded-md hover:shadow-md transition-all hover:bg-icab-wine"
              style={{ backgroundColor: "var(--color-icab-red)" }}>
              + Add work experience
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">Period</th>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">Start date</th>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">End date</th>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">Days Worked</th>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">Status</th>
                </tr>
              </thead>
              <tbody>
                {practicalPeriods.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500 text-sm">
                      No records found. Click "Add work experience" to log a period.
                    </td>
                  </tr>
                ) : (
                  practicalPeriods.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-center font-medium text-gray-900">{p.label}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-600">{format(new Date(p.startDate), "d MMM yyyy")}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-600">{format(new Date(p.endDate), "d MMM yyyy")}</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900">{p.daysWorked}</td>
                      <td className="px-4 py-3 text-sm text-center"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "stat" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              Statutory Audit Records
            </p>
            <button
              onClick={() => setIsStatAuditFormOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white rounded-md hover:shadow-md transition-all hover:bg-icab-wine"
              style={{ backgroundColor: "var(--color-icab-red)" }}>
              + Add Statutory Audit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-gray-600 text-xs font-semibold text-left px-4 py-3 border-b border-gray-200 bg-gray-50/50">Client Name</th>
                  <th className="text-gray-600 text-xs font-semibold text-left px-4 py-3 border-b border-gray-200 bg-gray-50/50">Dates</th>
                  <th className="text-gray-600 text-xs font-semibold text-left px-4 py-3 border-b border-gray-200 bg-gray-50/50">Role</th>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">Days</th>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">Status</th>
                </tr>
              </thead>
              <tbody>
                {statutoryAudits.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500 text-sm">
                      No statutory audit records found. Click "Add Statutory Audit" to log one.
                    </td>
                  </tr>
                ) : (
                  statutoryAudits.map((a) => (
                    <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-left font-medium text-gray-900">{a.clientName}</td>
                      <td className="px-4 py-3 text-sm text-left text-gray-600">{format(new Date(a.startDate), "MMM yyyy")} - {format(new Date(a.endDate), "MMM yyyy")}</td>
                      <td className="px-4 py-3 text-sm text-left text-gray-600">{a.role}</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900">{a.daysWorked}</td>
                      <td className="px-4 py-3 text-sm text-center"><StatusBadge status={a.status || 'draft'} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "other" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wide">
              Other Audit Records
            </p>
            <button
              onClick={() => setIsOtherAuditFormOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white rounded-md hover:shadow-md transition-all hover:bg-icab-wine"
              style={{ backgroundColor: "var(--color-icab-red)" }}>
              + Add Other Audit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-gray-600 text-xs font-semibold text-left px-4 py-3 border-b border-gray-200 bg-gray-50/50">Client Name</th>
                  <th className="text-gray-600 text-xs font-semibold text-left px-4 py-3 border-b border-gray-200 bg-gray-50/50">Dates</th>
                  <th className="text-gray-600 text-xs font-semibold text-left px-4 py-3 border-b border-gray-200 bg-gray-50/50">Role</th>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">Days</th>
                  <th className="text-gray-600 text-xs font-semibold text-center px-4 py-3 border-b border-gray-200 bg-gray-50/50">Status</th>
                </tr>
              </thead>
              <tbody>
                {otherAudits.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500 text-sm">
                      No other audit records found. Click "Add Other Audit" to log one.
                    </td>
                  </tr>
                ) : (
                  otherAudits.map((a) => (
                    <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-left font-medium text-gray-900">{a.clientName}</td>
                      <td className="px-4 py-3 text-sm text-left text-gray-600">{format(new Date(a.startDate), "MMM yyyy")} - {format(new Date(a.endDate), "MMM yyyy")}</td>
                      <td className="px-4 py-3 text-sm text-left text-gray-600">{a.role}</td>
                      <td className="px-4 py-3 text-sm text-center font-semibold text-gray-900">{a.daysWorked}</td>
                      <td className="px-4 py-3 text-sm text-center"><StatusBadge status={a.status || 'draft'} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Forms */}
      <PracticalPeriodForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmit={handleAddSubmit} 
      />
      <AuditEngagementForm
        open={isStatAuditFormOpen}
        onOpenChange={setIsStatAuditFormOpen}
        onSubmit={handleAddStatAudit}
        title="Statutory Audit"
      />
      <AuditEngagementForm
        open={isOtherAuditFormOpen}
        onOpenChange={setIsOtherAuditFormOpen}
        onSubmit={handleAddOtherAudit}
        title="Other Audit"
      />
    </div>
  );
}
