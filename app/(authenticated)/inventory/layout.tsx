'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  );
}