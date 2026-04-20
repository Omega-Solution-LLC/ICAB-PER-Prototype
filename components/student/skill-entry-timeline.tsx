import React from 'react';
import { useStudentData } from '@/hooks/use-student-data';
import { StatusBadge } from '../shared/status-badge';
import { FeedbackThread } from '../shared/feedback-thread';
import { Card } from '@/components/ui/card';

export interface SkillEntryTimelineProps {
  skillAreaId: string;
}

export function SkillEntryTimeline({ skillAreaId }: SkillEntryTimelineProps) {
  const { skillRecords } = useStudentData();
  const records = skillRecords.filter(r => r.skillAreaId === skillAreaId);

  if (records.length === 0) {
    return (
      <div className="py-12 mt-6 text-center bg-slate-50/80 rounded-lg border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium text-sm">No entries logged for this skill area yet.</p>
        <p className="text-slate-400 text-xs mt-1">Click &quot;Add Entry&quot; to document a scenario demonstrating this skill.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      <div className="relative border-l-[3px] border-slate-100 ml-4 pl-8 space-y-8 pb-4">
        {records.map((record) => (
          <div key={record.id} className="relative">
            {/* Timeline dot */}
            <div className="absolute -left-[43px] bg-white border-[3px] border-icab-rose rounded-full h-[18px] w-[18px] mt-1.5 shadow-sm" />
            
            <Card className="p-6 overflow-hidden shadow-sm hover:shadow-md border-slate-200 transition-shadow bg-white">
              <div className="flex justify-between items-start mb-6">
                <h4 className="font-semibold text-slate-900 border-b-2 border-icab-rose/30 pb-1 pr-4 inline-block">Period: {record.periodLabel}</h4>
                <StatusBadge status={record.status} />
              </div>

              <div className="space-y-5">
                {Object.entries(record.guidedAnswers).map(([key, answer]) => (
                  <div key={key} className="bg-slate-50 p-3 rounded border border-slate-100">
                    <p className="text-xs font-bold text-icab-slate uppercase tracking-wider mb-1.5 opacity-80">
                      {key.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{answer}</p>
                  </div>
                ))}
              </div>

              {record.principalFeedback && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <FeedbackThread feedback={record.principalFeedback} />
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
