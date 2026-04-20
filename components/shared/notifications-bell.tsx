import * as React from "react"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function NotificationsBell() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 rounded-full hover:bg-slate-100 transition-colors focus:outline-none">
        <Bell className="h-5 w-5 text-slate-600" />
        <Badge className="absolute top-1 right-1 h-2 w-2 rounded-full p-0 bg-icab-red text-transparent border border-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer focus:bg-icab-blush/30">
          <span className="font-medium text-sm">System Update</span>
          <span className="text-xs text-slate-500 line-clamp-2 mt-1">Please note the planned maintenance window this weekend.</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 w-full text-center text-xs text-icab-red hover:text-icab-wine font-medium cursor-pointer">
          View all
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
