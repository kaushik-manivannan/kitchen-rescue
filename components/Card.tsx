import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { OutlinedCardProps } from '@/interfaces/PantryItem.interface';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/app/firebase';
import { useState } from 'react';
import EditDialog from './EditDialog';

const OutlinedCard: React.FC<OutlinedCardProps> = ({ item, updatePantryItem, deletePantryItem }) => {

  const [openDialog, setOpenDialog] = useState(false);

  // Reduces the item quantity by 1
  const reduceQuantity = async (id: string) => {
    const editedItem = doc(db, "items", id);
    const newQuantity = item.quantity - 1
    await updateDoc(editedItem, {
        quantity: newQuantity
    });
    updatePantryItem(id, item.name, newQuantity);
  }

  // Increase the item quantity by 1
  const increaseQuantity = async (id: string) => {
    const editedItem = doc(db, "items", id);
    const newQuantity = item.quantity + 1
      await updateDoc(editedItem, {
        quantity: newQuantity
    });
    updatePantryItem(id, item.name, newQuantity);
  }

  const handleDialogOpen = () => {
    setOpenDialog(true);
  }

  const handleDialogClose = () => {
    setOpenDialog(false);
  }

  return (
    <>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" sx={{textAlign: 'center'}}>
              {item.name}
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <IconButton onClick={() => reduceQuantity(item.id)} color="primary" aria-label="Decrease">
                <RemoveIcon />
              </IconButton>
              <Typography color="text.secondary">
                {item.quantity}
              </Typography>
              <IconButton color="primary" aria-label="Increase" onClick={() => increaseQuantity(item.id)}>
                <AddIcon />
              </IconButton>
            </Box>
          </CardContent>
          <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
            <Button onClick={handleDialogOpen} variant="contained" startIcon={<EditIcon />}>
              <Typography textTransform={'capitalize'}>Edit</Typography>
            </Button>
            <Button onClick={() => deletePantryItem(item.id)} variant="contained" startIcon={<DeleteIcon />} color="error">
              <Typography textTransform={'capitalize'}>Delete</Typography>
            </Button>
          </CardActions>
        </Card>
      </Box>
      <EditDialog open={openDialog} handleClose={handleDialogClose} item={item} updatePantryItem={updatePantryItem}/>
    </>
  );
};

export default OutlinedCard;