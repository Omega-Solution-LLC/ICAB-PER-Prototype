import React, { useState } from 'react';
import { Wizard } from '../shared/wizard';
import { Checkbox } from "@/components/ui/checkbox";
import { GuidedQuestionForm } from '../shared/guided-question-form';
import { toast } from 'sonner';

export interface EthicsScenarioWizardProps {
  scenario: {
    id: string;
    dilemma: string;
    description: string;
  };
  onComplete: () => void;
  onCancel: () => void;
}

export function EthicsScenarioWizard({ scenario, onComplete, onCancel }: EthicsScenarioWizardProps) {
  const [threats, setThreats] = useState<string[]>([]);
  const [safeguards, setSafeguards] = useState({});

  const handleThreatToggle = (threatId: string) => {
    setThreats(prev => 
      prev.includes(threatId) ? prev.filter(id => id !== threatId) : [...prev, threatId]
    );
  };

  const handleSafeguardsSubmit = async (data: Record<string, string>) => {
    setSafeguards(data);
  };

  const finishWizard = async () => {
    // API mock
    await new Promise(r => setTimeout(r, 600));
    toast.success("Ethics scenario submitted successfully!");
    onComplete();
  }

  const steps = [
    {
      id: 'read',
      label: 'Read Scenario',
      component: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{scenario.dilemma}</h3>
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{scenario.description}</p>
        </div>
      )
    },
    {
      id: 'identify',
      label: 'Identify Threats',
      canAdvance: threats.length > 0,
      component: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Identify Threats</h3>
            <p className="text-sm text-slate-500 mb-4">Select all threats to compliance with the fundamental principles that apply.</p>
          </div>
          <div className="space-y-3">
            {[
              { id: 'self-interest', label: 'Self-interest threat' },
              { id: 'self-review', label: 'Self-review threat' },
              { id: 'advocacy', label: 'Advocacy threat' },
              { id: 'familiarity', label: 'Familiarity threat' },
              { id: 'intimidation', label: 'Intimidation threat' },
            ].map(threat => (
              <div key={threat.id} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-md border border-slate-100 cursor-pointer hover:bg-slate-100" onClick={() => handleThreatToggle(threat.id)}>
                <Checkbox id={threat.id} checked={threats.includes(threat.id)} onCheckedChange={(checked: boolean) => {
                    if (checked) {
                        setThreats(p => [...p, threat.id]);
                    } else {
                        setThreats(p => p.filter(x => x !== threat.id));
                    }
                }} />
                <label className="text-sm font-medium leading-none cursor-pointer">
                  {threat.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'safeguards',
      label: 'Propose Safeguards',
      canAdvance: Object.keys(safeguards).length > 0,
      component: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-1">Propose Safeguards</h3>
          <p className="text-sm text-slate-500 mb-4">How would you address the threats identified?</p>
          <GuidedQuestionForm 
            questions={[
              { id: 'actions', label: 'Actions to eliminate or reduce the threats' },
              { id: 'communication', label: 'Who should you communicate with regarding this?' }
            ]}
            defaultValues={safeguards}
            onSubmit={async (data) => {
               await handleSafeguardsSubmit(data);
               toast.success("Safeguards saved! Click 'Next' to continue.");
            }}
            submitLabel="Save Safeguards"
          />
        </div>
      )
    },
    {
      id: 'review',
      label: 'Summary',
      component: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-2">Review your submission</h3>
          
          <div className="bg-slate-50 p-4 rounded-md border text-sm">
            <h4 className="font-semibold text-slate-900 border-b pb-2 mb-2">Identified Threats</h4>
            <ul className="list-disc pl-5 space-y-1">
              {threats.map(t => <li key={t} className="capitalize">{t.replace('-', ' ')}</li>)}
            </ul>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-md border text-sm">
            <h4 className="font-semibold text-slate-900 border-b pb-2 mb-2">Proposed Safeguards</h4>
            {Object.entries(safeguards).map(([k, v]) => (
               <div key={k} className="mb-3">
                 <span className="font-medium capitalize text-icab-slate">{k}:</span>
                 <p className="mt-1 text-slate-700">{v as string}</p>
               </div>
            ))}
          </div>
          
          <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded border border-amber-200">
            By submitting, you confirm this demonstrates your application of the ICAB Code of Ethics.
          </p>
        </div>
      )
    }
  ];

  return <Wizard steps={steps} onComplete={finishWizard} onCancel={onCancel} />;
}
