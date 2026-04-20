"use client"

import * as React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { STUDENT_NAV_ITEMS, ADMIN_NAV_ITEMS } from "@/lib/constants"

interface PanelLayoutProps {
  variant: 'student' | 'admin'
  children: React.ReactNode
}

export function PanelLayout({ variant, children }: PanelLayoutProps) {
  const navItems = variant === 'student' ? STUDENT_NAV_ITEMS : ADMIN_NAV_ITEMS
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="fixed inset-y-0 z-50 hidden md:flex w-64 flex-col">
        <Sidebar items={navItems} variant={variant} className="w-full h-full" />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        <Header navItems={navItems} variant={variant} className="sticky top-0 z-40" />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
