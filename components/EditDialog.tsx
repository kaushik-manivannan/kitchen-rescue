import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from '@/interfaces/Dialog.interface';
import { Typography } from '@mui/material';
import { db } from '@/app/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditDialog: React.FC<DialogProps> = ({ open, handleClose, item, updatePantryItem }) => {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const editedItem = doc(db, "items", item.id);
          const name = formJson.name;
          const quantity = parseInt(formJson.quantity);
          await updateDoc(editedItem, {
            name: name as string,
            quantity: quantity as number
          });
          updatePantryItem(item.id, name, quantity);
          handleClose();
        },
      }}
    >
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit the details of the pantry item.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="normal"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          color="primary"
          defaultValue={item.name}
        />
        <TextField
          autoFocus
          required
          margin="normal"
          id="quantity"
          name="quantity"
          label="Quantity"
          type="number"
          color="primary"
          fullWidth
          variant="outlined"
          defaultValue={item.quantity}
          InputProps={{
            inputProps: { 
              min: 1
            }
        }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          <Typography textTransform={'capitalize'}>
            Cancel
          </Typography>
        </Button>
        <Button type="submit" variant="contained">
          <Typography textTransform={'capitalize'}>
            Save
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;