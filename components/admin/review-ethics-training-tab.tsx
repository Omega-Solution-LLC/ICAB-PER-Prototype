import React from 'react';
import { ReviewTab } from '../shared/review-tab';
import { StatusBadge } from '../shared/status-badge';

export function ReviewEthicsTrainingTab() {
  // Use mock ethics training modules list
  const modules = [
    { id: '1', name: 'Introduction to Code of Ethics', status: 'completed' },
    { id: '2', name: 'Independence Requirements', status: 'completed' },
    { id: '3', name: 'Confidentiality & Conflict of Interest', status: 'not-started' }
  ];

  return (
    <ReviewTab title="Ethics Training Progress" description="View completion status of formal ethics modules. (Read-only)">
      <div className="space-y-3">
        {modules.map(mod => (
          <div key={mod.id} className="flex justify-between items-center bg-white p-4 border rounded-lg">
            <span className="font-medium text-slate-800">{mod.name}</span>
            <StatusBadge status={mod.status as 'completed' | 'not-started'} />
          </div>
        ))}
      </div>
    </ReviewTab>
  );
}
