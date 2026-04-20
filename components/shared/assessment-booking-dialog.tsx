import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar } from 'lucide-react';

export interface AssessmentBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  moduleName?: string;
  moduleType: 'technical' | 'ethics';
  onBook: (date: string) => Promise<void>;
}

/**
 * AssessmentBookingDialog simulating ICAB Lab booking.
 */
export function AssessmentBookingDialog({ open, onOpenChange, moduleName, moduleType, onBook }: AssessmentBookingDialogProps) {
  const [date, setDate] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleBook = async () => {
    if (!date) return;
    setIsPending(true);
    try {
      await onBook(date);
      onOpenChange(false);
      setDate("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Assessment</DialogTitle>
          <DialogDescription className="mt-2">
            Select a preferred date for your {moduleType === 'technical' ? 'IES 2' : 'Ethics'} {moduleName ? `assessment for ${moduleName}` : 'lab assessment'}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assessment-date">Assessment Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                id="assessment-date" 
                type="date" 
                className="pl-10" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <p className="text-xs text-slate-500">Dates are subject to ICAB Lab availability.</p>
            {!date && (
              <p className="text-xs text-icab-wine font-medium">Please select a date to confirm booking.</p>
            )}
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button 
            className="bg-icab-red hover:bg-icab-wine text-white" 
            onClick={handleBook} 
            disabled={!date || isPending}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Booking..." : "Confirm Booking"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
