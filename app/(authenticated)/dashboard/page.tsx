import CardsList from "@/components/CardsList";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Dashboard() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 10, width: '100vw'}}>
    </Container>
  );
}