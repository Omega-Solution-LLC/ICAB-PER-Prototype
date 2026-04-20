import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { RecordStatus } from "@/types"
import { STATUS_VARIANTS } from "@/lib/constants"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        'approved': STATUS_VARIANTS['approved'].colorClass + ' border-transparent',
        'completed': STATUS_VARIANTS['completed'].colorClass + ' border-transparent',
        'submitted': STATUS_VARIANTS['submitted'].colorClass + ' border-transparent',
        'assessment-pending': STATUS_VARIANTS['assessment-pending'].colorClass + ' border-transparent',
        'draft': STATUS_VARIANTS['draft'].colorClass + ' border-transparent',
        'not-started': STATUS_VARIANTS['not-started'].colorClass + ' border-transparent',
        'changes-requested': STATUS_VARIANTS['changes-requested'].colorClass + ' border-transparent',
        'in-progress': STATUS_VARIANTS['in-progress'].colorClass + ' border-transparent',
        'active': STATUS_VARIANTS['active'].colorClass + ' border-transparent',
        'at-risk': STATUS_VARIANTS['at-risk'].colorClass + ' border-transparent',
        'transferred': STATUS_VARIANTS['transferred'].colorClass + ' border-transparent',
      },
    },
    defaultVariants: {
      status: 'draft',
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  status: RecordStatus;
}

/**
 * StatusBadge — single source of truth for record status pills.
 * Reads color + label from STATUS_VARIANTS in constants.
 * @example <StatusBadge status="approved" />
 */
export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const label = STATUS_VARIANTS[status].label;
  
  return (
    <div className={cn(badgeVariants({ status }), className)} {...props}>
      {label}
    </div>
  )
}
