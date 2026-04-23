import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ApprovalPreviewRow } from './approvals-preview-table';
import { ApprovalActions } from '../shared/approval-actions';
import { FeedbackThread } from '../shared/feedback-thread';
import { StatusBadge } from '../shared/status-badge';
import { useAdminData } from '@/hooks/use-admin-data';
import { toast } from 'sonner';

export interface ApprovalDetailSheetProps {
  record: ApprovalPreviewRow | null;
  onOpenChange: (open: boolean) => void;
}

export function ApprovalDetailSheet({ record, onOpenChange }: ApprovalDetailSheetProps) {
  const { updatePracticalPeriod, updateSkillRecord, updateEthicsScenario, students } = useAdminData();
  
  if (!record) return null;

  const student = students.find(s => s.id === record.studentId);

  const handleApprove = (feedback: string) => {
    if (record.type === 'Practical Experience') updatePracticalPeriod(record.id as string, { status: 'approved', principalFeedback: feedback });
    if (record.type === 'Skill Record') updateSkillRecord(record.id as string, { status: 'approved', principalFeedback: feedback });
    if (record.type === 'Ethics Scenario') updateEthicsScenario(record.id as string, { status: 'approved', principalFeedback: feedback });
    
    toast.success(`${record.type} approved successfully`);
    onOpenChange(false);
  };

  const handleRequestChanges = (feedback: string) => {
    if (record.type === 'Practical Experience') updatePracticalPeriod(record.id as string, { status: 'changes-requested', principalFeedback: feedback });
    if (record.type === 'Skill Record') updateSkillRecord(record.id as string, { status: 'changes-requested', principalFeedback: feedback });
    if (record.type === 'Ethics Scenario') updateEthicsScenario(record.id as string, { status: 'changes-requested', principalFeedback: feedback });
    
    toast.success("Changes requested");
    onOpenChange(false);
  };

  const renderContent = () => {
    if (record.type === 'Practical Experience') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Period</p>
              <p className="text-slate-900">{record.label as string}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Dates</p>
              <p className="text-slate-900">{record.startDate as string} to {record.endDate as string}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Days Worked</p>
              <p className="text-slate-900 font-semibold">{record.daysWorked as number}</p>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border space-y-2 mt-4">
            <h4 className="font-semibold text-sm border-b pb-2">Audit Days Breakdown</h4>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Statutory Audit</span>
              <span className="font-medium text-slate-900">{record.daysStatAudit as number}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Other Audit</span>
              <span className="font-medium text-slate-900">{record.daysOtherAudit as number}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Non-Audit</span>
              <span className="font-medium text-slate-900">{record.daysNonAudit as number}</span>
            </div>
          </div>
        </div>
      );
    }
    
    if (record.type === 'Skill Record') {
      const answers = record.guidedAnswers as Record<string, string>;
      return (
        <div className="space-y-4">
          <p className="font-medium text-slate-900">{record.periodLabel as string}</p>
          <div className="space-y-4 pt-4 border-t border-slate-100">
             {answers && Object.entries(answers).map(([k, v]) => (
               <div key={k}>
                 <span className="text-sm font-semibold capitalize text-slate-700 block mb-1">{k}</span>
                 <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded">{v}</div>
               </div>
             ))}
          </div>
        </div>
      );
    }

    if (record.type === 'Ethics Scenario') {
      const principles = record.principlesApplied as string[];
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">{record.dilemma as string}</h4>
          
          <div>
            <span className="text-sm font-medium text-slate-700 block mb-1">Scenario Details</span>
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded">{record.description as string}</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {principles && principles.map(p => (
              <span key={p} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs capitalize">{p.replace('-', ' ')}</span>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
             <div>
               <span className="text-sm font-semibold capitalize text-slate-700 block mb-1">Actions Taken</span>
               <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded">{record.actionsTaken as string}</div>
             </div>
             <div>
               <span className="text-sm font-semibold capitalize text-slate-700 block mb-1">Reflection</span>
               <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded">{record.reflection as string}</div>
             </div>
             <div>
               <span className="text-sm font-semibold capitalize text-slate-700 block mb-1">Justification</span>
               <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded">{record.justification as string}</div>
             </div>
          </div>
        </div>
      );
    }
    
    return <div className="text-slate-500 p-4 bg-slate-50 rounded-lg">Detailed view logic for {record.type} goes here.</div>;
  };

  return (
    <Sheet open={!!record} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px] overflow-y-auto w-full">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <SheetTitle>Review {record.type}</SheetTitle>
            <StatusBadge status={record.status} />
          </div>
          <SheetDescription>
            Submitted by <strong className="text-slate-900">{student?.name}</strong> &bull; {student?.studentNumber}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          {renderContent()}
          
          {/* Existing feedback thread — shown when changes were previously requested */}
          {!!record.principalFeedback && (
            <div className="border-t pt-4">
              <FeedbackThread
                feedback={record.principalFeedback as string}
                principalName={student?.name ?? 'Principal'}
                date="Previously sent"
              />
            </div>
          )}
          
          {/* Show actions for submitted + changes-requested (admin may need to re-approve or update feedback) */}
          {(record.status === 'submitted' || record.status === 'changes-requested') && (
            <div className="pt-6 border-t mt-6 bg-white flex justify-end">
              <ApprovalActions onApprove={handleApprove} onRequestChanges={handleRequestChanges} />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
