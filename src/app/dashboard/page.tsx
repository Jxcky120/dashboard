'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import home from '@/app/dashboard/home';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/home');
  }, [router]);

  return <home />;
}
