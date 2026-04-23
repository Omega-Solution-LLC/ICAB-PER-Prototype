import { FormField } from "@/components/shared/form-field";
import { Textarea } from "@/components/ui/textarea";
import { GuidedQuestion } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

export interface GuidedQuestionFormProps {
  questions: GuidedQuestion[];
  defaultValues?: Record<string, string>;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
}

/**
 * GuidedQuestionForm - Renders dynamic validation textareas for array of questions.
 */
export function GuidedQuestionForm({
  questions,
  defaultValues,
  onSubmit,
  submitLabel = "Submit",
}: GuidedQuestionFormProps) {
  const schemaObj: Record<string, z.ZodString> = {};
  questions.forEach((q) => {
    schemaObj[q.id] = z
      .string()
      .min(q.minLength || 1, `Minimum ${q.minLength || 1} characters required`);
  });
  const schema = z.object(schemaObj);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
  });

  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (data: unknown) => {
    setIsPending(true);
    try {
      await onSubmit(data as Record<string, string>);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-6">
        {questions.map((q) => (
          <FormField
            key={q.id}
            name={q.id}
            label={q.label}
            description={q.description}>
            <Textarea
              className="min-h-[120px] resize-y"
              placeholder={`Enter your ${q.label.toLowerCase()}...`}
            />
          </FormField>
        ))}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white rounded hover:shadow-sm transition-shadow flex items-center gap-2"
            style={{ backgroundColor: "var(--color-icab-red)" }}
            disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Submitting..." : submitLabel}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
