import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GuidedQuestionForm } from '../shared/guided-question-form';
import { SKILL_GUIDED_QUESTIONS } from '@/lib/constants';
import { toast } from 'sonner';

export interface SkillEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skillName: string;
  onSave: (data: Record<string, string>, periodLabel: string) => Promise<void>;
}

export function SkillEntryDialog({ open, onOpenChange, skillName, onSave }: SkillEntryDialogProps) {
  const handleSubmit = async (data: Record<string, string>) => {
    try {
      // In a real app we'd also prompt for "periodLabel" in this form
      // Here we assume "Year 1 H2" as default entry period for demo.
      await onSave(data, "Year 1 H2");
      toast.success("Skill record submitted for approval");
      onOpenChange(false);
    } catch {
      toast.error("Failed to submit skill record.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Document Skill: {skillName}</DialogTitle>
          <DialogDescription className="text-sm mt-1.5">
            Use the STAR framework (Situation, Task, Action, Result) to document your experience for this skill area.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 mt-2">
          <GuidedQuestionForm 
            questions={SKILL_GUIDED_QUESTIONS} 
            onSubmit={handleSubmit}
            submitLabel="Submit Record"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
