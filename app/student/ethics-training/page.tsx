"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { SectionCard } from '@/components/shared/section-card';
import { useStudentData } from '@/hooks/use-student-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EthicsScenarioWizard } from '@/components/student/ethics-scenario-wizard';
import { StatusBadge } from '@/components/shared/status-badge';
import { ChartCard } from '@/components/shared/chart-card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { EthicsScenario } from '@/types';

export default function EthicsTrainingPage() {
  const { ethicsScenarios, updateEthicsScenario } = useStudentData();
  const [activeScenario, setActiveScenario] = useState<EthicsScenario | null>(null);

  const completedCount = ethicsScenarios.filter(s => s.status === 'approved').length;
  const pieData = [
    { name: 'Completed', value: completedCount, color: '#aa2a2d' },
    { name: 'Remaining', value: Math.max(0, 2 - completedCount), color: '#f1f5f9' },
  ];

  const handleStartScenario = (scenario: EthicsScenario) => {
    setActiveScenario(scenario);
  };

  const handleScenarioComplete = () => {
    if (activeScenario) {
      updateEthicsScenario(activeScenario.id, { status: 'submitted' });
    }
    setActiveScenario(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <PageHeader 
        title="Ethics Scenarios" 
        subtitle="Complete your ethics training requirement via scenario-based assessments"
      />

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <SectionCard title="Required Scenarios" description="Complete 2 predefined ethics scenarios to fulfill Pillar 3 prerequisites.">
            <div className="space-y-4 mt-2">
              {ethicsScenarios.map(scenario => (
                <div key={scenario.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm gap-4 transition-all hover:border-slate-300">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="font-semibold text-slate-800">{scenario.dilemma}</h3>
                      <StatusBadge status={scenario.status} />
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{scenario.description}</p>
                  </div>
                  <div className="w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                    {scenario.status !== 'approved' && scenario.status !== 'submitted' ? (
                      <Button onClick={() => handleStartScenario(scenario)} className="bg-icab-red hover:bg-icab-wine w-full font-medium">
                        Start Scenario
                      </Button>
                    ) : (
                      <Button variant="outline" disabled className="w-full shadow-none font-medium">
                        View Submission
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <ChartCard title="Overall Progress" subtitle="2 Scenarios Required">
             <div className="h-[200px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={pieData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={2}
                     dataKey="value"
                     stroke="none"
                   >
                     {pieData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip formatter={(value) => [value, 'Scenarios']} />
                   <Legend verticalAlign="bottom" height={36} />
                 </PieChart>
               </ResponsiveContainer>
             </div>
             <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-sm">
               <span className="font-medium text-slate-600">Status</span>
               <span className="font-bold text-icab-red">{completedCount >= 2 ? 'Requirement Met' : 'In Progress'}</span>
             </div>
          </ChartCard>
        </div>
      </div>

      <Dialog open={!!activeScenario} onOpenChange={(open) => !open && setActiveScenario(null)}>
        <DialogContent className="sm:max-w-[700px] h-full sm:h-auto max-h-screen sm:max-h-[85vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b shrink-0">
            <DialogTitle>Scenario Wizard</DialogTitle>
            <DialogDescription className="sr-only">Complete the ethics scenario</DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
            {activeScenario && (
              <EthicsScenarioWizard 
                scenario={activeScenario} 
                onComplete={handleScenarioComplete}
                onCancel={() => setActiveScenario(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
