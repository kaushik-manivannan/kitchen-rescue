'use client'

import React, { useEffect, useState } from 'react'
import OutlinedCard from './Card';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { PantryItem } from '@/interfaces/PantryItem.interface';
import AddDialog from './AddDialog';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { printErrorMessage, printSuccessMessage } from '@/utils/utils';

const CardsList = () => {

  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all pantry items
  useEffect(()=> {
    
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const items: any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPantryItems(items);
      } catch (error) {
        printErrorMessage(`Error Fetching Items: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();

  }, [])

  // Add a new pantry item
  const addPantryItem = async (name: string, quantity: number) => {
    try {
      const docRef = await addDoc(collection(db, 'items'), {
        name: name,
        quantity: quantity,
      });
      setPantryItems((prevItems) => [
        ...prevItems,
        { name: name, quantity: quantity, id: docRef.id },
      ]);
      printSuccessMessage(`${name} Added Successfully!`);
    } catch (error) {
      printErrorMessage(`Error Adding Item: ${error}`);
    }
  };

  // Update a pantry item
  const updatePantryItem = async (id: string, updatedName: string, updatedQuantity: number) => {

    const updatedItem = {id: id, name: updatedName, quantity: updatedQuantity}

    setPantryItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // Delete a pantry item
  const deletePantryItem = async (id: string) => {
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
    <Box sx={{width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div className='flex gap-6'>
        <TextField
            sx={{ margin: '20px auto' }}
            variant="outlined"
            label="Search Items"
            value={searchQuery}
            onChange={handleSearchChange}
        />
        <Button sx={{margin: '20px auto', width: 'fit-content', paddingY: 2}} variant="contained" onClick={handleDialogOpen} endIcon={<AddIcon />}>
              <Typography textTransform={'capitalize'}>
                      Add New Item
              </Typography>
        </Button>
      </div>
        {loading ? (
          <CircularProgress/>
        ) : (
        <ul className='flex gap-8 flex-wrap justify-center w-[80vw] mt-4'>
        {
            filteredItems.map((item: PantryItem) => (
              <li key={item.id}>
                <OutlinedCard item={item} updatePantryItem={updatePantryItem} deletePantryItem={deletePantryItem} addPantryItem={addPantryItem} />
              </li>
            ))
        }
        </ul>
        )}
    </Box>
    <AddDialog open={openDialog} handleClose={handleDialogClose} addPantryItem={addPantryItem}/>
    </>
  )
}

export default CardsList