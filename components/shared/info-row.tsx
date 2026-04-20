import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface InfoRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: LucideIcon;
}

/**
 * InfoRow — label/value pair for read-only detail panels.
 * @example <InfoRow label="Firm" value="A. Qasem & Co." />
 */
export function InfoRow({ label, value, icon: Icon, className, ...props }: InfoRowProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:justify-between py-3 border-b last:border-0", className)} {...props}>
      <div className="flex items-center text-sm font-medium text-slate-500 mb-1 sm:mb-0">
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {label}
      </div>
      <div className="text-sm text-slate-900 font-medium">
        {value}
      </div>
    </div>
  )
}
