import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TechnicalModule } from '@/types';
import { StatusBadge } from '../shared/status-badge';
import { Calendar, CheckCircle2, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export interface TechnicalModuleCardProps {
  module: TechnicalModule;
  onBookAssessment: (module: TechnicalModule) => void;
  onStart: (module: TechnicalModule) => void;
  isAdminView?: boolean;
}

export function TechnicalModuleCard({ module, onBookAssessment, onStart, isAdminView }: TechnicalModuleCardProps) {
  const isCompleted = module.status === 'completed';
  const isPending = module.status === 'assessment-pending';
  
  return (
    <Card className={cn("flex flex-col h-full transition-shadow hover:shadow-md", isCompleted ? "bg-slate-50/50" : "")}>
      <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/30">
        <div className="flex justify-between items-start mb-2 gap-2">
          <StatusBadge status={module.status} />
          {module.score !== undefined && (
             <span className={cn("text-xs font-bold px-2 py-1 rounded", isCompleted ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700")}>
               Score: {module.score}%
             </span>
          )}
        </div>
        <CardTitle className="text-base leading-tight mt-1">{module.name}</CardTitle>
        <CardDescription className="text-xs">{module.iesReference}</CardDescription>
      </CardHeader>
      
      <CardContent className="py-4 flex-1">
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">{module.description}</p>
        {(module.attempts > 0 || module.lastAttemptAt) && (
          <div className="text-xs text-slate-500 space-y-1 bg-slate-100/50 p-2 rounded">
            <p className="font-medium text-slate-700">Assessment History</p>
            <p>Attempts: {module.attempts}</p>
            {module.lastAttemptAt && <p>Last attempt: {format(new Date(module.lastAttemptAt), 'MMM d, yyyy')}</p>}
          </div>
        )}
      </CardContent>

      {!isAdminView && (
        <CardFooter className="pt-0 pb-4">
          {isCompleted ? (
            <Button variant="outline" className="w-full text-green-700 border-green-200 bg-green-50 shadow-none" disabled>
              <CheckCircle2 className="mr-2 h-4 w-4" /> Passed
            </Button>
          ) : isPending ? (
            <Button variant="outline" className="w-full text-icab-clay border-icab-clay/30 shadow-none" disabled>
              Assessment Booked
            </Button>
          ) : (
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1 text-slate-700 shadow-sm" onClick={() => onStart(module)}>
                <PlayCircle className="mr-2 h-4 w-4" /> Review
              </Button>
              <Button onClick={() => onBookAssessment(module)} className="flex-1 bg-icab-red hover:bg-icab-wine text-white shadow-sm">
                <Calendar className="mr-2 h-4 w-4" /> Book Lab
              </Button>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
