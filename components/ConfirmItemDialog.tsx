import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

interface ConfirmItemDialogProps {
  open: boolean;
  onClose: () => void;
  itemInfo: { name: string; quantity: string | null } | null;
  setItemInfo: React.Dispatch<React.SetStateAction<{ name: string; quantity: string | null } | null>>;
  onConfirm: () => void;
}

const ConfirmItemDialog: React.FC<ConfirmItemDialogProps> = ({ open, onClose, itemInfo, setItemInfo, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Item Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Item Name"
          type="text"
          fullWidth
          variant="outlined"
          value={itemInfo?.name || ''}
          onChange={(e) => setItemInfo(prev => ({ ...prev!, name: e.target.value }))}
        />
        <TextField
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          variant="outlined"
          value={itemInfo?.quantity || '1'}
          onChange={(e) => setItemInfo(prev => ({ ...prev!, quantity: e.target.value }))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Add to Inventory
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmItemDialog;