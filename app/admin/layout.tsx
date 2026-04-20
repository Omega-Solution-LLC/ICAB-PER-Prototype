import React from 'react';
import { RouteGuard } from '@/components/shared/route-guard';
import { PanelLayout } from '@/components/shared/panel-layout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedRole="admin">
      <PanelLayout variant="admin">
        {children}
      </PanelLayout>
    </RouteGuard>
  );
}
