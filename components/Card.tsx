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
import { Divider, IconButton, Paper } from '@mui/material';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/app/firebase';
import { useState } from 'react';
import EditDialog from './EditDialog';

const OutlinedCard: React.FC<OutlinedCardProps> = ({ item, updatePantryItem, deletePantryItem }) => {

  const [openDialog, setOpenDialog] = useState(false);

  // Reduces the item quantity by 1
  const reduceQuantity = async (id: string) => {
    if (item.quantity > 1) {
      const editedItem = doc(db, "items", id);
      const newQuantity = item.quantity - 1;
      await updateDoc(editedItem, {
          quantity: newQuantity
      });
      updatePantryItem(id, item.name, newQuantity);
    } else {
      deletePantryItem(id);
    }
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
      <Paper 
        elevation={3}
        sx={{ 
          width: 300, 
          borderRadius: 4, 
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{
                fontSize: '2.3rem',
                fontWeight: 700,
                color: 'primary.main',
                mt: 2,
                mb: 1,
                textAlign: 'center'
              }}
            >
              {item.name}
            </Typography>
            <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 2,
                p: 1
              }}
            >
              <IconButton 
                onClick={() => reduceQuantity(item.id)} 
                sx={{ color: 'primary.main'}}
                aria-label="Decrease"
              >
                <RemoveIcon />
              </IconButton>
              <Typography 
                sx={{ 
                  fontSize: '2.5rem', 
                  mx: 2,
                  color: 'primary.main',
                  fontWeight: '400'
                }}
              >
                {item.quantity}
              </Typography>
              <IconButton 
                onClick={() => increaseQuantity(item.id)}
                sx={{ color: 'primary.main' }}
                aria-label="Increase"
              >
                <AddIcon />
              </IconButton>
            </Box>
          </CardContent>
          <Divider sx={{mb: 1, borderColor: 'background.default'}}/>
          <CardActions sx={{ justifyContent: 'space-evenly', px: 2, pb: 2 }}>
            <Button 
              onClick={() => setOpenDialog(true)} 
              variant="outlined" 
              startIcon={<EditIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'light',
              }}
            >
              Edit
            </Button>
            <Button 
              onClick={() => deletePantryItem(item.id)} 
              variant="outlined" 
              startIcon={<DeleteIcon />} 
              color="secondary"
              size='large'
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'light',
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Paper>
      <EditDialog 
        open={openDialog} 
        handleClose={() => setOpenDialog(false)} 
        item={item} 
        updatePantryItem={updatePantryItem}
      />
    </>
  );
};

export default OutlinedCard;