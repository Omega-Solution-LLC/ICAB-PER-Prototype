import React from 'react';
import { ReviewTab } from '../shared/review-tab';
import { useAdminData } from '@/hooks/use-admin-data';
import { ApprovalActions } from '../shared/approval-actions';
import { FeedbackThread } from '../shared/feedback-thread';
import { StatusBadge } from '../shared/status-badge';
import { toast } from 'sonner';

export function ReviewEthicsApplicationTab({ studentId }: { studentId: string }) {
  const { allEthicsApplications, updateEthicsApplication } = useAdminData();
  const applications = allEthicsApplications.filter(s => s.studentId === studentId);

  const handleApprove = (id: string, feedback: string) => {
    toast.success("Ethics application approved");
    updateEthicsApplication(id, { status: 'approved', principalFeedback: feedback });
  };

  const handleRequestChanges = (id: string, feedback: string) => {
    toast.success("Changes requested");
    updateEthicsApplication(id, { status: 'changes-requested', principalFeedback: feedback });
  };

  if (applications.length === 0) {
    return (
      <ReviewTab title="Ethics Application Review" description="Review bi-annual ethics reflections.">
        <div className="p-8 text-center text-slate-500 border border-dashed rounded-lg bg-slate-50/50">
          No ethics applications submitted yet.
        </div>
      </ReviewTab>
    );
  }

  return (
    <ReviewTab title="Ethics Application Review" description="Review bi-annual ethics reflections.">
      <div className="space-y-6">
        {applications.map(app => (
          <div key={app.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
             <div className="bg-slate-50/50 p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                 <h4 className="font-semibold text-slate-800">{app.periodLabel}</h4>
                 <div className="text-sm text-slate-500 mt-1">Submitted on: {app.submittedAt}</div>
               </div>
               <StatusBadge status={app.status} />
             </div>
             
             <div className="p-4 space-y-5">
               {Object.entries(app.answers).map(([qId, answer], i) => (
                 <div key={qId}>
                   <div className="font-medium text-slate-900 border-b pb-2 mb-2">Question {i + 1}</div>
                   <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded">{answer}</p>
                 </div>
               ))}
               
               {app.principalFeedback && (
                 <div className="mt-4 pt-4 border-t border-slate-100">
                   <FeedbackThread feedback={app.principalFeedback} date={new Date().toISOString()} />
                 </div>
               )}
             </div>
             
             {(app.status === 'submitted' || app.status === 'changes-requested') && (
               <div className="bg-slate-50 p-4 border-t flex justify-end">
                 <ApprovalActions 
                   onApprove={(fb) => handleApprove(app.id, fb)}
                   onRequestChanges={(fb) => handleRequestChanges(app.id, fb)}
                 />
               </div>
             )}
          </div>
        ))}
      </div>
    </ReviewTab>
  );
}
