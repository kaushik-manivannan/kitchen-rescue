import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default async function Home() {

  return (
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw'}} className="bg-black">
        <Typography variant="h2" component="h1" gutterBottom className="text-center leading-none w-[70vw] sm:w-full">
          Pantry Tracker
        </Typography>
        <Box sx={{ '& > *': { m: 1 } }}>
          <Link href="/login" passHref>
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="outlined" color="primary">
              Sign Up
            </Button>
          </Link>
        </Box>
      </Container>
  );
}
