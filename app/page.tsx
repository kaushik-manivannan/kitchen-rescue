import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default async function Home() {
  return (
    <Container 
      maxWidth={false} // Set to false to allow full width
      disableGutters // Removes default padding
      sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        backgroundImage: 'url(/landing-page-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'background.default',
          padding: { xs: 4, sm: 6 },
          borderRadius: 4,
          textAlign: 'center',
          maxWidth: '90%',
          width: '400px',
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            marginBottom: 2,
            fontSize: { xs: '2.5rem', sm: '3rem' },
            color: 'primary.main'
          }}
        >
          Kitchen Rescue
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'primary.main',
            marginBottom: 4,
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
            fontWeight: 'light'
          }}
        >
          Your Culinary Crisis Manager
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Link href="/login" passHref style={{ textDecoration: 'none', width: '100%' }}>
            <Button 
              variant="contained" 
              color="primary"
              fullWidth
              sx={{ 
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                backgroundColor: 'secondary.main',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                }
              }}
            >
              Log In
            </Button>
          </Link>
          <Link href="/signup" passHref style={{ textDecoration: 'none', width: '100%' }}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ 
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
                backgroundColor: 'secondary.main',
                '&:hover': {
                  backgroundColor: 'secondary.dark',
                }
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
