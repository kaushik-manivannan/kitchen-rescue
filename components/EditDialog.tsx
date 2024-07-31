import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from '@/interfaces/Dialog.interface';
import { Typography, useTheme } from '@mui/material';
import { db } from '@/app/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { printSuccessMessage } from '@/utils/utils';

const EditDialog: React.FC<DialogProps> = ({ open, handleClose, item, updatePantryItem }) => {
  const theme = useTheme();

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
          printSuccessMessage(`Item Updated Successfully!`)
          handleClose();
        },
        sx: {
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Edit Item</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ marginBottom: theme.spacing(2), textAlign: 'center' }}>
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
          sx={{ marginBottom: theme.spacing(2) }}
        />
        <TextField
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
            inputProps: { min: 1 },
          }}
          sx={{ marginBottom: theme.spacing(2) }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose} variant="outlined" sx={{ marginRight: theme.spacing(1) }}>
          <Typography textTransform={'capitalize'}>Cancel</Typography>
        </Button>
        <Button type="submit" variant="contained">
          <Typography textTransform={'capitalize'}>Save</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
