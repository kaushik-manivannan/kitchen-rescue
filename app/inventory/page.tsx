import CardsList from "@/components/CardsList";
import { Container } from "@mui/material";

export default function Inventory() {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 10, width: '100vw'}}>
        {/* <Table /> */}
        <CardsList />
      </Container>
    );
  }