"use client";

import { ADMIN_NAV_ITEMS, STUDENT_NAV_ITEMS } from "@/lib/constants";
import * as React from "react";
import { Header } from "./header";
import { TabNav } from "./tab-nav";

interface PanelLayoutProps {
  variant: "student" | "admin";
  children: React.ReactNode;
}

export function PanelLayout({ variant, children }: PanelLayoutProps) {
  const navItems = variant === "student" ? STUDENT_NAV_ITEMS : ADMIN_NAV_ITEMS;
  // const pathname = usePathname();

  return (
    <div
      className="flex flex-col min-h-screen min-w-0"
      style={{ backgroundColor: "#F8F9FA", fontFamily: "Arial, sans-serif" }}>
      {/* Sticky header */}
      <div className="sticky top-0 z-40 w-full">
        <Header navItems={navItems} variant={variant} className="shadow-none" />
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 sm:px-8 lg:px-10 pt-5 pb-8 max-w-7xl mx-auto w-full">
        <TabNav
          items={navItems}
          variant={variant}
          className=""
          style={{ paddingLeft: 0 }}
        />

        <div className="bg-white rounded-lg mt-2 px-6 pt-5 pb-7 min-h-[420px] relative z-[1]">
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
