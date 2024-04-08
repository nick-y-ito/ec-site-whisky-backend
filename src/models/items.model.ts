import { v4 as uuidv4 } from 'uuid';

import { IItem, items } from '@/data/items';

/**
 * Gets all items from the items array
 *
 * @returns All items
 */
export const getItems = async () => {
  return items;
};

/**
 * Gets an item from the items array
 *
 * @param itemId - The id of the item to get
 * @returns The item if found, otherwise null
 */
export const getItem = async (itemId: IItem['itemId']): Promise<IItem | null> => {
  return items.find((item) => item.itemId === itemId) ?? null;
};

/**
 * Creates a new item and adds it to the items array
 *
 * @param item - The item to create
 * @returns The created item
 */
export const createItem = async (item: Omit<IItem, 'itemId'>) => {
  const newItem: IItem = Object.assign(item, { itemId: uuidv4() });
  items.push(newItem);
  return newItem;
};

/**
 * Updates an item in the items array
 *
 * @param item - The item to update
 * @returns The updated item if the item was found, otherwise null
 */
export const updateItem = async (item: IItem): Promise<IItem | null> => {
  const itemIndex = items.findIndex((i) => i.itemId === item.itemId);
  if (itemIndex === -1) {
    return null;
  }
  items[itemIndex] = item;
  return item;
};

/**
 * Deletes an item from the items array
 *
 * @param itemId - The id of the item to delete
 * @returns True if the item was deleted, false if the item was not found
 */
export const deleteItem = async (itemId: IItem['itemId']): Promise<boolean> => {
  const itemIndex = items.findIndex((item) => item.itemId === itemId);
  if (itemIndex === -1) {
    return false;
  }
  items.splice(itemIndex, 1);
  return true;
};
