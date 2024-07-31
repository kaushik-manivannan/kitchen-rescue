export interface PantryItem {
    id: string;
    name: string;
    quantity: number;
}

export interface OutlinedCardProps {
    item: PantryItem;
    updatePantryItem: (id: string, updatedName: string, updatedQuantity: number) => void;
    deletePantryItem: (id: string) => void;
    addPantryItem: (name: string, quantity: number) => void;
}