"use client";

import * as React from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationsBell } from "./notifications-bell"
import { UserMenu } from "./user-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Sidebar, NavItem } from "./sidebar"
import { useState } from "react"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  navItems: NavItem[]
  variant: 'student' | 'admin'
}

export function Header({ navItems, variant, className, children, ...props }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className={cn("h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-4 sm:px-6 z-10", className)} {...props}>
      <div className="flex items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="mr-4 p-2 -ml-2 bg-transparent border-none rounded-md hover:bg-slate-100 md:hidden focus:outline-none focus:ring-2 focus:ring-icab-red cursor-pointer">
            <Menu className="h-5 w-5 text-slate-600" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-none">
            <VisuallyHidden.Root>
              <SheetTitle>Navigation Menu</SheetTitle>
              <SheetDescription>Main navigation links</SheetDescription>
            </VisuallyHidden.Root>
            <Sidebar items={navItems} variant={variant} onNavClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        
        <div className="hidden sm:block truncate">
          {children}
        </div>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-4">
        <NotificationsBell />
        <div className="h-6 w-px bg-slate-200 mx-2" />
        <UserMenu />
      </div>
    </header>
  )
}
