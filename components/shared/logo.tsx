import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark'
}

export function Logo({ variant = 'dark', className, ...props }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-icab-red'
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <div className={cn("flex items-center justify-center h-10 w-10 bg-icab-red rounded flex-shrink-0")}>
        {/* Placeholder SVG since public/icab-logo.svg might not exist */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
      <span className={cn("font-bold text-xl tracking-tight hidden sm:inline-block", textColor)}>ICAB PER</span>
    </div>
  )
}
