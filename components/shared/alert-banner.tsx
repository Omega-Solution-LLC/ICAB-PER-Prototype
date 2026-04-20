import React from 'react';
import { AlertTriangle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AlertBannerProps {
  variant?: 'info' | 'warning' | 'error' | 'success';
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const variants = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: <Info className="h-5 w-5 text-blue-500" />
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-800',
    icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: <XCircle className="h-5 w-5 text-red-500" />
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />
  }
};

export function AlertBanner({ variant = 'info', title, children, className }: AlertBannerProps) {
  const config = variants[variant];
  
  return (
    <div className={cn("p-4 rounded-lg border flex gap-3", config.container, className)}>
      <div className="shrink-0 pt-0.5">
        {config.icon}
      </div>
      <div>
        <h4 className="font-semibold text-sm">{title}</h4>
        {children && <div className="text-sm mt-1 opacity-90">{children}</div>}
      </div>
    </div>
  );
}
