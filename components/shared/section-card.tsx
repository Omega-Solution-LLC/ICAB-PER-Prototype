import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface SectionCardProps extends React.ComponentProps<typeof Card> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  contentClassName?: string;
}

/**
 * SectionCard — standardized card container with optional header and actions.
 * @example
 * <SectionCard title="Practical Experience" action={<Button>Add</Button>}>
 *   {children}
 * </SectionCard>
 */
export function SectionCard({ title, description, action, children, className, contentClassName, ...props }: SectionCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      {(title || description || action) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-slate-50/50 border-b pb-4 pt-4">
          <div className="flex flex-col space-y-1">
            {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action && <div>{action}</div>}
        </CardHeader>
      )}
      <CardContent className={cn("pt-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}
