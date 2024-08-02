'use client'

import React, { useEffect, useState } from 'react'
import OutlinedCard from './Card';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { PantryItem } from '@/interfaces/PantryItem.interface';
import AddDialog from './AddDialog';
import { Box, Button, CircularProgress, InputAdornment, Skeleton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { printErrorMessage, printSuccessMessage } from '@/utils/utils';
import { useSession } from 'next-auth/react';

const CardsList = () => {

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Add a new pantry item or update existing item
  const addPantryItem = async (name: string, quantity: number) => {
    if (!userId) return;
    try {
      // Check if the item already exists
      const existingItemIndex = pantryItems.findIndex(
        item => item.name.toLowerCase() === name.toLowerCase()
      );

      if (existingItemIndex !== -1) {
        // Item exists, update the quantity
        const existingItem = pantryItems[existingItemIndex];
        const updatedQuantity = existingItem.quantity + quantity;
        
        // Update in Firestore
        const itemDocRef = doc(db, 'items', existingItem.id);
        await updateDoc(itemDocRef, {
          quantity: updatedQuantity,
        });

        // Update local state
        setPantryItems(prevItems => 
          prevItems.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: updatedQuantity } 
              : item
          )
        );

        printSuccessMessage(`${name} quantity updated to ${updatedQuantity}!`);
        
      } else {
        // Item doesn't exist, add new item
        const docRef = await addDoc(collection(db, 'items'), {
          name: name,
          quantity: quantity,
          userId: userId,
        });
        setPantryItems((prevItems) => [
          ...prevItems,
          { name: name, quantity: quantity, id: docRef.id, userId: userId },
        ]);
        printSuccessMessage(`${name} Added Successfully!`);
      }
    } catch (error) {
      printErrorMessage(`Error Adding/Updating Item: ${error}`);
    }
  };

  // Update a pantry item
  const updatePantryItem = async (id: string, updatedName: string, updatedQuantity: number) => {
    if (!userId) return;
    const updatedItem = {id: id, name: updatedName, quantity: updatedQuantity, userId: userId}

    setPantryItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );

    try {
      const itemDocRef = doc(db, 'items', id);
      await updateDoc(itemDocRef, {
        name: updatedName,
        quantity: updatedQuantity,
      });
    } catch (error) {
      printErrorMessage(`Error Updating Item: ${error}`);
    }
  };

  // Delete a pantry item
  const deletePantryItem = async (id: string) => {
    if (!userId) return;
    try {
      const itemDocRef = doc(db, 'items', id);
      await deleteDoc(itemDocRef);
      setPantryItems((prevItems) => prevItems.filter((item) => item.id !== id));
      printSuccessMessage(`Item Deleted Successfully!`);
    } catch (error) {
      printErrorMessage(`Error Deleting Item: ${error}`);
    }
  };

  // Opens Add Dialog Box
  const handleDialogOpen = () => {
    setOpenDialog(true);
  }

  // Closes Add Dialog Box
  const handleDialogClose = () => {
    setOpenDialog(false);
  }

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter pantry items based on search query
  const filteredItems = pantryItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Box sx={{ width: '100%', margin: '0 auto', padding: '20px'}}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'center'}}>
        <TextField
          sx={{
            flexGrow: 1,
            maxWidth: '400px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
          }}
          variant="outlined"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleDialogOpen} 
          endIcon={<AddIcon />}
          sx={{
            marginLeft: '16px',
            borderRadius: '20px',
            textTransform: 'none',
            textWrap: 'nowrap',
            px: 3,
            py: 1.5,
            fontSize: '1.1rem',
            backgroundColor: 'secondary.main',
            '&:hover': {
                  backgroundColor: 'secondary.dark',
            }
          }}
        >
          Add Item
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ marginTop: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <CircularProgress sx={{mb: 5}}/>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, flexWrap: 'wrap'}}>
            <Skeleton animation="wave" variant="rounded" width={300} height={258} />
            <Skeleton animation="wave" variant="rounded" width={300} height={258} />
            <Skeleton animation="wave" variant="rounded" width={300} height={258} />
            <Skeleton animation="wave" variant="rounded" width={300} height={258} />
          </Box>
        </Box>
      ) : (
        <ul className='flex gap-8 flex-wrap justify-center w-full mt-4'>
          {filteredItems.map((item: PantryItem) => (
            <li key={item.id}>
              <OutlinedCard 
                item={item} 
                updatePantryItem={updatePantryItem} 
                deletePantryItem={deletePantryItem} 
                addPantryItem={addPantryItem} 
              />
            </li>
          ))}
        </ul>
      )}
    </Box>
    <AddDialog open={openDialog} handleClose={handleDialogClose} addPantryItem={addPantryItem} userId={userId}/>
    </>
  )
}

export default CardsList