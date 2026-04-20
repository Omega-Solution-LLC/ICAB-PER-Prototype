import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from '@/components/shared/form-field';
import { GuidedQuestion } from '@/types';
import { Loader2 } from 'lucide-react';

export interface GuidedQuestionFormProps {
  questions: GuidedQuestion[];
  defaultValues?: Record<string, string>;
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitLabel?: string;
}

/**
 * GuidedQuestionForm - Renders dynamic validation textareas for array of questions.
 */
export function GuidedQuestionForm({ questions, defaultValues, onSubmit, submitLabel = "Submit" }: GuidedQuestionFormProps) {
  const schemaObj: Record<string, z.ZodString> = {};
  questions.forEach(q => {
    schemaObj[q.id] = z.string().min(q.minLength || 1, `Minimum ${q.minLength || 1} characters required`);
  });
  const schema = z.object(schemaObj);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {}
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
          <FormField key={q.id} name={q.id} label={q.label} description={q.description}>
            <Textarea className="min-h-[120px] resize-y" placeholder={`Enter your ${q.label.toLowerCase()}...`} />
          </FormField>
        ))}
        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" className="bg-icab-red hover:bg-icab-wine text-white" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Submitting..." : submitLabel}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
