/**
 * Business logic
 */
import { items } from '@/data/items';
import { Item } from '@/models/item.model';
import { ItemRepository } from '@/repositories/item.repository';

export class ItemService {
  constructor(private itemRepository: ItemRepository) {}

  /**
   * Get all items
   *
   * @returns All items
   */
  async getAllItems(): Promise<Item[]> {
    console.log('item.service.ts - getAllItems - 1');
    return this.itemRepository.findAll();
  }

  /**
   * Get an item by id
   *
   * @param itemId - The id of the item to get
   * @returns The item if found, otherwise null
   */
  async getItem(itemId: Item['itemId']): Promise<Item | undefined> {
    return this.itemRepository.findById(itemId);
  }

  /**
   * Create an item
   *
   * @param itemCreate - The item to create
   * @returns The created item
   */
  async createItem(itemCreate: Omit<Item, 'itemId'>): Promise<Item> {
    const { name, priceInCent, category, rating, imgPath, description } = itemCreate;
    const newItem = new Item({ name, priceInCent, category, rating, imgPath, description });
    return this.itemRepository.create(newItem);
  }

  /**
   * Update an item
   *
   * @param itemUpdate - The item to update
   * @returns The updated item if the item was found, otherwise null
   */
  async updateItem(itemId: Item['itemId'], itemUpdate: Omit<Item, 'itemId'>): Promise<Item | undefined> {
    return this.itemRepository.update(itemId, itemUpdate);
  }

  /**
   * Delete an item
   *
   * @param itemId - The id of the item to delete
   * @returns True if the item was deleted, false if the item was not found
   */
  async deleteItem(itemId: Item['itemId']): Promise<boolean> {
    const itemIndex = items.findIndex((item) => item.itemId === itemId);
    if (itemIndex === -1) {
      return false;
    }
    items.splice(itemIndex, 1);
    return true;
  }
}
