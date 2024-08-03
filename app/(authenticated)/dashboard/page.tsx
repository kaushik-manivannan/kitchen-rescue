'use client';

import { Container } from "@mui/material";
import AbundantItemsChart from "@/components/AbundantItemsChart";
import LeastItemsChart from "@/components/LeastItemsChart";
import AllItemsPieChart from "@/components/AllItemsPieChart";
import { usePantryItems } from "@/providers/PantryContext";

export default function Dashboard() {
  
  const { pantryItems } = usePantryItems();

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 12, width: '100vw', flexWrap: 'wrap', gap: 8}}>
      <AllItemsPieChart pantryItems={pantryItems}/>
      <AbundantItemsChart pantryItems={pantryItems}/>
      <LeastItemsChart pantryItems={pantryItems}/>
    </Container>
  );
}