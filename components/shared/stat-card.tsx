import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

const statCardVariants = cva(
  "flex items-center justify-between p-6",
  {
    variants: {
      variant: {
        default: "",
        warning: "bg-amber-50/50 border-amber-200",
        success: "bg-green-50/50 border-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

/**
 * StatCard — compact metric tile used across dashboards.
 * @example
 *   <StatCard label="Pending" value={12} icon={Clock} variant="warning" />
 */
export function StatCard({ label, value, icon: Icon, trend, variant, className, ...props }: StatCardProps) {
  return (
    <Card className={cn(statCardVariants({ variant, className }))} {...props}>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-icab-slate">{label}</h3>
        <p className="text-3xl font-semibold text-icab-red">{value}</p>
        {trend && <p className="text-xs text-slate-500">{trend}</p>}
      </div>
      <div className={cn(
        "p-3 rounded-full flex items-center justify-center", 
        variant === 'warning' ? 'bg-amber-100 text-amber-600' : 
        variant === 'success' ? 'bg-green-100 text-green-600' : 
        'bg-red-50 text-icab-red'
      )}>
        <Icon className="h-6 w-6" />
      </div>
    </Card>
  );
}
