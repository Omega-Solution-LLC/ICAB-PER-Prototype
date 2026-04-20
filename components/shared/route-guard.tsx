"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';
import { LoadingSkeleton } from './loading-skeleton';
import { UserRole } from '@/types';

interface RouteGuardProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export function RouteGuard({ allowedRole, children }: RouteGuardProps) {
  const { user, isAuthenticated } = useSession();
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user && user.role !== allowedRole) {
      // Wrong role, redirect to appropriate dashboard
      router.push(`/${user.role}/dashboard`);
    } else {
      Promise.resolve().then(() => {
        setIsReady(true);
      });
    }
  }, [isAuthenticated, user, allowedRole, router]);

  if (!isReady) {
    return <LoadingSkeleton variant="page" />;
  }

  return <>{children}</>;
}
