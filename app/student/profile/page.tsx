"use client";

import { useStudentData } from "@/hooks/use-student-data";
import React from "react";
import { toast } from "sonner";

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b border-gray-200 last:border-0">
    <span className="font-medium text-gray-900 text-sm">{label}</span>
    <span className="text-gray-600 text-sm font-normal mt-1 sm:mt-0">
      {value}
    </span>
  </div>
);

export default function StudentProfile() {
  const { student } = useStudentData();

  if (!student) return null;

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* ── Title with Action ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1
              className="text-3xl font-semibold"
              style={{ color: "var(--color-icab-red)" }}>
              My Profile
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your personal and contract information
            </p>
          </div>
          <button
            onClick={() => toast.info("Update request sent to ICAB admin.")}
            className="mt-4 sm:mt-0 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 transition-colors">
            Request Update
          </button>
        </div>

        {/* ── Personal Information ── */}
        <div className="border border-gray-200 mb-6">
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            Personal Information
          </div>
          <div className="bg-gray-50 px-5 py-5">
            <InfoRow label="Full Name" value={student.name} />
            <InfoRow label="Email Address" value={student.email} />
            <InfoRow label="Phone Number" value="+880 1711-223344" />
          </div>
        </div>

        {/* ── Enrollment Details ── */}
        <div className="border border-gray-200 mb-6">
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            Enrollment Details
          </div>
          <div className="bg-gray-50 px-5 py-5">
            <InfoRow
              label="Student Registration Number"
              value={student.studentNumber}
            />
            <InfoRow label="Enrollment Date" value={student.enrollmentDate} />
            <InfoRow
              label="Status"
              value={
                <span className="text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded text-xs">
                  Active
                </span>
              }
            />
          </div>
        </div>

        {/* ── Firm & Principal ── */}
        <div className="border border-gray-200">
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            Firm & Principal
          </div>
          <div className="bg-gray-50 px-5 py-5">
            <InfoRow label="Accounting Firm" value={student.firmName} />
            <InfoRow label="Principal Name" value="Sabbir Hosen FCA" />
            <InfoRow
              label="Contract Start Date"
              value={student.contractStartDate}
            />
            <InfoRow
              label="Contract End Date"
              value={student.contractEndDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
