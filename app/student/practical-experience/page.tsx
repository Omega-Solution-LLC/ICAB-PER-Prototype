"use client";

import { useState } from "react";

const initialPeriods = [
  {
    id: 1,
    startDate: "10 Dec 2020",
    endDate: "09 Jun 2021",
    atPrimaryATE: 81,
    onSecondmentATE: 0,
    onSecondmentUnauth: 0,
    total: 81,
    status: "Pending Confirmation",
    reviewer: "A Smith",
  },
];

export default function PracticalWorkExperience() {
  const [periods, setPeriods] = useState(initialPeriods);

  const targetDays = 450;
  const totalDays = periods.reduce((sum, p) => sum + p.total, 0);
  const totalAtPrimary = periods.reduce((sum, p) => sum + p.atPrimaryATE, 0);
  const totalSecondmentATE = periods.reduce(
    (sum, p) => sum + p.onSecondmentATE,
    0,
  );
  const totalSecondmentUnauth = periods.reduce(
    (sum, p) => sum + p.onSecondmentUnauth,
    0,
  );

  const pct = (val) =>
    totalDays > 0 ? ((val / totalDays) * 100).toFixed(2) : "0.00";

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
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">
          Practical work experience
        </h2>
      </div>

      {/* Summary Bar */}
      <div className="mb-6 border border-gray-200">
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Progress Summary
          </p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {[
                "Total",
                "At primary ATE",
                "On secondment at another ATE",
                "On secondment at unauthorised employer",
              ].map((h) => (
                <th
                  key={h}
                  className="bg-gray-700 text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center px-4 py-4 border-r border-gray-200">
                <div className=" text-2xl font-semibold">{totalDays}</div>
                <div className=" text-xs mt-1">/ {targetDays}</div>
              </td>
              <td className="bg-white text-center px-4 py-4 border-r border-gray-200">
                <div className="text-lg font-semibold text-gray-900">
                  {pct(totalAtPrimary)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {totalAtPrimary} days
                </div>
              </td>
              <td className="bg-white text-center px-4 py-4 border-r border-gray-200">
                <div className="text-lg font-semibold text-gray-900">
                  {pct(totalSecondmentATE)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {totalSecondmentATE} days
                </div>
              </td>
              <td className="bg-white text-center px-4 py-4">
                <div className="text-lg font-semibold text-gray-900">
                  {pct(totalSecondmentUnauth)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {totalSecondmentUnauth} days
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Main Table */}
      <div className="border border-gray-200">
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Practical experience records
          </p>
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
                Practical work experience gained (in days)
              </th>
              <th
                className="text-white text-xs font-semibold text-center px-3 py-3 border-r border-gray-200 align-bottom bg-gray-700"
                rowSpan={2}>
                Total
              </th>
              <th
                className="text-white text-xs font-semibold text-center px-3 py-3 align-bottom bg-gray-700"
                rowSpan={2}>
                Reviewer
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
            {/* Add button row */}
            <tr>
              <td
                colSpan={8}
                className="px-5 py-3 bg-white border-b border-gray-200">
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 text-sm font-medium text-white rounded hover:shadow-sm transition-shadow"
                  style={{ backgroundColor: "var(--color-icab-red)" }}>
                  + Add practical work experience
                </button>
              </td>
            </tr>

            {/* Data rows */}
            {periods.map((p) => (
              <tr
                key={p.id}
                className="bg-white hover:bg-gray-50 transition-colors">
                <td className="px-3 py-3 text-sm text-gray-700 border-b border-gray-200">
                  {p.startDate}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 border-b border-gray-200">
                  {p.endDate}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 text-center border-b border-gray-200">
                  {p.atPrimaryATE}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 text-center border-b border-gray-200">
                  {p.onSecondmentATE}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 text-center border-b border-gray-200">
                  {p.onSecondmentUnauth}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 text-center border-b border-gray-200">
                  {p.onSecondmentUnauth}
                </td>

                <td className="px-3 py-3 text-sm text-center border-b border-gray-200">
                  <div className="font-semibold text-gray-900">
                    {p.total} day(s)
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{p.status}</div>
                </td>
                <td className="px-3 py-3 text-sm border-b border-gray-200">
                  <div className="font-medium text-gray-900">{p.reviewer}</div>
                  <button
                    className="text-xs mt-1 cursor-pointer bg-transparent border-none p-0 hover:underline"
                    style={{ color: "var(--color-icab-red)" }}
                    onClick={() => {}}>
                    Change person
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
