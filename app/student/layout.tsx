import { PanelLayout } from "@/components/shared/panel-layout";
import { RouteGuard } from "@/components/shared/route-guard";
import React from "react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard allowedRole="student">
      <PanelLayout variant="student">{children}</PanelLayout>
    </RouteGuard>
  );
}
