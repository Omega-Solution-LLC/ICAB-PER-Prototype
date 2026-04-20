"use client";

import * as React from "react"
import { useSession } from "@/hooks/use-session"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserCircle, LogOut } from "lucide-react"

export function UserMenu() {
  const { user, logoutState } = useSession()
  const router = useRouter()

  if (!user) return null

  const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

  const handleLogout = () => {
    logoutState();
    router.push('/login');
  }

  const handleProfile = () => {
    router.push(`/${user.role}/profile`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-8 w-8 hover:ring-2 hover:ring-icab-red transition-all cursor-pointer">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="bg-icab-petal text-icab-red font-medium text-xs">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-icab-red focus:text-icab-red focus:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
