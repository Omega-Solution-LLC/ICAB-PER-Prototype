import React from 'react';
import { RouteGuard } from '@/components/shared/route-guard';
import { PanelLayout } from '@/components/shared/panel-layout';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRole="student">
      <PanelLayout variant="student">
        {children}
      </PanelLayout>
    </RouteGuard>
  );
}
