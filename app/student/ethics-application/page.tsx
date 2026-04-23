"use client";

import { EthicsApplicationForm } from "@/components/student/ethics-application-form";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EthicsApplicationPage() {
  const router = useRouter();

  const handleSubmitApplication = async (data: Record<string, string>) => {
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Submitted data", data);
    toast.success(
      "Final Ethics Application submitted successfully! Your Principal will review it.",
    );
    router.push("/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* ── Title ── */}
        <h1
          className="text-3xl font-semibold mb-6"
          style={{ color: "var(--color-icab-red)" }}>
          Ethics Application
        </h1>

        {/* ── Eligibility Alert ── */}
        <div className="border border-emerald-200 rounded-lg bg-emerald-50 px-5 py-4 mb-6 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-emerald-900">
              You are eligible to apply
            </h3>
            <p className="text-sm text-emerald-700 mt-1">
              You have successfully completed the required Practical Experience
              (450 days), Technical Modules, and Ethics Scenarios.
            </p>
          </div>
        </div>

        {/* ── Requirements Overview ── */}
        <div className="border border-gray-200 mb-6">
          <div className="bg-gray-700 text-white text-left px-5 py-3 text-sm font-semibold tracking-wide">
            Application Overview
          </div>
          <div className="bg-gray-50 px-5 py-5">
            <p className="text-sm text-gray-600 mb-4 font-normal">
              Your Ethics Application demonstrates competence in three core
              areas of ethical practice. Provide detailed examples from your
              practical experience that show your understanding and application
              of each principle.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Ethical Leadership
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Navigate dilemmas with integrity and accountability
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Independence
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Maintain objectivity in fact and appearance
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    Professional Skepticism
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Question assumptions and apply critical judgment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Application Form ── */}
        <EthicsApplicationForm onSubmit={handleSubmitApplication} />

        {/* ── Important Notes ── */}
        <div className="border border-gray-200 mt-6 rounded-lg">
          <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 text-sm">
              Important Notes
            </h3>
          </div>
          <div className="px-5 py-4">
            <ul className="space-y-2 text-xs text-gray-600 font-normal">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold">•</span>
                <span>
                  Responses are reviewed by your principal and ICAB assessors.
                  Be thorough and specific with real-world examples.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold">•</span>
                <span>
                  Once submitted, your application cannot be edited. Review all
                  answers carefully before submitting.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 font-bold">•</span>
                <span>
                  Your principal will provide feedback within 10 business days.
                  Check your notifications regularly.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
