import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AddDialogProps } from '@/interfaces/Dialog.interface';
import { Typography } from '@mui/material';

const AddDialog: React.FC<AddDialogProps> = ({ open, handleClose, addPantryItem }) => {

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
          const name = formJson.name;
          const quantity = parseInt(formJson.quantity);
          addPantryItem(name, quantity);
          handleClose();
        },
      }}
    >
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add the details of the pantry item.
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
            Add
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;