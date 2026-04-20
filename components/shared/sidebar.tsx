"use client";

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
  variant: 'student' | 'admin'
  onNavClick?: () => void
}

export function Sidebar({ items, variant, className, onNavClick, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col h-full bg-white border-r border-icab-blush shadow-sm", className)} {...props}>
      <div className="h-16 flex shrink-0 items-center px-6 border-b border-icab-blush/50">
        <Logo className="scale-90 origin-left" />
      </div>
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="mb-4 px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {variant === 'student' ? 'Student Portal' : 'Principal Portal'}
        </div>
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-icab-blush/50 text-icab-red border-l-4 border-icab-red -ml-1 pl-4" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent -ml-1 pl-4"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-icab-red" : "text-slate-400")} />
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
