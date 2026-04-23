import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface ApprovalActionsProps {
  onApprove: (feedback: string) => void;
  onRequestChanges: (feedback: string) => void;
  isPending?: boolean;
}

export function ApprovalActions({ onApprove, onRequestChanges, isPending }: ApprovalActionsProps) {
  const [feedback, setFeedback] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'request-changes' | null>(null);

  const minChars = actionType === 'approve' ? 5 : 20;

  const handleSubmit = () => {
    if (feedback.length >= minChars) {
      if (actionType === 'approve') onApprove(feedback);
      if (actionType === 'request-changes') onRequestChanges(feedback);
      setActionType(null);
      setFeedback('');
    }
  };

  const handleClose = () => {
    setActionType(null);
    setFeedback('');
  };

  return (
    <div className="flex items-center gap-3">
      <Dialog open={!!actionType} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? "Approve Submission" : "Request Changes"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">
                Provide feedback for the student (min {minChars} characters)
              </Label>
              <Textarea 
                id="feedback" 
                value={feedback} 
                onChange={(e) => setFeedback(e.target.value)} 
                placeholder={actionType === 'approve' ? "E.g., Great job, looks complete." : "Explain what needs to be revised..."} 
                className="min-h-[120px]"
              />
              {feedback.length > 0 && feedback.length < minChars && (
                <p className="text-xs text-icab-wine">Minimum {minChars} characters required. Currently: {feedback.length}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button 
              className={actionType === 'approve' ? "bg-green-600 hover:bg-green-700 text-white" : "bg-icab-red hover:bg-icab-wine text-white"} 
              onClick={handleSubmit} 
              disabled={feedback.length < minChars || isPending}
            >
              {actionType === 'approve' ? "Submit Approval" : "Submit Feedback"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Button 
        variant="outline" 
        onClick={() => setActionType('request-changes')}
        disabled={isPending} 
        className="text-icab-wine border-icab-wine hover:bg-icab-blush"
      >
        Request Changes
      </Button>

      <Button 
        className="bg-green-600 hover:bg-green-700 text-white" 
        onClick={() => setActionType('approve')}
        disabled={isPending}
      >
        Approve
      </Button>
    </div>
  );
}
