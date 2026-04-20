import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export interface AvatarWithNameProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  subtitle?: string
  avatarUrl?: string
}

export function AvatarWithName({ name, subtitle, avatarUrl, className, ...props }: AvatarWithNameProps) {
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  
  return (
    <div className={cn("flex items-center space-x-3", className)} {...props}>
      <Avatar className="h-10 w-10 border border-slate-200">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-icab-petal text-icab-red font-semibold">{initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900 leading-none">{name}</span>
        {subtitle && <span className="text-xs text-slate-500 mt-1">{subtitle}</span>}
      </div>
    </div>
  )
}
