'use client';

import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { PantryItem } from "@/interfaces/PantryItem.interface";
import { printErrorMessage } from "@/utils/utils";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";

export default function Dashboard() {

  const { data: session } = useSession();
  const userId = session?.user?.id;
  
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all pantry items for the current user
  useEffect(() => {
    const fetchItems = async () => {
      if (!userId) return;
      try {
        const q = query(collection(db, 'items'), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const items: PantryItem[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as PantryItem));
        setPantryItems(items);
      } catch (error) {
        printErrorMessage(`Error Fetching Items: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [userId])

  return (
    <Container sx={{ display: "flex", justifyContent: "center", mt: 12, width: '100vw', flexWrap: 'wrap', gap: 8}}>
    </Container>
  );
}