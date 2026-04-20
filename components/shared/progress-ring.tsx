import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  colorClass?: string;
  className?: string;
}

/**
 * ProgressRing — circular progress indicator.
 * @example
 *   <ProgressRing value={75} label="75%" sublabel="Complete" />
 */
export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  colorClass = "text-icab-red",
  className
}: ProgressRingProps) {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-icab-blush"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      {(label || sublabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {label && <span className="text-xl font-bold text-icab-slate">{label}</span>}
          {sublabel && <span className="text-sm font-medium text-slate-500">{sublabel}</span>}
        </div>
      )}
    </div>
  );
}
