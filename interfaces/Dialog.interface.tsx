import { PantryItem } from "./PantryItem.interface";

export interface DialogProps {
    open: boolean;
    handleClose: () => void;
    item: PantryItem;
    updatePantryItem: (id: string, updatedName: string, updatedQuantity: number) => void;
}

export interface AddDialogProps {
  open: boolean;
  handleClose: () => void;
  addPantryItem: (name: string, quantity: number) => void;
  userId: string | undefined;  // Change this line
}