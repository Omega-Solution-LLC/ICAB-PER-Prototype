"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

/**
 * ReportExportButton — Button that triggers a simulated report generation.
 */
export function ReportExportButton() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleExport = () => {
    setIsGenerating(true)
    toast.info("Generating report... This may take a few seconds.")
    
    setTimeout(() => {
      setIsGenerating(false)
      toast.success("Report generation complete. Download started.")
    }, 2500)
  }

  return (
    <Button 
      onClick={handleExport} 
      disabled={isGenerating}
      className="bg-icab-red hover:bg-icab-wine focus-visible:ring-icab-wine"
    >
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? "Generating..." : "Export Report"}
    </Button>
  )
}
