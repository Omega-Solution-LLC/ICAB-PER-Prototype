import React from 'react';
import { SectionCard } from '../shared/section-card';
import { GuidedQuestionForm } from '../shared/guided-question-form';

export interface EthicsApplicationFormProps {
  onSubmit: (data: Record<string, string>) => Promise<void>;
}

export function EthicsApplicationForm({ onSubmit }: EthicsApplicationFormProps) {
  const questions = [
    {
      id: 'q1',
      label: 'Ethical Leadership',
      description: 'Describe an instance where you navigated an ethical dilemma with integrity.'
    },
    {
      id: 'q2',
      label: 'Independence',
      description: 'Provide an example where you assessed and maintained independence in fact and appearance during an engagement.'
    },
    {
      id: 'q3',
      label: 'Professional Skepticism',
      description: 'Explain a scenario where you applied professional skepticism effectively.'
    }
  ];

  return (
    <SectionCard title="Ethics Application Documentation" description="Answer the following prompts to complete your final Ethics Application.">
      <div className="pt-2 pb-4">
        <GuidedQuestionForm 
          questions={questions}
          onSubmit={onSubmit}
          submitLabel="Submit Application"
        />
      </div>
    </SectionCard>
  );
}
