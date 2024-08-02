'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.log('SignIn error:', result.error); // Add this log
        // Custom error messages
        switch (result.error) {
          case 'InvalidCredentials':
            setError('Invalid email or password. Please try again.');
            break;
          case 'TooManyAttempts':
            setError('Too many login attempts. Please try again later.');
            break;
          case 'ServerError':
            setError('An error occurred during login. Please try again.');
            break;
          default:
            setError('An unexpected error occurred. Please try again.');
        }
      } else {
        router.push('/inventory');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('An unexpected error happened:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(/landing-page-bg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh'
    }} 
    >
      <Box sx={{ 
        backgroundColor: 'background.default',
        padding: { xs: 4, sm: 6 },
        borderRadius: 4,
        textAlign: 'center',
        maxWidth: '90%',
        width: '400px',
        }}
      >
        <Typography component="h1" variant="h5" sx={{
          fontWeight: 'bold',
          marginBottom: 3,
          fontSize: { xs: '2.5rem', sm: '3rem' },
          color: 'primary.main'
        }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              outline: 'primary.main'
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{outline: 'primary.main'}}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained" 
            color="primary" 
            sx={{ 
              py: 1,
              fontSize: '1.1rem',
              textTransform: 'none',
              backgroundColor: 'secondary.main',
              marginTop: 3,
              '&:hover': {
                  backgroundColor: 'secondary.dark',
              }
            }}
          >
            Log In
          </Button>
          <Typography sx={{ mt: 2, color: 'primary.main', fontWeight: 'light'}}>
            Don't have an account yet?{' '}
            <Link href="/signup" passHref>
              <Typography component="span" sx={{ color: 'secondary.main', cursor: 'pointer', fontWeight: 'light'}}>
                Sign Up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}