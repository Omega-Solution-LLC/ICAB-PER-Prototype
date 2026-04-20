import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface WizardStep {
  id: string;
  label: string;
  component: React.ReactNode;
  canAdvance?: boolean; // If false, 'Next' is disabled
}

export interface WizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  onCancel?: () => void;
  className?: string;
}

export function Wizard({ steps, onComplete, onCancel, className }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-100 -z-10 -translate-y-1/2" />
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center bg-white px-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
                isActive ? "border-icab-red bg-icab-red text-white" : 
                isCompleted ? "border-icab-red bg-white text-icab-red" : 
                "border-slate-200 bg-white text-slate-400"
              )}>
                {index + 1}
              </div>
              <span className={cn(
                "text-xs mt-2 font-medium hidden sm:block",
                isActive ? "text-slate-900" : isCompleted ? "text-slate-700" : "text-slate-400"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-[300px]">
        {currentStepData.component}
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
        <div>
          {onCancel && currentStep === 0 && (
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          )}
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack}>Back</Button>
          )}
        </div>
        <Button 
          className="bg-icab-red hover:bg-icab-wine text-white" 
          onClick={handleNext}
          disabled={currentStepData.canAdvance === false}
        >
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
}
