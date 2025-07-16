import { IShortcut } from "@store/homepage";

// Helper function to update an item within a list
export const updateItemInList = (list: IShortcut[], targetIdx: number, newValues: any) =>
  list.map((item, i) => (i === targetIdx ? { ...item, ...newValues } : item));

// Helper function to add a new item
export const createNewItem = (itemValues: any) => ({
  type: "item", // Assuming new items are always 'item' type
  ...itemValues,
  items: [], // New items generally don't have sub-items initially
});
