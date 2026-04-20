import React from 'react';
import { SectionCard } from '@/components/shared/section-card';
import { InfoRow } from '@/components/shared/info-row';
import { format } from 'date-fns';
import { CheckCircle2, FileText, Send } from 'lucide-react';

const activities = [
  { id: '1', title: 'Submitted Year 1 H2 log for approval', date: new Date(Date.now() - 2 * 86400000), icon: Send },
  { id: '2', title: 'Principal approved Year 1 H1 log', date: new Date(Date.now() - 15 * 86400000), icon: CheckCircle2 },
  { id: '3', title: 'Drafted Ethics Scenario: Independence', date: new Date(Date.now() - 20 * 86400000), icon: FileText },
];

export function ActivityFeed() {
  return (
    <SectionCard title="Recent Activity" description="Your latest updates">
      <div className="space-y-1">
        {activities.map((a) => (
          <InfoRow 
            key={a.id} 
            label={a.title} 
            value={format(a.date, 'MMM d, yyyy')} 
            icon={a.icon} 
          />
        ))}
      </div>
    </SectionCard>
  );
}
