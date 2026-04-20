"use client";

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NavItem } from "./sidebar"

interface TabNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[]
  variant: 'student' | 'admin'
}

export function TabNav({ items, className, ...props }: TabNavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("hidden md:flex w-full bg-white border-b border-slate-200 overflow-x-auto", className)} {...props}>
      <div className="flex px-4 sm:px-6 lg:px-8 space-x-1 sm:space-x-4 max-w-7xl mx-auto w-full">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                isActive 
                  ? "border-icab-red text-icab-red" 
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              )}
            >
              <item.icon className={cn("mr-2 h-4 w-4", isActive ? "text-icab-red" : "text-slate-400")} />
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
