import { Request, Response } from 'express';

import { IItem } from '@/data/items';
import { isValidUuidV4 } from '@/lib/utils';
import { ItemsModel } from '@/models/item.model';
import { isTCategory } from '@/types/item.types';

export class ItemsController {
  private itemsModel: ItemsModel;

  constructor() {
    this.itemsModel = new ItemsModel();
  }

  /**
   * GET /items
   */
  getItems = async (_: Request, res: Response) => {
    try {
      const items = await this.itemsModel.getItems();
      return res.status(200).json(items);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  /**
   * GET /items/:itemId
   */
  getItem = async (req: Request, res: Response) => {
    try {
      const itemId = req.params['itemId'];

      /* Input validation */
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (!isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }
      const item = await this.itemsModel.getItem(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }

      return res.status(200).json(item);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  /**
   * POST /items
   */
  createItem = async (req: Request, res: Response) => {
    try {
      const item = req.body as Omit<IItem, 'itemId'>;

      /* Input validation */
      if (!item.name) {
        return res.status(400).json({ message: 'Missing name' });
      }
      if (!item.priceInCent) {
        return res.status(400).json({ message: 'Missing price' });
      }
      if (item.category && !isTCategory(item.category)) {
        return res.status(400).json({ message: 'Invalid category' });
      }

      const newItem: Omit<IItem, 'itemId'> = {
        name: item.name,
        priceInCent: item.priceInCent,
        category: item.category ?? undefined,
        rating: item.rating ?? undefined,
        imgPath: item.imgPath ?? undefined,
        description: item.description ?? undefined,
      };

      const createdItem = await this.itemsModel.createItem(newItem);
      return res.status(201).json(createdItem);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  /**
   * PUT /items/:itemId
   */
  updateItem = async (req: Request, res: Response) => {
    try {
      const item = req.body as Omit<IItem, 'itemId'>;
      const itemId = req.params['itemId'];

      /* Input validation */
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (!isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }
      if (!item.name) {
        return res.status(400).json({ message: 'Missing name' });
      }
      if (!item.priceInCent) {
        return res.status(400).json({ message: 'Missing price' });
      }
      if (item.category && !isTCategory(item.category)) {
        return res.status(400).json({ message: 'Invalid category' });
      }

      const newItem: IItem = {
        itemId,
        name: item.name,
        priceInCent: item.priceInCent,
        category: item.category ?? undefined,
        rating: item.rating ?? undefined,
        imgPath: item.imgPath ?? undefined,
        description: item.description ?? undefined,
      };

      const updatedItem = await this.itemsModel.updateItem(newItem);
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      return res.status(200).json(updatedItem);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  /**
   * DELETE /items
   */
  deleteItem = async (req: Request, res: Response) => {
    try {
      const itemId = req.params['itemId'];

      /* Input validation */
      if (!itemId) {
        return res.status(400).json({ message: 'Missing itemId' });
      }
      if (!isValidUuidV4(itemId)) {
        return res.status(400).json({ message: 'Invalid itemId' });
      }

      const result = await this.itemsModel.deleteItem(itemId);
      if (!result) {
        return res.status(404).json({ message: 'Item not found' });
      }
      return res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}