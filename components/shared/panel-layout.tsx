"use client"

import * as React from "react"
import { Header } from "./header"
import { TabNav } from "./tab-nav"
import { STUDENT_NAV_ITEMS, ADMIN_NAV_ITEMS } from "@/lib/constants"

interface PanelLayoutProps {
  variant: 'student' | 'admin'
  children: React.ReactNode
}

export function PanelLayout({ variant, children }: PanelLayoutProps) {
  const navItems = variant === 'student' ? STUDENT_NAV_ITEMS : ADMIN_NAV_ITEMS
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 min-w-0">
      <div className="sticky top-0 z-40 flex flex-col w-full shadow-sm relative">
        <Header navItems={navItems} variant={variant} className="shadow-none border-b border-slate-200" />
        <TabNav items={navItems} variant={variant} className="bg-white" />
      </div>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}
