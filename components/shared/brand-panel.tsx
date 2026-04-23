import * as React from "react"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"

export type BrandPanelProps = React.HTMLAttributes<HTMLDivElement>

/**
 * BrandPanel — The left-side red gradient panel with logo + tagline
 */
export function BrandPanel({ className, ...props }: BrandPanelProps) {
  return (
    <div className={cn("hidden md:flex flex-col bg-gradient-to-br from-icab-red to-icab-wine justify-between p-12 text-white", className)} {...props}>
      <div>
        <Logo variant="light" />
        <h1 className="text-4xl font-bold mt-12 tracking-tight">
          Professional<br />
          Experience<br />
          Record
        </h1>
        <p className="mt-6 text-icab-blush max-w-sm text-lg">
          Track your practical experience, modular technical skills, and ethical development in one place.
        </p>
      </div>
      <div className="text-sm font-medium text-icab-petal">
        &copy; {new Date().getFullYear()} The Institute of Chartered Accountants of Bangladesh
      </div>
    </div>
  )
}
