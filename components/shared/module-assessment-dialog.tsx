import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';

export interface ModuleAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleName?: string;
  onComplete: (score: number) => Promise<void>;
}

const MOCK_QUESTIONS = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  text: `Question ${i + 1}: Which of the following is the most appropriate action or principle related to the concepts covered in this module?`,
  options: [
    { id: 'A', text: 'Apply professional skepticism and verify the source documents.' },
    { id: 'B', text: 'Document the findings and report to the engagement partner.' },
    { id: 'C', text: 'Ensure compliance with the relevant IFRS and local regulations.' },
    { id: 'D', text: 'All of the above are valid considerations.' }
  ]
}));

export function ModuleAssessmentDialog({ open, onOpenChange, moduleName, onComplete }: ModuleAssessmentDialogProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isPending, setIsPending] = useState(false);

  // Reset answers when opened
  useEffect(() => {
    if (open) {
      setAnswers({});
      setIsPending(false);
    }
  }, [open]);

  const handleSelect = (questionId: number, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const isComplete = Object.keys(answers).length === MOCK_QUESTIONS.length;

  const handleSubmit = async () => {
    if (!isComplete) return;
    setIsPending(true);
    try {
      // Simulate fake processing and a fake score
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const fakeScore = Math.floor(Math.random() * 20) + 80; // Random passing score between 80-100
      await onComplete(fakeScore);
      onOpenChange(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Module Assessment: {moduleName}</DialogTitle>
          <DialogDescription className="mt-2">
            Please answer all 10 questions to complete this module. This is a closed-book assessment.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 pr-4 -mr-4 custom-scrollbar">
          <div className="space-y-8">
            {MOCK_QUESTIONS.map((q) => (
              <div key={q.id} className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="font-medium text-slate-800">{q.text}</p>
                <div className="space-y-2 pl-2">
                  {q.options.map((opt) => (
                    <label 
                      key={opt.id} 
                      className={`flex items-start gap-3 p-3 rounded-md cursor-pointer border transition-colors ${
                        answers[q.id] === opt.id 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.id}
                        checked={answers[q.id] === opt.id}
                        onChange={() => handleSelect(q.id, opt.id)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-slate-700 leading-snug">{opt.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 mt-4 pt-4 border-t border-slate-100">
          <div className="flex-1 flex items-center text-sm text-slate-500">
            Answered: {Object.keys(answers).length} / {MOCK_QUESTIONS.length}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button 
            className="bg-icab-red hover:bg-icab-wine text-white" 
            onClick={handleSubmit} 
            disabled={!isComplete || isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Submitting..." : "Submit Assessment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
