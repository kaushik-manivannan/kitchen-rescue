'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { PantryItem } from '@/interfaces/PantryItem.interface';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import { printErrorMessage } from '@/utils/utils';

interface PantryContextType {
  pantryItems: PantryItem[];
  setPantryItems: React.Dispatch<React.SetStateAction<PantryItem[]>>;
  loading: boolean;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export const PantryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchItems = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
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
  }, [userId]);

  return (
    <PantryContext.Provider value={{ pantryItems, setPantryItems, loading }}>
      {children}
    </PantryContext.Provider>
  );
};

export const usePantryItems = () => {
  const context = useContext(PantryContext);
  if (context === undefined) {
    throw new Error('usePantryItems must be used within a PantryProvider');
  }
  return context;
};