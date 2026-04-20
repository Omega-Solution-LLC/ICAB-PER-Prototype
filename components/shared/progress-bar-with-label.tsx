import React from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface ProgressBarWithLabelProps {
  value: number; // Current value 
  total: number; // Total value
  label: string; 
  className?: string;
  hideCounts?: boolean;
}

/**
 * ProgressBarWithLabel - Progress visualization with descriptive text.
 */
export function ProgressBarWithLabel({ value, total, label, className, hideCounts = false }: ProgressBarWithLabelProps) {
  const percentage = Math.min(100, Math.max(0, (total > 0 ? (value / total) * 100 : 0)));

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-end text-sm font-medium">
        <span className="text-slate-700">{label}</span>
        {!hideCounts && <span className="font-bold text-icab-red">{value} / {total}</span>}
      </div>
      <Progress value={percentage} className="h-2 bg-slate-100" />
    </div>
  );
}
