'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { Container, Typography, TextField, Button, Box, Alert, FormHelperText } from '@mui/material';
import Link from 'next/link';

// Password regex: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login');
    } catch (error: any) {
      // Custom error messages for Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use. Please try a different one.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address. Please check and try again.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. Please choose a stronger password.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection and try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many requests. Please try again later.');
          break;
        default:
          setError('An error occurred during sign up. Please try again.');
      }
      console.error('Error signing up:', error);
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
    }}>
      <Box sx={{
        backgroundColor: 'background.default',
        padding: { xs: 4, sm: 6 },
        borderRadius: 4,
        textAlign: 'center',
        maxWidth: '90%',
        width: '400px',
      }}>
        <Typography component="h1" variant="h5" sx={{
          fontWeight: 'bold',
          marginBottom: 3,
          fontSize: { xs: '2.5rem', sm: '3rem' },
          color: 'primary.main'
        }}>
          Sign Up
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          />
          <FormHelperText />
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
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
            Sign Up
          </Button>
          <Typography sx={{ mt: 2, color: 'primary.main', fontWeight: 'light'}}>
            Already Registered?{' '}
            <Link href="/login" passHref>
              <Typography component="span" sx={{ color: 'secondary.main', fontWeight: 'light', cursor: 'pointer'}}>
                Log In
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}