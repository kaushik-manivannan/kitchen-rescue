import React, { useState } from "react";
import { Fab } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CameraDialog from "./CameraDialog";
import ConfirmItemDialog from "./ConfirmItemDialog";
import { useSession } from 'next-auth/react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { printSuccessMessage, printErrorMessage } from '@/utils/utils';
import { usePantryItems } from "@/providers/PantryContext";

interface ItemInfo {
  name: string;
  quantity: string | null;
}

const CameraComponent = () => {
  const [open, setOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemInfo, setItemInfo] = useState<ItemInfo | null>(null);
  const { pantryItems, setPantryItems } = usePantryItems();

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleItemIdentified = (item: ItemInfo) => {
    setItemInfo(item);
    setOpenConfirmDialog(true);
  };

  const handleConfirmItem = async () => {
    if (!itemInfo || !userId) return;

    const quantity = itemInfo.quantity ? parseInt(itemInfo.quantity) : 1

    try {
      // Check if the item already exists
      const existingItemIndex = pantryItems.findIndex(
        item => item.name.toLowerCase() === itemInfo.name.toLowerCase()
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

        printSuccessMessage(`${itemInfo.name} quantity updated to ${updatedQuantity}!`);
        
      } else {
        // Item doesn't exist, add new item
        const docRef = await addDoc(collection(db, 'items'), {
          name: itemInfo.name,
          quantity: quantity,
          userId: userId,
        });
  
         // Update local state
         setPantryItems((prevItems) => [
          ...prevItems,
          { name: itemInfo.name, quantity: quantity, id: docRef.id, userId: userId },
        ]);
  
        printSuccessMessage(`${itemInfo.name} added to inventory!`);
      }

      setOpenConfirmDialog(false);
      handleClose();
    } catch (error) {
      console.error("Error adding item to inventory:", error);
      printErrorMessage("Failed to add item to inventory. Please try again.");
    }
  };

  return (
    <div>
      <Fab onClick={handleOpen} aria-label="add" color="secondary">
        <CameraAltIcon/>
      </Fab>
      <CameraDialog 
        open={open} 
        onClose={handleClose} 
        onItemIdentified={handleItemIdentified}
      />
      <ConfirmItemDialog 
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        itemInfo={itemInfo}
        setItemInfo={setItemInfo}
        onConfirm={handleConfirmItem}
      />
    </div>
  );
};

export default CameraComponent;