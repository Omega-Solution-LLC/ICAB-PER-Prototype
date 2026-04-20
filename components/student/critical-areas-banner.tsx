import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function CriticalAreasBanner() {
  // Hardcoded true for prototype UI demonstration
  const hasWarning = true;

  if (!hasWarning) return null;

  return (
    <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-900 border-l-4 border-l-icab-red">
      <AlertCircle className="h-4 w-4 !text-icab-red" />
      <AlertTitle className="text-icab-red font-semibold">Important Action Required</AlertTitle>
      <AlertDescription className="text-slate-700">
        You are approaching the end of your contract period. Please ensure all Phase 1 practical experience logs are submitted.
      </AlertDescription>
    </Alert>
  );
}
