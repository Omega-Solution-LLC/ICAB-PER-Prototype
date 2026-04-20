import React from "react";
import { SectionCard } from "./section-card";
import { ProgressRing } from "./progress-ring";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface PillarProgressCardProps {
  title: string;
  description?: string;
  value: number; // 0-100 percentage or raw value (used as percentage in ring unless handled)
  progressLabel?: string;
  progressSublabel?: string;
  href: string;
  actionLabel?: string;
}

/**
 * PillarProgressCard — dashboard card for a pillar's progress.
 * @example
 *   <PillarProgressCard title="Practical" description="Requirement" value={50} href="/" />
 */
export function PillarProgressCard({
  title,
  description,
  value,
  progressLabel,
  progressSublabel,
  href,
  actionLabel = "View Details"
}: PillarProgressCardProps) {
  return (
    <SectionCard title={title} description={description} className="flex flex-col h-full bg-white">
      <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-[160px]">
        <ProgressRing 
          value={value} 
          label={progressLabel || `${Math.round(value)}%`} 
          sublabel={progressSublabel} 
          size={110}
        />
      </div>
      <div className="mt-auto pt-4 flex justify-center border-t border-slate-100">
        <Link 
          href={href} 
          className={cn(buttonVariants({ variant: "outline" }), "w-full text-icab-red hover:text-icab-red/90 hover:bg-icab-blush/30 border-icab-rose/30")}
        >
          {actionLabel}
        </Link>
      </div>
    </SectionCard>
  );
}
