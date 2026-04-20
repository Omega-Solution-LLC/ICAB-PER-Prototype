import React, { ReactNode } from 'react';
import { SectionCard } from './section-card';

export interface ReviewTabProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function ReviewTab({ title, description, children, actions }: ReviewTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <SectionCard title={title} description={description} action={actions} contentClassName="p-0 sm:p-0 border-t-0">
        <div className="p-4 sm:p-6 bg-slate-50/30">
          {children}
        </div>
      </SectionCard>
    </div>
  );
}
