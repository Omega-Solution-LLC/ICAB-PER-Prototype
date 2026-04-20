"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { login } from '@/lib/auth';
import { useSession } from '@/hooks/use-session';
import { DEMO_STUDENTS, DEMO_PRINCIPAL } from '@/lib/demo-data';

import { BrandPanel } from '@/components/shared/brand-panel';
import { FormField } from '@/components/shared/form-field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { loginState } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleDemoSelect = (value: string | null) => {
    if (value === 'student') {
      form.setValue('email', DEMO_STUDENTS[0].email);
      form.setValue('password', 'password');
    } else if (value === 'admin') {
      form.setValue('email', DEMO_PRINCIPAL.email);
      form.setValue('password', 'admin');
    }
  };

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));

    const user = login(values.email, values.password);

    if (user) {
      loginState(user);
      router.push(`/${user.role}/dashboard`);
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <BrandPanel className="w-full md:w-[40%]" />

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          <div className="flex flex-col space-y-2 text-center md:hidden mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-icab-red">ICAB PER</h1>
            <p className="text-sm text-slate-500">Professional Experience Record</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select onValueChange={handleDemoSelect}>
                  <SelectTrigger className="w-full bg-slate-50 text-slate-500 border-dashed">
                    <SelectValue placeholder="Pre-fill demo credentials..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Demo Student</SelectItem>
                    <SelectItem value="admin">Demo Principal (Admin)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField name="email" label="Email Address">
                    <Input placeholder="name@example.com" type="email" disabled={isLoading} />
                  </FormField>

                  <FormField name="password" label="Password">
                    <Input placeholder="••••••••" type="password" disabled={isLoading} />
                  </FormField>

                  <Button type="submit" className="w-full bg-icab-red hover:bg-icab-wine" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
