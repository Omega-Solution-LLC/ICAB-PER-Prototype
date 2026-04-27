import React from 'react';
import { ReviewTab } from '../shared/review-tab';
import { useAdminData } from '@/hooks/use-admin-data';
import { ApprovalActions } from '../shared/approval-actions';
import { FeedbackThread } from '../shared/feedback-thread';
import { StatusBadge } from '../shared/status-badge';
import { toast } from 'sonner';

export function ReviewSkillsTab({ studentId }: { studentId: string }) {
  const { allSkillRecords, updateSkillRecord } = useAdminData();
  const records = allSkillRecords.filter(s => s.studentId === studentId);

  const handleApprove = (id: string, feedback: string) => {
    toast.success("Skill record approved");
    updateSkillRecord(id, { status: 'approved', principalFeedback: feedback });
  };

  const handleRequestChanges = (id: string, feedback: string) => {
    toast.success("Changes requested");
    updateSkillRecord(id, { status: 'changes-requested', principalFeedback: feedback });
  };

  if (records.length === 0) {
    return (
      <ReviewTab title="Professional Skill Development Review" description="Review IES 3 professional skills records.">
        <div className="p-8 text-center text-slate-500 border border-dashed rounded-lg bg-slate-50/50">
          No skill records submitted yet.
        </div>
      </ReviewTab>
    );
  }

  return (
    <ReviewTab title="Professional Skill Development Review" description="Review IES 3 professional skills records.">
      <div className="space-y-6">
        {records.map(record => (
          <div key={record.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
             <div className="bg-slate-50/50 p-4 border-b flex justify-between items-center">
               <div>
                 <h4 className="font-semibold text-slate-800">{record.periodLabel}</h4>
                 <div className="text-sm text-slate-500 mt-1">Skill Area ID: {record.skillAreaId}</div>
               </div>
               <StatusBadge status={record.status} />
             </div>
             
             <div className="p-4 space-y-4">
               {Object.entries(record.guidedAnswers).map(([qKey, answer]) => (
                 <div key={qKey} className="text-sm">
                   <div className="font-medium text-slate-700 capitalize mb-1">{qKey}</div>
                   <div className="text-slate-600 bg-slate-50 p-3 rounded">{answer as string}</div>
                 </div>
               ))}
               
               {record.principalFeedback && (
                 <div className="mt-4 pt-4 border-t border-slate-100">
                   <FeedbackThread feedback={record.principalFeedback} date={new Date().toISOString()} />
                 </div>
               )}
             </div>
             
             {(record.status === 'submitted' || record.status === 'changes-requested') && (
               <div className="bg-slate-50 p-4 border-t flex justify-end">
                 <ApprovalActions 
                   onApprove={(fb) => handleApprove(record.id, fb)}
                   onRequestChanges={(fb) => handleRequestChanges(record.id, fb)}
                 />
               </div>
             )}
          </div>
        ))}
      </div>
    </ReviewTab>
  );
}
