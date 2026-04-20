"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';
import { LoadingSkeleton } from '@/components/shared/loading-skeleton';

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useSession();

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(`/${user.role}/dashboard`);
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  return <LoadingSkeleton variant="page" />;
}
