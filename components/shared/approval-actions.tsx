import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface ApprovalActionsProps {
  onApprove: () => void;
  onRequestChanges: (feedback: string) => void;
  isPending?: boolean;
}

export function ApprovalActions({ onApprove, onRequestChanges, isPending }: ApprovalActionsProps) {
  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmitChanges = () => {
    if (feedback.length >= 20) {
      onRequestChanges(feedback);
      setOpen(false);
      setFeedback('');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={
          <Button variant="outline" disabled={isPending} className="text-icab-wine border-icab-wine hover:bg-icab-blush">
            Request Changes
          </Button>
        } />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Provide feedback for the student (min 20 characters)</Label>
              <Textarea 
                id="feedback" 
                value={feedback} 
                onChange={(e) => setFeedback(e.target.value)} 
                placeholder="Explain what needs to be revised..." 
                className="min-h-[120px]"
              />
              {feedback.length > 0 && feedback.length < 20 && (
                <p className="text-xs text-icab-wine">Minimum 20 characters required. Currently: {feedback.length}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button 
              className="bg-icab-red hover:bg-icab-wine" 
              onClick={handleSubmitChanges} 
              disabled={feedback.length < 20 || isPending}
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Button 
        className="bg-green-600 hover:bg-green-700 text-white" 
        onClick={onApprove}
        disabled={isPending}
      >
        Approve
      </Button>
    </div>
  );
}
