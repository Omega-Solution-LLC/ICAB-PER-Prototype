import React from 'react';
import { SectionCard } from '../shared/section-card';
import { ProgressBarWithLabel } from '../shared/progress-bar-with-label';

export interface AnnualRequirementTrackerProps {
  completedThisYear: number;
}

export function AnnualRequirementTracker({ completedThisYear }: AnnualRequirementTrackerProps) {
  const target = 4;
  const isMet = completedThisYear >= target;

  return (
    <SectionCard className="bg-icab-blush/30 border-icab-rose/20 shadow-sm">
      <div className="p-2 sm:p-2">
        <h3 className="text-base font-semibold text-icab-slate mb-2">Annual Module Target</h3>
        <p className="text-sm text-slate-600 mb-5">
          You must complete at least 4 technical modules (IES 2) in your current contract year to remain compliant with ICAB regulations.
        </p>
        <ProgressBarWithLabel 
          value={completedThisYear} 
          total={target} 
          label={isMet ? "Requirement Met for Year 1" : "Modules Completed This Year"} 
          className="mb-3"
        />
        {isMet && <p className="text-sm font-semibold text-green-600 mt-2">✓ You are on track for this year.</p>}
      </div>
    </SectionCard>
  );
}
