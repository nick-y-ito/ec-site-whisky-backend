/**
 * Data access logic (e.g., for interacting with a database)
 */
import { items } from '@/data/items';
import { Item } from '@/models/item.model';

export class ItemRepository {
  private items: Item[]; // This would be replaced by database logic

  constructor() {
    this.items = items;
  }

  async findAll(): Promise<Item[]> {
    console.log('item.repository.ts - findAll - 1');
    return this.items;
  }

  async findById(itemId: Item['itemId']): Promise<Item | undefined> {
    return this.items.find((item) => item.itemId === itemId);
  }

  async create(newItem: Item): Promise<Item> {
    this.items.push(newItem);
    return newItem;
  }

  async update(itemId: Item['itemId'], itemUpdate: Omit<Item, 'itemId'>): Promise<Item | undefined> {
    const itemIndex = items.findIndex((item) => item.itemId === itemId);
    if (itemIndex === -1) return undefined;

    const updatedItem = { ...this.items[itemIndex], ...itemUpdate, itemId };
    this.items[itemIndex] = updatedItem;
    return updatedItem;
  }

  async delete(itemId: string): Promise<boolean> {
    const itemIndex = this.items.findIndex((item) => item.itemId === itemId);
    if (itemIndex === -1) return false;

    this.items.splice(itemIndex, 1);
    return true;
  }
}
