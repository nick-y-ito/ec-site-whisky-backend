/**
 * Data model
 */
import { v4 as uuidv4 } from 'uuid';

import { TCategory } from '@/types/item.types';

export class Item {
  public itemId: string; // UUID v4
  public name: string;
  public priceInCent: number;
  public category?: TCategory;
  public rating?: number;
  public imgPath?: string;
  public description?: string;

  constructor({ name, priceInCent, category, rating, imgPath, description }: Omit<Item, 'itemId'>) {
    this.itemId = uuidv4();
    this.name = name;
    this.priceInCent = priceInCent;
    this.category = category;
    this.rating = rating;
    this.imgPath = imgPath;
    this.description = description;
  }
}
