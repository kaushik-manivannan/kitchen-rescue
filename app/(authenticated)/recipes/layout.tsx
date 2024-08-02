'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { Box, CircularProgress } from '@mui/material';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{mb: 5}}/>
      </Box>
    );
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