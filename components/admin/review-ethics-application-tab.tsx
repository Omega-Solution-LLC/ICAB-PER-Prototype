import React from 'react';
import { ReviewTab } from '../shared/review-tab';
import { useAdminData } from '@/hooks/use-admin-data';
import { ApprovalActions } from '../shared/approval-actions';
import { FeedbackThread } from '../shared/feedback-thread';
import { StatusBadge } from '../shared/status-badge';
import { toast } from 'sonner';

export function ReviewEthicsApplicationTab({ studentId }: { studentId: string }) {
  const { allEthicsScenarios, updateEthicsScenario } = useAdminData();
  const scenarios = allEthicsScenarios.filter(s => s.studentId === studentId);

  const handleApprove = (id: string) => {
    toast.success("Ethics scenario approved");
    updateEthicsScenario(id, { status: 'approved' });
  };

  const handleRequestChanges = (id: string, feedback: string) => {
    toast.success("Changes requested");
    updateEthicsScenario(id, { status: 'changes-requested', principalFeedback: feedback });
  };

  if (scenarios.length === 0) {
    return (
      <ReviewTab title="Ethics Application Review" description="Review descriptive ethics scenarios.">
        <div className="p-8 text-center text-slate-500 border border-dashed rounded-lg bg-slate-50/50">
          No ethics scenarios submitted yet.
        </div>
      </ReviewTab>
    );
  }

  return (
    <ReviewTab title="Ethics Application Review" description="Review descriptive ethics scenarios.">
      <div className="space-y-6">
        {scenarios.map(scenario => (
          <div key={scenario.id} className="bg-white border rounded-lg overflow-hidden shadow-sm">
             <div className="bg-slate-50/50 p-4 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                 <h4 className="font-semibold text-slate-800">{scenario.dilemma}</h4>
                 <div className="text-sm text-slate-500 mt-1">{scenario.periodLabel}</div>
               </div>
               <StatusBadge status={scenario.status} />
             </div>
             
             <div className="p-4 space-y-5">
               <div>
                 <div className="font-medium text-slate-900 border-b pb-2 mb-2">Scenario Details</div>
                 <p className="text-sm text-slate-700">{scenario.description}</p>
               </div>
               
               <div>
                 <div className="font-medium text-slate-900 border-b pb-2 mb-2">Principles Applied</div>
                 <div className="flex gap-2 flex-wrap">
                   {scenario.principlesApplied.map(p => (
                     <span key={p} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs capitalize">{p.replace('-', ' ')}</span>
                   ))}
                 </div>
               </div>

               <div className="space-y-4 pt-2">
                 <div className="text-sm">
                   <span className="font-medium text-slate-900 block mb-1">Actions Taken</span>
                   <div className="text-slate-600 bg-slate-50 p-3 rounded">{scenario.actionsTaken}</div>
                 </div>
                 <div className="text-sm">
                   <span className="font-medium text-slate-900 block mb-1">Reflection</span>
                   <div className="text-slate-600 bg-slate-50 p-3 rounded">{scenario.reflection}</div>
                 </div>
                 <div className="text-sm">
                   <span className="font-medium text-slate-900 block mb-1">Justification</span>
                   <div className="text-slate-600 bg-slate-50 p-3 rounded">{scenario.justification}</div>
                 </div>
               </div>
               
               {scenario.principalFeedback && (
                 <div className="mt-4 pt-4 border-t border-slate-100">
                   <FeedbackThread feedback={scenario.principalFeedback} date={new Date().toISOString()} />
                 </div>
               )}
             </div>
             
             {(scenario.status === 'submitted' || scenario.status === 'changes-requested') && (
               <div className="bg-slate-50 p-4 border-t flex justify-end">
                 <ApprovalActions 
                   onApprove={() => handleApprove(scenario.id)}
                   onRequestChanges={(fb) => handleRequestChanges(scenario.id, fb)}
                 />
               </div>
             )}
          </div>
        ))}
      </div>
    </ReviewTab>
  );
}
