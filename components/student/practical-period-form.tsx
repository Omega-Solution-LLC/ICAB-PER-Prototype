import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from '@/components/shared/form-field';
import { PracticalExperiencePeriod } from '@/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Period label is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  daysWorked: z.coerce.number().min(0, "Must be positive"),
  daysStatAudit: z.coerce.number().min(0, "Must be positive"),
  daysOtherAudit: z.coerce.number().min(0, "Must be positive"),
  daysNonAudit: z.coerce.number().min(0, "Must be positive"),
}).refine(data => {
  const sum = data.daysStatAudit + data.daysOtherAudit + data.daysNonAudit;
  return sum <= data.daysWorked;
}, {
  message: "Sum of audit categories cannot exceed total days worked",
  path: ["daysWorked"], // attach error to daysWorked
});

export type PracticalPeriodFormData = z.infer<typeof formSchema>;

export interface PracticalPeriodFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: Partial<PracticalExperiencePeriod>;
  onSubmit: (data: PracticalPeriodFormData) => Promise<void>;
  firmName?: string;
  principalName?: string;
  articledshipStartDate?: string;
}

export function PracticalPeriodForm({ open, onOpenChange, defaultValues, onSubmit, firmName, principalName, articledshipStartDate }: PracticalPeriodFormProps) {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      label: "",
      startDate: "",
      endDate: "",
      daysWorked: 0,
      daysStatAudit: 0,
      daysOtherAudit: 0,
      daysNonAudit: 0,
    }
  });

  useEffect(() => {
    if (open) {
      if (defaultValues) {
        methods.reset({
          id: defaultValues.id,
          label: defaultValues.label || "",
          startDate: defaultValues.startDate || "",
          endDate: defaultValues.endDate || "",
          daysWorked: defaultValues.daysWorked || 0,
          daysStatAudit: defaultValues.daysStatAudit || 0,
          daysOtherAudit: defaultValues.daysOtherAudit || 0,
          daysNonAudit: defaultValues.daysNonAudit || 0,
        });
      } else {
        methods.reset({
          id: undefined,
          label: "",
          startDate: "",
          endDate: "",
          daysWorked: 0,
          daysStatAudit: 0,
          daysOtherAudit: 0,
          daysNonAudit: 0,
        });
      }
    }
  }, [open, defaultValues, methods]);

  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (values: unknown) => {
    setIsPending(true);
    try {
      await onSubmit(values as PracticalPeriodFormData);
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{defaultValues?.id ? "Edit Period" : "Add Period"}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4 py-2 mt-2">
            
            {/* Context Fields per PDF */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border">
              <div>
                <label className="text-sm font-medium leading-none mb-1 block">Firm Name (Default)</label>
                <Input value={firmName || ''} readOnly className="bg-slate-100 text-slate-500 cursor-not-allowed" tabIndex={-1} />
              </div>
              <div>
                <label className="text-sm font-medium leading-none mb-1 block">Principal (Default)</label>
                <Input value={principalName || ''} readOnly className="bg-slate-100 text-slate-500 cursor-not-allowed" tabIndex={-1} />
              </div>
            </div>

            <FormField name="label" label="Period Label (e.g. Year 1 H1)">
              <Input placeholder="Year X HX" />
            </FormField>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField name="startDate" label="Start Date">
                  <Input type="date" />
                </FormField>
                {articledshipStartDate && (
                  <p className="text-[0.75rem] text-slate-500 mt-1.5 ml-1">Ref. Start Date: {articledshipStartDate}</p>
                )}
              </div>
              <div>
                <FormField name="endDate" label="End Date">
                  <Input type="date" />
                </FormField>
              </div>
            </div>

            <FormField name="daysWorked" label="Total PWE Days Worked">
              <Input type="number" min="0" />
            </FormField>

            <div className="mt-6 border border-blue-100 rounded-lg overflow-hidden">
              <div className="bg-blue-50/50 px-4 py-3 border-b border-blue-100">
                <h4 className="text-sm font-semibold text-blue-900">Audit Qualification Tracking (Optional)</h4>
                <p className="text-[11px] text-blue-700 mt-0.5">If you are pursuing the Audit Qualification, break down your total days above into these categories.</p>
              </div>
              <div className="p-4 bg-white grid grid-cols-3 gap-4">
                <FormField name="daysStatAudit" label="Statutory Audit">
                  <Input type="number" min="0" />
                </FormField>
                <FormField name="daysOtherAudit" label="Other Audit">
                  <Input type="number" min="0" />
                </FormField>
                <FormField name="daysNonAudit" label="Non-Audit">
                  <Input type="number" min="0" />
                </FormField>
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-3 border-t border-slate-100 mt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" className="bg-icab-red hover:bg-icab-wine text-white" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Saving..." : (defaultValues?.id ? "Update Period" : "Add Period")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
