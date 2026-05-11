import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from '@/components/shared/form-field';
import { AuditEngagement } from '@/types';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  id: z.string().optional(),
  firmName: z.string().optional(),
  principalName: z.string().optional(),
  type: z.enum(['statutory', 'other', 'non-audit']).optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  role: z.string().min(1, "Role is required"),
  areaOfWork: z.string().min(1, "Area of Work is required"),
  daysWorked: z.coerce.number().min(0, "Must be positive"),
});

export type AuditEngagementFormData = z.infer<typeof formSchema>;

export interface AuditEngagementFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: Partial<AuditEngagement>;
  onSubmit: (data: AuditEngagementFormData) => Promise<void>;
  title: string;
  includeSupervisorFields?: boolean;
  prefillFirmName?: string;
  prefillPrincipalName?: string;
  fixedType?: AuditEngagement['type'];
}

export function AuditEngagementForm({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  title,
  includeSupervisorFields = false,
  prefillFirmName = "",
  prefillPrincipalName = "",
  fixedType,
}: AuditEngagementFormProps) {
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      firmName: "",
      principalName: "",
      type: fixedType || "other",
      startDate: "",
      endDate: "",
      role: "",
      areaOfWork: "",
      daysWorked: 0,
    }
  });

  useEffect(() => {
    if (open) {
      if (defaultValues) {
        methods.reset({
          id: defaultValues.id,
          firmName: defaultValues.firmName || prefillFirmName,
          principalName: defaultValues.principalName || prefillPrincipalName,
          type: defaultValues.type || fixedType || "other",
          startDate: defaultValues.startDate || "",
          endDate: defaultValues.endDate || "",
          role: defaultValues.role || "",
          areaOfWork: defaultValues.areaOfWork || "",
          daysWorked: defaultValues.daysWorked || 0,
        });
      } else {
        methods.reset({
          id: undefined,
          firmName: prefillFirmName,
          principalName: prefillPrincipalName,
          type: fixedType || "other",
          startDate: "",
          endDate: "",
          role: "",
          areaOfWork: "",
          daysWorked: 0,
        });
      }
    }
  }, [open, defaultValues, methods, prefillFirmName, prefillPrincipalName, fixedType]);

  const [isPending, setIsPending] = React.useState(false);

  const handleSubmit = async (values: AuditEngagementFormData) => {
    if (includeSupervisorFields) {
      if (!values.firmName?.trim()) {
        methods.setError("firmName", { type: "manual", message: "Firm Name is required" });
        return;
      }
      if (!values.principalName?.trim()) {
        methods.setError("principalName", { type: "manual", message: "Principal Name is required" });
        return;
      }
    }

    const payload = {
      ...values,
      type: values.type || fixedType,
    };

    setIsPending(true);
    try {
      await onSubmit(payload as AuditEngagementFormData);
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
          <DialogTitle>{defaultValues?.id ? "Edit " + title : "Add " + title}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4 py-2 mt-2">
            {includeSupervisorFields && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField name="firmName" label="Firm Name">
                    <Input placeholder="Omega Solution" />
                  </FormField>
                </div>
                <div>
                  <FormField name="principalName" label="Principal Name">
                    <Input placeholder="Sabbir Hosen FCA" />
                  </FormField>
                </div>
              </div>
            )}

            {!fixedType && (
              <FormField name="type" label="Entry Type">
                <select className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200" defaultValue="other">
                  <option value="other">Other Audit</option>
                  <option value="non-audit">Non-Audit</option>
                </select>
              </FormField>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField name="startDate" label="Start Date">
                  <Input type="date" />
                </FormField>
              </div>
              <div>
                <FormField name="endDate" label="End Date">
                  <Input type="date" />
                </FormField>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormField name="role" label="Role">
                  <Input placeholder="Audit Junior" />
                </FormField>
              </div>
              <div>
                <FormField name="areaOfWork" label="Area of Work">
                  <Input placeholder="Fieldwork" />
                </FormField>
              </div>
            </div>

            <FormField name="daysWorked" label="Total Days Worked">
              <Input type="number" min="0" />
            </FormField>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
              <Button type="submit" className="bg-icab-red hover:bg-icab-wine text-white" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Saving..." : (defaultValues?.id ? "Update" : "Add")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
