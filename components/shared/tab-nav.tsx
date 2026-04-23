"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { NavItem } from "./sidebar";

interface TabNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavItem[];
  variant: "student" | "admin";
}

export function TabNav({ items, className, variant, ...props }: TabNavProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "hidden md:flex w-full overflow-x-auto bg-white rounded-lg border-none",
        className,
      )}
      {...props}>
      {/* Tab bar */}
      <div className="flex items-end w-full gap-0  border-[#e0e0e0]">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-[6px]",
                "px-4 py-[10px]",
                "text-[13px] whitespace-nowrap select-none",
                "transition-colors duration-150",
                isActive
                  ? "font-semibold"
                  : "text-[#666666] font-normal hover:text-[#1a1a1a]",
              )}
              style={{
                textDecoration: "none",
                cursor: "pointer",
                color: isActive ? "var(--color-icab-red)" : "inherit",
              }}>
              <item.icon
                style={{
                  width: "13px",
                  height: "13px",
                  color: isActive ? "var(--color-icab-red)" : "#888888",
                  flexShrink: 0,
                }}
              />
              {item.title}

              {/* Active underline */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-sm"
                  style={{ backgroundColor: "var(--color-icab-red)" }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
