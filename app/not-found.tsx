import Link from "next/link";
import { BrandPanel } from "@/components/shared/brand-panel";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-screen flex">
      <BrandPanel className="w-2/5" />
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-10">
        <div className="max-w-md text-center space-y-6">
          <p className="text-8xl font-bold text-icab-blush">404</p>
          <h1 className="text-3xl font-semibold text-icab-slate">Page not found</h1>
          <p className="text-slate-500 text-base">
            The page you are looking for does not exist or may have been moved.
            Please check the URL and try again.
          </p>
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "default" }), "bg-icab-red hover:bg-icab-wine inline-flex items-center gap-2")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
