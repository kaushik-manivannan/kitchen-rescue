'use client'

import React, { useEffect, useState } from 'react'
import OutlinedCard from './Card';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { PantryItem } from '@/interfaces/PantryItem.interface';
import AddDialog from './AddDialog';
import { Box, Button, Typography } from '@mui/material';

const CardsList = () => {

  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch all pantry items
  useEffect(()=> {
    
    const fetchItems = async () => {
        const querySnapshot = await getDocs(collection(db,"items"));
        const items: any = querySnapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }));
        setPantryItems(items);
    }
    fetchItems();
  }, [])

  // Add a new pantry item
  const addPantryItem = async (name: string, quantity: number) => {
    const docRef = await addDoc(collection(db, "items"), {
        name: name,
        quantity: quantity
    });
    setPantryItems(prevItems => [...prevItems, { name: name,
    quantity: quantity, id: docRef.id }]);
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
    const itemDocRef = doc(db, "items", id);
    await deleteDoc(itemDocRef);
    
    setPantryItems(prevItems =>
      prevItems.filter(item => item.id !== id)
    );
  };

  // Opens Add Dialog Box
  const handleDialogOpen = () => {
    setOpenDialog(true);
  }

  // Closes Add Dialog Box
  const handleDialogClose = () => {
    setOpenDialog(false);
  }

  return (
    <>
    <Box sx={{width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Button sx={{margin: '20px auto', width: 'fit-content', paddingY: 2}} variant="contained" onClick={handleDialogOpen}>
            <Typography textTransform={'capitalize'}>
                    Add New Item
            </Typography>
        </Button>
        <ul className='flex gap-4 flex-wrap'>
        {
            pantryItems.map((item: PantryItem) => (
                <li className='flex-1'>
                  <OutlinedCard item={item} key={item.id} updatePantryItem={updatePantryItem} deletePantryItem={deletePantryItem} addPantryItem={addPantryItem} />
                </li>
            ))
        }
        </ul>
    </Box>
    <AddDialog open={openDialog} handleClose={handleDialogClose} addPantryItem={addPantryItem}/>
    </>
  )
}

export default CardsList