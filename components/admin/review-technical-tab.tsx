import React from 'react';
import { ReviewTab } from '../shared/review-tab';
import { useAdminData } from '@/hooks/use-admin-data';
import { TechnicalModuleCard } from '../student/technical-module-card';

export function ReviewTechnicalTab() {
  const { allTechnicalModules } = useAdminData();
  const modules = allTechnicalModules; // Real app would filter by studentId
  
  return (
    <ReviewTab title="Technical Integration" description="Review IES 2 technical module progress (read-only).">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map(mod => (
           <TechnicalModuleCard 
             key={mod.id} 
             module={mod} 
             onBookAssessment={async () => {}}
             onStart={async () => {}}
             isAdminView
           />
        ))}
      </div>
    </ReviewTab>
  );
}
