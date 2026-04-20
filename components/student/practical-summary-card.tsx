import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/shared/stat-card";
import { Briefcase } from "lucide-react";

export function PracticalSummaryCard({ totalDays }: { totalDays: number }) {
  const percentage = Math.min(100, (totalDays / 450) * 100);
  
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-[1fr_2fr] items-stretch">
        <div className="border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
          <StatCard 
            label="Total PWE Days" 
            value={totalDays} 
            icon={Briefcase} 
            className="h-full border-0 shadow-none bg-transparent rounded-none"
          />
        </div>
        <CardContent className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex justify-between items-end mb-3">
            <span className="text-sm font-semibold text-slate-700">Progress to Minimum Requirement</span>
            <span className="text-sm font-bold text-icab-red">{totalDays} / 450 days</span>
          </div>
          <Progress value={percentage} className="h-3 bg-slate-100" />
          <p className="text-xs text-slate-500 mt-3 font-medium">
            Minimum 450 days of Practical Work Experience (PWE) required before contract completion.
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
