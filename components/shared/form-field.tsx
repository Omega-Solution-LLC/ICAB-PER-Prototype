import * as React from "react"
import {
  FormField as HookFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { useFormContext } from "react-hook-form"

export interface FormFieldProps {
  name: string
  label: string
  description?: string
  children: React.ReactNode
}

/**
 * FormField — wrapper around react-hook-form fields + shadcn UI
 * @example
 * <FormField name="email" label="Email">
 *   <Input placeholder="Enter email" />
 * </FormField>
 */
export function FormField({ name, label, description, children }: FormFieldProps) {
  const { control } = useFormContext()
  
  return (
    <HookFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement, { ...field }) : children}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
