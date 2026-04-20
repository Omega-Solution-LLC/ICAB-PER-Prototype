import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'page' | 'card' | 'table' | 'form'
}

/**
 * LoadingSkeleton — standardized loading states
 * @example <LoadingSkeleton variant="page" />
 */
export function LoadingSkeleton({ variant = 'page', className, ...props }: LoadingSkeletonProps) {
  if (variant === 'page') {
    return (
      <div className={cn("space-y-6 w-full p-6", className)} {...props}>
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className={cn("space-y-3", className)} {...props}>
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  if (variant === 'form') {
    return (
      <div className={cn("space-y-4", className)} {...props}>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-[120px]" />
      </div>
    )
  }

  return <Skeleton className={cn("h-4 w-full", className)} {...props} />
}
