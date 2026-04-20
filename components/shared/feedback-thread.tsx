import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export interface FeedbackThreadProps {
  feedback?: string;
  principalName?: string;
  date?: string;
}

/**
 * FeedbackThread — Displays principal feedback securely and consistently.
 */
export function FeedbackThread({ feedback, principalName = "Principal", date = "Recently" }: FeedbackThreadProps) {
  if (!feedback) return null;

  return (
    <div className="space-y-4 mt-6">
      <h4 className="text-sm font-semibold text-icab-slate">Feedback Thread</h4>
      <Card className="p-4 bg-slate-50/50 border-l-4 border-l-icab-rose shadow-sm">
        <div className="flex items-start gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-icab-blush text-icab-red text-xs font-semibold">
              {principalName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
              <p className="text-sm font-medium text-slate-900">{principalName}</p>
              <span className="text-xs text-slate-500">{date}</span>
            </div>
            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed mt-2">
              {feedback}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
