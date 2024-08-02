import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AddDialogProps } from '@/interfaces/Dialog.interface';
import { Typography, useTheme } from '@mui/material';

const AddDialog: React.FC<AddDialogProps> = ({ open, handleClose, addPantryItem }) => {
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
          const name = formJson.name;
          const quantity = parseInt(formJson.quantity);
          addPantryItem(name, quantity);
          handleClose();
        },
        sx: {
          padding: theme.spacing(2),
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
        },
      }}
    >
        <DialogTitle sx={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: { xs: '2.5rem', sm: '3rem' },
        }}
        >
          Add New Item
        </DialogTitle>
        <DialogContent>
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
          sx={{ marginBottom: theme.spacing(2) }}
          InputProps={{
            inputProps: { minlength: 1 , maxlength: 30},
          }}
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
          InputProps={{
            inputProps: { min: 1 , max: 10000},
          }}
          sx={{ marginBottom: theme.spacing(2) }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose} variant="outlined" sx={{ marginRight: theme.spacing(1), px: 2 ,py: 1}}>
          <Typography textTransform={'capitalize'}>Cancel</Typography>
        </Button>
        <Button type="submit" variant="contained" sx={{px: 2 ,py: 1, backgroundColor: 'secondary.main'}}>
          <Typography textTransform={'capitalize'}>Add</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;